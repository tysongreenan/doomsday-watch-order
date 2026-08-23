"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import {
  getSyncCodeSnapshot,
  getServerSyncCodeSnapshot,
  subscribeSyncCode,
} from "@/lib/progress";
import {
  adoptSyncCode,
  bootstrapProgressSync,
  getServerSyncModeSnapshot,
  getSyncModeSnapshot,
  subscribeSyncMode,
} from "@/lib/progress-sync";

export function SyncCodePanel() {
  const code = useSyncExternalStore(
    subscribeSyncCode,
    getSyncCodeSnapshot,
    getServerSyncCodeSnapshot,
  );
  const mode = useSyncExternalStore(
    subscribeSyncMode,
    getSyncModeSnapshot,
    getServerSyncModeSnapshot,
  );
  const [copied, setCopied] = useState(false);
  const [enterValue, setEnterValue] = useState("");
  const [enterError, setEnterError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void bootstrapProgressSync();
  }, []);

  async function copyCode(): Promise<void> {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setEnterError("Could not copy. Select the code and copy it manually.");
    }
  }

  async function onLoadCode(event: FormEvent): Promise<void> {
    event.preventDefault();
    setEnterError("");
    setBusy(true);
    const result = await adoptSyncCode(enterValue);
    setBusy(false);
    if (!result.ok) {
      setEnterError(result.error);
      return;
    }
    setEnterValue("");
  }

  return (
    <div className="sync-panel">
      <p className="label-caps text-primary">Sync across devices</p>
      {mode === "off" ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Progress is saved on this device. Add Supabase env vars to enable a
          sync code — see the README.
        </p>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-sm text-muted">
              Your sync code:{" "}
              <span className="sync-code">{code || "••••-••••"}</span>
            </p>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => void copyCode()}
              disabled={!code}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <form className="sync-enter" onSubmit={(event) => void onLoadCode(event)}>
            <label htmlFor="sync-code-input" className="sr-only">
              Enter a sync code from another device
            </label>
            <input
              id="sync-code-input"
              className="sync-input"
              value={enterValue}
              onChange={(event) => setEnterValue(event.target.value)}
              placeholder="Enter code"
              autoComplete="off"
              spellCheck={false}
              disabled={busy}
            />
            <button type="submit" className="btn-ghost" disabled={busy}>
              Load
            </button>
          </form>
          <p className="mt-2 text-sm text-muted">
            This device keeps an offline copy. Enter a code to load another
            device&apos;s progress.
          </p>
        </>
      )}
      {enterError ? (
        <p className="mt-2 text-sm text-primary" role="status">
          {enterError}
        </p>
      ) : null}
    </div>
  );
}
