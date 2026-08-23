import { isValidSyncCode, SYNC_COOKIE } from "./sync-code";

const STORAGE_KEY = "doomsday-watch-progress-v1";
const CODE_STORAGE_KEY = "doomsday-watch-code-v1";

type StoredProgress = {
  version: 1;
  watched: string[];
};

const listeners = new Set<() => void>();
const codeListeners = new Set<() => void>();
let remoteSaver: ((watched: string[]) => void) | null = null;

function notify(): void {
  for (const listener of listeners) listener();
}

function notifyCode(): void {
  for (const listener of codeListeners) listener();
}

export function setRemoteProgressSaver(
  saver: ((watched: string[]) => void) | null,
): void {
  remoteSaver = saver;
}

export function loadWatchedIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredProgress;
    if (parsed?.version !== 1 || !Array.isArray(parsed.watched)) return [];
    return parsed.watched.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
}

export function saveWatchedIds(watched: string[]): void {
  if (typeof window === "undefined") return;
  const payload: StoredProgress = { version: 1, watched };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  notify();
  remoteSaver?.(watched);
}

export function loadSyncCode(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(CODE_STORAGE_KEY);
    if (stored && isValidSyncCode(stored)) return stored;
  } catch {
    // fall through to cookie
  }

  const fromCookie = readCookie(SYNC_COOKIE);
  return fromCookie && isValidSyncCode(fromCookie) ? fromCookie : null;
}

export function persistSyncCode(code: string): void {
  if (typeof window === "undefined" || !isValidSyncCode(code)) return;
  try {
    window.localStorage.setItem(CODE_STORAGE_KEY, code);
  } catch {
    // ignore quota / private mode
  }
  document.cookie = `${SYNC_COOKIE}=${encodeURIComponent(code)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  notifyCode();
}

export function getSyncCodeSnapshot(): string {
  return loadSyncCode() ?? "";
}

export function getServerSyncCodeSnapshot(): string {
  return "";
}

export function subscribeSyncCode(onStoreChange: () => void): () => void {
  codeListeners.add(onStoreChange);
  return () => {
    codeListeners.delete(onStoreChange);
  };
}

function readCookie(name: string): string | null {
  const prefix = `${name}=`;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return null;
}

export function getWatchedSnapshot(): string {
  return JSON.stringify(loadWatchedIds());
}

export function getServerWatchedSnapshot(): string {
  return "[]";
}

export function subscribeWatched(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function toggleWatched(id: string): void {
  const next = new Set(loadWatchedIds());
  if (next.has(id)) next.delete(id);
  else next.add(id);
  saveWatchedIds([...next]);
}

export function resetWatched(): void {
  saveWatchedIds([]);
}

export function subscribeClientReady(): () => void {
  return () => {};
}

export function getClientReadySnapshot(): boolean {
  return true;
}

export function getServerReadySnapshot(): boolean {
  return false;
}
