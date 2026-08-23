import {
  loadSyncCode,
  loadWatchedIds,
  persistSyncCode,
  saveWatchedIds,
  setRemoteProgressSaver,
} from "./progress";
import { normalizeSyncCode } from "./sync-code";
import { unionWatchedIds } from "./title-ids";

type ProgressPayload = {
  enabled: boolean;
  code?: string;
  watched?: string[];
  error?: string;
};

export type SyncMode = "unknown" | "on" | "off";

let syncMode: SyncMode = "unknown";
let bootstrapped = false;
let bootstrapPromise: Promise<void> | null = null;
let persistTimer: number | null = null;
const persistListeners = new Set<() => void>();

function notifySync(): void {
  for (const listener of persistListeners) listener();
}

export function getSyncMode(): SyncMode {
  return syncMode;
}

export function getSyncModeSnapshot(): SyncMode {
  return syncMode;
}

export function getServerSyncModeSnapshot(): SyncMode {
  return "unknown";
}

export function subscribeSyncMode(onStoreChange: () => void): () => void {
  persistListeners.add(onStoreChange);
  return () => {
    persistListeners.delete(onStoreChange);
  };
}

function setSyncMode(next: SyncMode): void {
  if (syncMode === next) return;
  syncMode = next;
  notifySync();
}

export async function bootstrapProgressSync(): Promise<void> {
  if (bootstrapPromise) return bootstrapPromise;

  bootstrapPromise = (async () => {
    const existingCode = loadSyncCode();
    if (existingCode) persistSyncCode(existingCode);

    if (existingCode) {
      const remote = await fetchProgress(existingCode);
      if (remote.kind === "disabled") {
        setSyncMode("off");
        return;
      }
      if (remote.kind === "ok") {
        setSyncMode("on");
        persistSyncCode(remote.code);
        const merged = unionWatchedIds(remote.watched, loadWatchedIds());
        applyLocalWatched(merged);
        if (!sameIds(merged, remote.watched)) {
          await upsertProgress(remote.code, merged);
        }
        bootstrapped = true;
        setRemoteProgressSaver(queueRemoteSave);
        return;
      }
    }

    const created = await upsertProgress(undefined, loadWatchedIds());
    if (created.kind === "disabled") {
      setSyncMode("off");
      return;
    }
    if (created.kind === "ok") {
      setSyncMode("on");
      persistSyncCode(created.code);
      applyLocalWatched(created.watched);
      bootstrapped = true;
      setRemoteProgressSaver(queueRemoteSave);
      return;
    }

    setSyncMode("off");
  })();

  return bootstrapPromise;
}

export async function adoptSyncCode(
  raw: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const code = normalizeSyncCode(raw);
  if (!code) return { ok: false, error: "Use a code like DOOM-AB12." };

  const remote = await fetchProgress(code);
  if (remote.kind === "disabled") {
    setSyncMode("off");
    return { ok: false, error: "Sync is not configured on this deploy." };
  }
  if (remote.kind === "missing") {
    return { ok: false, error: "No list found for that code." };
  }
  if (remote.kind !== "ok") {
    return { ok: false, error: remote.error ?? "Could not load that code." };
  }

  persistSyncCode(remote.code);
  applyLocalWatched(remote.watched);
  setSyncMode("on");
  bootstrapped = true;
  setRemoteProgressSaver(queueRemoteSave);
  return { ok: true };
}

function queueRemoteSave(watched: string[]): void {
  if (!bootstrapped || syncMode !== "on") return;
  const code = loadSyncCode();
  if (!code) return;

  if (persistTimer != null) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    persistTimer = null;
    void upsertProgress(code, watched);
  }, 400);
}

function applyLocalWatched(watched: string[]): void {
  const saver = null;
  setRemoteProgressSaver(saver);
  saveWatchedIds(watched);
  setRemoteProgressSaver(queueRemoteSave);
}

function sameIds(left: string[], right: string[]): boolean {
  if (left.length !== right.length) return false;
  const other = new Set(right);
  return left.every((id) => other.has(id));
}

async function fetchProgress(code: string): Promise<
  | { kind: "ok"; code: string; watched: string[] }
  | { kind: "disabled" }
  | { kind: "missing" }
  | { kind: "error"; error: string }
> {
  try {
    const response = await fetch(
      `/api/progress?code=${encodeURIComponent(code)}`,
    );
    if (response.status === 503) return { kind: "disabled" };
    if (response.status === 404) return { kind: "missing" };
    const json = (await response.json()) as ProgressPayload;
    if (!json.enabled) return { kind: "disabled" };
    if (!response.ok || !json.code) {
      return { kind: "error", error: json.error ?? "Could not load progress." };
    }
    return {
      kind: "ok",
      code: json.code,
      watched: Array.isArray(json.watched) ? json.watched : [],
    };
  } catch {
    return { kind: "error", error: "Could not reach sync." };
  }
}

async function upsertProgress(
  code: string | undefined,
  watched: string[],
): Promise<
  | { kind: "ok"; code: string; watched: string[] }
  | { kind: "disabled" }
  | { kind: "error"; error: string }
> {
  try {
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(code ? { code, watched } : { watched }),
    });
    if (response.status === 503) return { kind: "disabled" };
    const json = (await response.json()) as ProgressPayload;
    if (!json.enabled) return { kind: "disabled" };
    if (!response.ok || !json.code) {
      return { kind: "error", error: json.error ?? "Could not save progress." };
    }
    return {
      kind: "ok",
      code: json.code,
      watched: Array.isArray(json.watched) ? json.watched : watched,
    };
  } catch {
    return { kind: "error", error: "Could not reach sync." };
  }
}
