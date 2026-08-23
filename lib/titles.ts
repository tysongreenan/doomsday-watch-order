import type { FilterId, Franchise, Title } from "./types";

export const DOOMSDAY_DATE = "2026-12-18";
export const DOOMSDAY_LABEL = "December 18, 2026";
export const ESSENTIAL_COUNT = 15;
export const GITHUB_REPO = "https://github.com/tysongreenan/doomsday-watch-order";

export const FRANCHISE_LABEL: Record<Franchise, string> = {
  xmen: "X-Men",
  mcu: "MCU",
  "fantastic-four": "Fantastic Four",
};

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "essential", label: "Essential only" },
  { id: "xmen", label: "X-Men" },
  { id: "mcu", label: "MCU" },
  { id: "fantastic-four", label: "Fantastic Four" },
];

export const essentialTitles: Title[] = [
  {
    id: "x-men-2000",
    order: 1,
    title: "X-Men",
    year: 2000,
    type: "movie",
    franchises: ["xmen"],
    track: "essential",
    runtimeMinutes: 104,
    whyItMatters:
      "Introduces the Fox X-Men roster and the Xavier–Magneto war that Doomsday is expected to collide with.",
  },
  {
    id: "x2-2003",
    order: 2,
    title: "X2",
    year: 2003,
    type: "movie",
    franchises: ["xmen"],
    track: "essential",
    runtimeMinutes: 134,
    whyItMatters:
      "Deepens the Brotherhood conflict and cements Wolverine as the mutant most likely to bridge worlds.",
  },
  {
    id: "captain-america-the-first-avenger-2011",
    order: 3,
    title: "Captain America: The First Avenger",
    year: 2011,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 124,
    whyItMatters:
      "Steve Rogers’ origin, Hydra, and the Tesseract seed the Avengers myth the later crossovers still run on.",
  },
  {
    id: "the-avengers-2012",
    order: 4,
    title: "The Avengers",
    year: 2012,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 143,
    whyItMatters:
      "The original team-up — the template every later Avengers event, including Doomsday, is measured against.",
  },
  {
    id: "avengers-infinity-war-2018",
    order: 5,
    title: "Avengers: Infinity War",
    year: 2018,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 149,
    whyItMatters:
      "Thanos and the Infinity Stones rewrite the universe the Multiverse Saga is still answering.",
  },
  {
    id: "avengers-endgame-2019",
    order: 6,
    title: "Avengers: Endgame",
    year: 2019,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 181,
    whyItMatters:
      "The Time Heist, the sacrifices, and the new status quo that Phase 4–6 — and Doomsday — inherit.",
  },
  {
    id: "loki-2021",
    order: 7,
    title: "Loki",
    year: 2021,
    type: "series",
    franchises: ["mcu"],
    track: "essential",
    runtimeLabel: "2 seasons · ~10 hr",
    whyItMatters:
      "The TVA, branching timelines, and the multiverse machinery that lets mutants and the Fantastic Four share a screen.",
  },
  {
    id: "shang-chi-2021",
    order: 8,
    title: "Shang-Chi and the Legend of the Ten Rings",
    year: 2021,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 132,
    whyItMatters:
      "A post-Endgame hero and the Ten Rings sit in the same MCU generation Doomsday is drawing into the fight.",
  },
  {
    id: "spider-man-no-way-home-2021",
    order: 9,
    title: "Spider-Man: No Way Home",
    year: 2021,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 148,
    whyItMatters:
      "The spell that cracked the multiverse and pulled variants through — the door Doomsday walks through.",
  },
  {
    id: "black-panther-wakanda-forever-2022",
    order: 10,
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 161,
    whyItMatters:
      "A new Black Panther, Namor, and a more fractured political map heading into the next Avengers war.",
  },
  {
    id: "doctor-strange-multiverse-of-madness-2022",
    order: 11,
    title: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 126,
    whyItMatters:
      "Incursions, variant Stranges, and worlds that can collide and die — a preview of multiversal stakes.",
  },
  {
    id: "deadpool-and-wolverine-2024",
    order: 12,
    title: "Deadpool & Wolverine",
    year: 2024,
    type: "movie",
    franchises: ["xmen", "mcu"],
    track: "essential",
    runtimeMinutes: 128,
    whyItMatters:
      "Fox characters officially punch into the MCU via the TVA — the on-ramp for X-Men in Doomsday.",
  },
  {
    id: "captain-america-brave-new-world-2025",
    order: 13,
    title: "Captain America: Brave New World",
    year: 2025,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 118,
    whyItMatters:
      "Sam Wilson’s Cap, President Ross, and adamantium reset the board in the year before Doomsday.",
  },
  {
    id: "thunderbolts-2025",
    order: 14,
    title: "Thunderbolts*",
    year: 2025,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 126,
    whyItMatters:
      "The New Avengers and the Void show who is actually standing when the next world-ending threat arrives.",
  },
  {
    id: "fantastic-four-first-steps-2025",
    order: 15,
    title: "The Fantastic Four: First Steps",
    year: 2025,
    type: "movie",
    franchises: ["mcu", "fantastic-four"],
    track: "essential",
    runtimeMinutes: 115,
    whyItMatters:
      "Reed’s family, a 1960s-adjacent Earth, and Doom’s shadow — the most direct on-ramp to December.",
  },
];

export const xmenDeeperTitles: Title[] = [
  {
    id: "x-men-first-class-2011",
    title: "X-Men: First Class",
    year: 2011,
    type: "movie",
    franchises: ["xmen"],
    track: "xmen-deeper",
    runtimeMinutes: 132,
    whyItMatters:
      "Young Xavier and Magneto in the Cold War — the origin story most people mean by a deeper X-Men cut.",
  },
  {
    id: "x-men-days-of-future-past-2014",
    title: "X-Men: Days of Future Past",
    year: 2014,
    type: "movie",
    franchises: ["xmen"],
    track: "xmen-deeper",
    runtimeMinutes: 131,
    whyItMatters:
      "The timeline-rewrite that ties the original trilogy to First Class — useful mutant-history homework, not on the official 15.",
  },
  {
    id: "logan-2017",
    title: "Logan",
    year: 2017,
    type: "movie",
    franchises: ["xmen"],
    track: "xmen-deeper",
    runtimeMinutes: 137,
    whyItMatters:
      "A grim, standalone sendoff that shows how far these characters can go; tone sample, not required plot.",
  },
  {
    id: "deadpool-2016",
    title: "Deadpool",
    year: 2016,
    type: "movie",
    franchises: ["xmen"],
    track: "xmen-deeper",
    runtimeMinutes: 108,
    whyItMatters:
      "Wade’s origin and fourth-wall chaos before he becomes an MCU problem in Deadpool & Wolverine.",
  },
  {
    id: "deadpool-2-2018",
    title: "Deadpool 2",
    year: 2018,
    type: "movie",
    franchises: ["xmen"],
    track: "xmen-deeper",
    runtimeMinutes: 119,
    whyItMatters:
      "Cable, family, and the found-family setup that Deadpool & Wolverine pays off.",
  },
];

export const fantasticFourLegacyTitles: Title[] = [
  {
    id: "fantastic-four-2005",
    title: "Fantastic Four",
    year: 2005,
    type: "movie",
    franchises: ["fantastic-four"],
    track: "fantastic-four-legacy",
    runtimeMinutes: 106,
    optionalNote: "Optional / non-MCU",
    whyItMatters:
      "A campy, non-MCU intro to Reed, Sue, Johnny, and Ben — flavor only, not the 2025 First Steps team.",
  },
  {
    id: "fantastic-four-rise-of-the-silver-surfer-2007",
    title: "Fantastic Four: Rise of the Silver Surfer",
    year: 2007,
    type: "movie",
    franchises: ["fantastic-four"],
    track: "fantastic-four-legacy",
    runtimeMinutes: 92,
    optionalNote: "Optional / non-MCU",
    whyItMatters:
      "Silver Surfer (and a very loose Galactus) as optional texture — not MCU canon and not required.",
  },
  {
    id: "fantastic-four-2015",
    title: "Fantastic Four",
    year: 2015,
    type: "movie",
    franchises: ["fantastic-four"],
    track: "fantastic-four-legacy",
    runtimeMinutes: 100,
    optionalNote: "Optional / non-MCU",
    whyItMatters:
      "A grim reboot that is not MCU and not needed; skip unless you are curious about every screen version.",
  },
];

export const allTitles: Title[] = [
  ...essentialTitles,
  ...xmenDeeperTitles,
  ...fantasticFourLegacyTitles,
];

export const essentialIds = essentialTitles.map((title) => title.id);

export function formatRuntime(title: Title): string | null {
  if (title.runtimeLabel) return title.runtimeLabel;
  if (title.runtimeMinutes == null) return null;
  const hours = Math.floor(title.runtimeMinutes / 60);
  const minutes = title.runtimeMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export function titleMatchesFilter(title: Title, filter: FilterId): boolean {
  if (filter === "all") return true;
  if (filter === "essential") return title.track === "essential";
  if (filter === "xmen") return title.franchises.includes("xmen");
  if (filter === "mcu") return title.franchises.includes("mcu");
  return title.franchises.includes("fantastic-four");
}

const movieMinutes = essentialTitles.reduce(
  (sum, title) => sum + (title.runtimeMinutes ?? 0),
  0,
);

export const essentialRuntimeHint = `~${Math.round(movieMinutes / 60 + 10)} hr including Loki`;
