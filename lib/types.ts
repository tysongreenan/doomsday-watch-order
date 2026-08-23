export type TitleType = "movie" | "series";

export type Franchise = "xmen" | "mcu" | "fantastic-four";

export type TitleTrack = "essential" | "xmen-deeper" | "fantastic-four-legacy";

export type FilterId = "all" | "essential" | "xmen" | "mcu" | "fantastic-four";

export type Title = {
  id: string;
  order?: number;
  title: string;
  year: number;
  type: TitleType;
  franchises: Franchise[];
  track: TitleTrack;
  runtimeMinutes?: number;
  runtimeLabel?: string;
  whyItMatters: string;
  optionalNote?: string;
};
