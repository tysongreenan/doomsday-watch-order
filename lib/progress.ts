const STORAGE_KEY = "doomsday-watch-progress-v1";

type StoredProgress = {
  version: 1;
  watched: string[];
};

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
}
