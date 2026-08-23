import { allTitles } from "./titles";

const knownIds = new Set(allTitles.map((title) => title.id));

export function sanitizeWatchedIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const next = new Set<string>();
  for (const id of value) {
    if (typeof id === "string" && knownIds.has(id)) next.add(id);
  }
  return [...next];
}

export function unionWatchedIds(left: string[], right: string[]): string[] {
  return sanitizeWatchedIds([...left, ...right]);
}
