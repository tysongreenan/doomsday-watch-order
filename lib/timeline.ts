import type { SortMode, Title } from "./types";

export type YearGroup = {
  key: string;
  label: string;
  titles: Title[];
};

/** Year (or era label) shown on the sticky left rail. */
export function railYearLabel(title: Title, sortMode: SortMode): string {
  if (sortMode === "release") return String(title.year);
  return title.timelineYearLabel ?? String(title.timelineYear ?? title.year);
}

/** Consecutive titles that share a rail year become one sticky group. */
export function groupTitlesByRailYear(
  titles: Title[],
  sortMode: SortMode,
): YearGroup[] {
  const groups: YearGroup[] = [];
  for (const title of titles) {
    const label = railYearLabel(title, sortMode);
    const last = groups.at(-1);
    if (last && last.label === label) {
      last.titles.push(title);
    } else {
      groups.push({ key: `${label}-${title.id}`, label, titles: [title] });
    }
  }
  return groups;
}
