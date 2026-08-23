const STORAGE_KEY = "doomsday-watch-progress-v1";

type StoredProgress = {
  version: 1;
  watched: string[];
};

const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
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
