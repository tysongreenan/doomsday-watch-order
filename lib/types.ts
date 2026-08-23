export type TitleType = "movie" | "series";

export type Franchise = "xmen" | "mcu" | "fantastic-four";

export type TitleTrack =
  | "essential"
  | "recommended"
  | "xmen-deeper"
  | "fantastic-four-legacy"
  | "upcoming";

export type FilterId =
  | "all"
  | "essential"
  | "upcoming"
  | "xmen"
  | "mcu"
  | "fantastic-four";

export type SortMode = "release" | "story";

export type TmdbMediaType = "movie" | "tv";

export type TitleTmdb = {
  id: number;
  mediaType: TmdbMediaType;
  /** TMDB `poster_path`, including the leading slash. */
  posterPath: string;
  /** TMDB `backdrop_path`, including the leading slash. */
  backdropPath: string;
};

export type Title = {
  id: string;
  order?: number;
  /** In-universe / Doomsday-prep chronology. Lower comes first in Timeline order. */
  storyOrder: number;
  title: string;
  year: number;
  type: TitleType;
  franchises: Franchise[];
  track: TitleTrack;
  runtimeMinutes?: number;
  runtimeLabel?: string;
  whyItMatters: string;
  optionalNote?: string;
  tmdb: TitleTmdb;
  /** Canada JustWatch search URL. Filled from title + year when omitted. */
  justWatchUrl?: string;
  /** Disney+ search URL for official countdown titles. */
  disneyPlusUrl?: string;
};
