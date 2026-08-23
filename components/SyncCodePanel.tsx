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

  const sharingOff = mode === "off";

  return (
    <section className="share-panel">
      <div className="share-panel-copy">
        <h2 className="section-title">Save your progress and share with others</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {sharingOff
            ? "Progress saves on this device."
            : "Copy your code to keep watching on another phone or laptop. Load a code to pick up someone else’s list."}
        </p>
      </div>

      {sharingOff ? null : (
        <div className="share-actions">
          <div className="share-action">
            <p className="label-caps text-primary">Share code</p>
            <div className="share-row">
              <span className="sync-code">{code || "DOOM-••••"}</span>
              <button
                type="button"
                className="btn-primary"
                onClick={() => void copyCode()}
                disabled={!code}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <form
            className="share-action"
            onSubmit={(event) => void onLoadCode(event)}
          >
            <label htmlFor="sync-code-input" className="label-caps text-primary">
              Load code
            </label>
            <div className="share-row">
              <input
                id="sync-code-input"
                className="sync-input"
                value={enterValue}
                onChange={(event) => setEnterValue(event.target.value)}
                placeholder="DOOM-XXXX"
                autoComplete="off"
                spellCheck={false}
                disabled={busy}
              />
              <button type="submit" className="btn-ghost" disabled={busy}>
                Load
              </button>
            </div>
          </form>
        </div>
      )}

      {enterError ? (
        <p className="mt-3 text-sm text-primary" role="status">
          {enterError}
        </p>
      ) : null}
    </section>
  );
}
