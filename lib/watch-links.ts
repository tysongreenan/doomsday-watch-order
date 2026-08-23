import type { Title } from "./types";

const JUSTWATCH_CA_SEARCH = "https://www.justwatch.com/ca/search";
const DISNEY_PLUS_SEARCH = "https://www.disneyplus.com/search";

/** Canada-first JustWatch search, baked from title + year. */
export function justWatchSearchUrl(title: Title): string {
  if (title.justWatchUrl) return title.justWatchUrl;
  const query = `${title.title} ${title.year}`;
  return `${JUSTWATCH_CA_SEARCH}?q=${encodeURIComponent(query)}`;
}

export function disneyPlusSearchUrl(title: Title): string {
  if (title.disneyPlusUrl) return title.disneyPlusUrl;
  return `${DISNEY_PLUS_SEARCH}?q=${encodeURIComponent(title.title)}`;
}

/** Official Disney+ countdown titles are the ones usually on Disney+. */
export function isUsuallyOnDisneyPlus(title: Title): boolean {
  return title.track === "essential";
}
