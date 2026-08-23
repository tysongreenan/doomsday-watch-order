export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const TMDB_CREDIT =
  "This product uses the TMDB API but is not endorsed or certified by TMDB.";

export const TMDB_HOME = "https://www.themoviedb.org";

export type TmdbPosterSize = "w500" | "w780";
export type TmdbBackdropSize = "w780" | "w1280" | "original";

export function tmdbImageUrl(
  path: string,
  size: TmdbPosterSize | TmdbBackdropSize,
): string {
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
