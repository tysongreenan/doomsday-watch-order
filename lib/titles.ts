import { heroCollagePieces } from "./hero-collage";
import type { FilterId, Franchise, SortMode, Title } from "./types";

export const DOOMSDAY_DATE = "2026-12-18";
export const DOOMSDAY_LABEL = "December 18, 2026";
export const SECRET_WARS_DATE = "2027-12-17";
export const SECRET_WARS_LABEL = "December 17, 2027";
/** Official Disney+ / Marvel Countdown to Avengers: Doomsday. */
export const DISNEY_PLUS_COUNT = 15;
/** Official 15 plus Spider-Man: Brand New Day as the Phase 6 bridge. */
export const ESSENTIAL_COUNT = 16;
export const GITHUB_REPO = "https://github.com/tysongreenan/doomsday-watch-order";

export const FRANCHISE_LABEL: Record<Franchise, string> = {
  xmen: "X-Men",
  mcu: "MCU",
  "fantastic-four": "Fantastic Four",
};

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "essential", label: "Must watch" },
  { id: "upcoming", label: "Upcoming" },
  { id: "xmen", label: "X-Men" },
  { id: "mcu", label: "MCU" },
  { id: "fantastic-four", label: "Fantastic Four" },
];

export const SORT_MODES: {
  id: SortMode;
  label: string;
  hint: string;
}[] = [
  {
    id: "story",
    label: "Timeline order",
    hint: "In-universe, from the 1940s to Doomsday.",
  },
  {
    id: "release",
    label: "Release order",
    hint: "By the year each title came out.",
  },
];

/**
 * Timeline (story) order is in-universe chronology as best as practical for
 * Doomsday prep — not a single official MCU Sacred Timeline and not release order.
 *
 * - Fox X-Men: First Class (1962) before the original trilogy; Days of Future Past
 *   as the bridge; Deadpool films next; Logan as that timeline’s far-future sendoff.
 * - MCU: Cap: First Avenger (1940s) before The Avengers; Infinity War → Endgame →
 *   Loki (TVA / branching after the Time Heist); then post-Endgame MCU
 *   (Shang-Chi, No Way Home, Multiverse of Madness, Wakanda Forever, The Marvels).
 * - Deadpool & Wolverine after Loki (TVA handshake into the MCU).
 * - Brave New World → Thunderbolts* → First Steps → Brand New Day.
 * - Avengers: Doomsday, then Secret Wars.
 * - Older non-MCU FF stay optional flavor, not canon placement.
 *
 * Timeline rail years (`timelineYear` / `timelineYearLabel`) are the in-universe
 * era the left rail uses — not release year. Choices:
 * - Cap: First Avenger → 1943 (WWII origin)
 * - First Class → 1962 (Cuban Missile Crisis)
 * - X-Men / X2 → 2000 / 2003 (Fox present-day era)
 * - Days of Future Past → 1973 (past mission is the bulk of the film; the 2023
 *   future war is the frame)
 * - Deadpool / Deadpool 2 → 2016 / 2018
 * - Logan → 2029 (Fox far-future sendoff)
 * - The Avengers → 2012; Infinity War → 2018; Endgame → 2023
 * - Loki and Deadpool & Wolverine → "Outside time" (TVA / Void)
 * - Post-Endgame MCU present: Shang-Chi / No Way Home / Multiverse of Madness
 *   2024; Wakanda Forever 2025; The Marvels / Brave New World / Thunderbolts*
 *   2026
 * - First Steps → "1960s" (Earth-828, not the MCU present)
 * - Brand New Day / Doomsday → 2026; Secret Wars → 2027
 * - Older non-MCU Fantastic Four → their release years (flavor only)
 */
export const STORY_ORDER_NOTE =
  "Cap: First Avenger, then First Class before the original X-Men films; Days of Future Past as the mutant bridge; Deadpool films, then Logan. MCU: The Avengers → Infinity War → Endgame → Loki, then Shang-Chi through The Marvels, Deadpool & Wolverine, Brave New World, Thunderbolts*, First Steps, and Brand New Day. Doomsday and Secret Wars close the list. Older non-MCU Fantastic Four stay optional below.";

export const essentialTitles: Title[] = [
  {
    id: "x-men-2000",
    order: 1,
    storyOrder: 3,
    title: "X-Men",
    year: 2000,
    timelineYear: 2000,
    type: "movie",
    franchises: ["xmen"],
    track: "essential",
    runtimeMinutes: 104,
    whyItMatters:
      "Introduces the Fox X-Men roster and the Xavier–Magneto war that Doomsday is expected to collide with.",
    tmdb: {
      id: 36657,
      mediaType: "movie",
      posterPath: "/bRDAc4GogyS9ci3ow7UnInOcriN.jpg",
      backdropPath: "/3QUVzbcNyfGe3ocWkYAT8emK8Co.jpg",
    },
  },
  {
    id: "x2-2003",
    order: 2,
    storyOrder: 4,
    title: "X2",
    year: 2003,
    timelineYear: 2003,
    type: "movie",
    franchises: ["xmen"],
    track: "essential",
    runtimeMinutes: 134,
    whyItMatters:
      "Deepens the Brotherhood conflict and cements Wolverine as the mutant most likely to bridge worlds.",
    tmdb: {
      id: 36658,
      mediaType: "movie",
      posterPath: "/bst4alFUXCxISwdRUKSMhhkrX1M.jpg",
      backdropPath: "/7TYITrR804tLITNur3b8VLCK6tw.jpg",
    },
  },
  {
    id: "captain-america-the-first-avenger-2011",
    order: 3,
    storyOrder: 1,
    title: "Captain America: The First Avenger",
    year: 2011,
    timelineYear: 1943,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 124,
    whyItMatters:
      "Steve Rogers’ origin, Hydra, and the Tesseract seed the Avengers myth the later crossovers still run on.",
    tmdb: {
      id: 1771,
      mediaType: "movie",
      posterPath: "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
      backdropPath: "/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
    },
  },
  {
    id: "the-avengers-2012",
    order: 4,
    storyOrder: 9,
    title: "The Avengers",
    year: 2012,
    timelineYear: 2012,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 143,
    whyItMatters:
      "The original team-up — the template every later Avengers event, including Doomsday, is measured against.",
    tmdb: {
      id: 24428,
      mediaType: "movie",
      posterPath: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      backdropPath: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    },
  },
  {
    id: "avengers-infinity-war-2018",
    order: 5,
    storyOrder: 10,
    title: "Avengers: Infinity War",
    year: 2018,
    timelineYear: 2018,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 149,
    whyItMatters:
      "Thanos and the Infinity Stones rewrite the universe the Multiverse Saga is still answering.",
    tmdb: {
      id: 299536,
      mediaType: "movie",
      posterPath: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      backdropPath: "/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
  },
  {
    id: "avengers-endgame-2019",
    order: 6,
    storyOrder: 11,
    title: "Avengers: Endgame",
    year: 2019,
    timelineYear: 2023,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 181,
    whyItMatters:
      "The Time Heist, the sacrifices, and the new status quo that Phase 4–6 — and Doomsday — inherit.",
    tmdb: {
      id: 299534,
      mediaType: "movie",
      posterPath: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
      backdropPath: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    },
  },
  {
    id: "loki-2021",
    order: 7,
    storyOrder: 12,
    title: "Loki",
    year: 2021,
    timelineYearLabel: "Outside time",
    type: "series",
    franchises: ["mcu"],
    track: "essential",
    runtimeLabel: "2 seasons · ~10 hr",
    whyItMatters:
      "The TVA, branching timelines, and the multiverse machinery that lets mutants and the Fantastic Four share a screen.",
    tmdb: {
      id: 84958,
      mediaType: "tv",
      posterPath: "/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
      backdropPath: "/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg",
    },
  },
  {
    id: "shang-chi-2021",
    order: 8,
    storyOrder: 13,
    title: "Shang-Chi and the Legend of the Ten Rings",
    year: 2021,
    timelineYear: 2024,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 132,
    whyItMatters:
      "A post-Endgame hero and the Ten Rings sit in the same MCU generation Doomsday is drawing into the fight.",
    tmdb: {
      id: 566525,
      mediaType: "movie",
      posterPath: "/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg",
      backdropPath: "/r7K6Xt0RX4Mw0cAbZVw5cyb1Tux.jpg",
    },
  },
  {
    id: "spider-man-no-way-home-2021",
    order: 9,
    storyOrder: 14,
    title: "Spider-Man: No Way Home",
    year: 2021,
    timelineYear: 2024,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 148,
    whyItMatters:
      "The spell that cracked the multiverse and pulled variants through — the door Doomsday walks through.",
    tmdb: {
      id: 634649,
      mediaType: "movie",
      posterPath: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      backdropPath: "/uyrOU4BDm2kbVxFsMiDFIHDhc4d.jpg",
    },
  },
  {
    id: "black-panther-wakanda-forever-2022",
    order: 10,
    storyOrder: 16,
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    timelineYear: 2025,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 161,
    whyItMatters:
      "A new Black Panther, Namor, and a more fractured political map heading into the next Avengers war.",
    tmdb: {
      id: 505642,
      mediaType: "movie",
      posterPath: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
      backdropPath: "/83H0C66AcvkwpG2738VCTHMY9uv.jpg",
    },
  },
  {
    id: "doctor-strange-multiverse-of-madness-2022",
    order: 11,
    storyOrder: 15,
    title: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    timelineYear: 2024,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 126,
    whyItMatters:
      "Incursions, variant Stranges, and worlds that can collide and die — a preview of multiversal stakes.",
    tmdb: {
      id: 453395,
      mediaType: "movie",
      posterPath: "/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg",
      backdropPath: "/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg",
    },
  },
  {
    id: "deadpool-and-wolverine-2024",
    order: 12,
    storyOrder: 18,
    title: "Deadpool & Wolverine",
    year: 2024,
    timelineYearLabel: "Outside time",
    type: "movie",
    franchises: ["xmen", "mcu"],
    track: "essential",
    runtimeMinutes: 128,
    whyItMatters:
      "Fox characters officially punch into the MCU via the TVA — the on-ramp for X-Men in Doomsday.",
    tmdb: {
      id: 533535,
      mediaType: "movie",
      posterPath: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      backdropPath: "/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    },
  },
  {
    id: "captain-america-brave-new-world-2025",
    order: 13,
    storyOrder: 19,
    title: "Captain America: Brave New World",
    year: 2025,
    timelineYear: 2026,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 118,
    whyItMatters:
      "Sam Wilson’s Cap, President Ross, and adamantium reset the board in the year before Doomsday.",
    tmdb: {
      id: 822119,
      mediaType: "movie",
      posterPath: "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
      backdropPath: "/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg",
    },
  },
  {
    id: "thunderbolts-2025",
    order: 14,
    storyOrder: 20,
    title: "Thunderbolts*",
    year: 2025,
    timelineYear: 2026,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 126,
    whyItMatters:
      "The New Avengers and the Void show who is actually standing when the next world-ending threat arrives.",
    tmdb: {
      id: 986056,
      mediaType: "movie",
      posterPath: "/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
      backdropPath: "/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
    },
  },
  {
    id: "fantastic-four-first-steps-2025",
    order: 15,
    storyOrder: 21,
    title: "The Fantastic Four: First Steps",
    year: 2025,
    timelineYearLabel: "1960s",
    type: "movie",
    franchises: ["mcu", "fantastic-four"],
    track: "essential",
    runtimeMinutes: 115,
    whyItMatters:
      "Reed’s family, a 1960s-adjacent Earth, and Doom’s shadow — the most direct on-ramp to December.",
    tmdb: {
      id: 617126,
      mediaType: "movie",
      posterPath: "/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg",
      backdropPath: "/s94NjfKkcSczZ1FembwmQZwsuwY.jpg",
    },
  },
  {
    id: "spider-man-brand-new-day-2026",
    order: 16,
    storyOrder: 22,
    title: "Spider-Man: Brand New Day",
    year: 2026,
    timelineYear: 2026,
    type: "movie",
    franchises: ["mcu"],
    track: "essential",
    runtimeMinutes: 145,
    optionalNote: "In theaters",
    whyItMatters:
      "The Phase 6 bridge right before Doomsday. Latest Peter Parker / MCU Spider-Man entry heading into December, still carrying the multiverse hangover from No Way Home.",
    tmdb: {
      id: 969681,
      mediaType: "movie",
      posterPath: "/iPOn6DinuVyLY17YM9mKuPofV08.jpg",
      backdropPath: "/7iwUUcKURMT7aKfCwMy6YnGtchD.jpg",
    },
  },
];

export const recommendedTitles: Title[] = [
  {
    id: "x-men-first-class-2011",
    storyOrder: 2,
    title: "X-Men: First Class",
    year: 2011,
    timelineYear: 1962,
    type: "movie",
    franchises: ["xmen"],
    track: "recommended",
    runtimeMinutes: 132,
    optionalNote: "Recommended",
    whyItMatters:
      "Young Xavier and Magneto in the Cold War — useful origin for the Fox Magneto/Xavier pairing heading into Doomsday. Not on the official Disney+ 15.",
    tmdb: {
      id: 49538,
      mediaType: "movie",
      posterPath: "/hNEokmUke0dazoBhttFN0o3L7Xv.jpg",
      backdropPath: "/yhp5Pt4GugkCs5mz63qWz5khHXe.jpg",
    },
  },
  {
    id: "x-men-days-of-future-past-2014",
    storyOrder: 5,
    title: "X-Men: Days of Future Past",
    year: 2014,
    timelineYear: 1973,
    type: "movie",
    franchises: ["xmen"],
    track: "recommended",
    runtimeMinutes: 131,
    optionalNote: "Strongly recommended",
    whyItMatters:
      "The critical extra for the original Fox X-Men (Stewart, McKellen, Marsden, and company): time travel, the legacy roster, and the bridge from X-Men / X2 to First Class.",
    tmdb: {
      id: 127585,
      mediaType: "movie",
      posterPath: "/tYfijzolzgoMOtegh1Y7j2Enorg.jpg",
      backdropPath: "/3czpqXzFy5UcNuD1AubecRLWkwD.jpg",
    },
  },
  {
    id: "deadpool-2016",
    storyOrder: 6,
    title: "Deadpool",
    year: 2016,
    timelineYear: 2016,
    type: "movie",
    franchises: ["xmen"],
    track: "recommended",
    runtimeMinutes: 108,
    optionalNote: "Recommended",
    whyItMatters:
      "Wade’s origin before Deadpool & Wolverine (already essential, and the Gambit on-ramp).",
    tmdb: {
      id: 293660,
      mediaType: "movie",
      posterPath: "/3E53WEZJqP6aM84D8CckXx4pIHw.jpg",
      backdropPath: "/en971MEXui9diirXlogOrPKmsEn.jpg",
    },
  },
  {
    id: "deadpool-2-2018",
    storyOrder: 7,
    title: "Deadpool 2",
    year: 2018,
    timelineYear: 2018,
    type: "movie",
    franchises: ["xmen"],
    track: "recommended",
    runtimeMinutes: 119,
    optionalNote: "Recommended",
    whyItMatters:
      "Cable and the found-family setup that Deadpool & Wolverine pays off. Recommended for Wade — Gambit is already covered on the official 15.",
    tmdb: {
      id: 383498,
      mediaType: "movie",
      posterPath: "/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
      backdropPath: "/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg",
    },
  },
  {
    id: "the-marvels-2023",
    storyOrder: 17,
    title: "The Marvels",
    year: 2023,
    timelineYear: 2026,
    type: "movie",
    franchises: ["mcu"],
    track: "recommended",
    runtimeMinutes: 105,
    optionalNote: "Optional · MCU extra",
    whyItMatters:
      "Optional MCU extra: Beast’s post-credits appearance and another look at holes between worlds. Not essential — skip if you only want the official 15 plus Brand New Day.",
    tmdb: {
      id: 609681,
      mediaType: "movie",
      posterPath: "/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
      backdropPath: "/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg",
    },
  },
];

export const xmenDeeperTitles: Title[] = [
  {
    id: "logan-2017",
    storyOrder: 8,
    title: "Logan",
    year: 2017,
    timelineYear: 2029,
    type: "movie",
    franchises: ["xmen"],
    track: "xmen-deeper",
    runtimeMinutes: 137,
    optionalNote: "Optional deeper",
    whyItMatters:
      "A grim, standalone sendoff that shows how far these characters can go; tone sample, not required plot. Far-future of the Fox thread, placed after Deadpool 2.",
    tmdb: {
      id: 263115,
      mediaType: "movie",
      posterPath: "/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg",
      backdropPath: "/qTdCfGyDisY9e8BLycszlyTsPWx.jpg",
    },
  },
];

export const upcomingTitles: Title[] = [
  {
    id: "avengers-doomsday-2026",
    storyOrder: 23,
    title: "Avengers: Doomsday",
    year: 2026,
    timelineYear: 2026,
    type: "movie",
    franchises: ["mcu"],
    track: "upcoming",
    runtimeLabel: "Coming soon",
    optionalNote: "In theaters Dec 18, 2026",
    whyItMatters:
      "The target film this list is for — Fox X-Men, the Fantastic Four, and the MCU on a collision course.",
    tmdb: {
      id: 1003596,
      mediaType: "movie",
      posterPath: "/jzPwsojjFStf5lR5Nm07w2hH56G.jpg",
      backdropPath: "/s4v0UX1anfXm0UvloLsTTJ4v222.jpg",
    },
  },
  {
    id: "avengers-secret-wars-2027",
    storyOrder: 24,
    title: "Avengers: Secret Wars",
    year: 2027,
    timelineYear: 2027,
    type: "movie",
    franchises: ["mcu"],
    track: "upcoming",
    runtimeLabel: "Coming soon",
    optionalNote: "In theaters Dec 17, 2027",
    whyItMatters:
      "The Multiverse Saga finale. Watch after Doomsday; dated December 17, 2027.",
    tmdb: {
      id: 1003598,
      mediaType: "movie",
      posterPath: "/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg",
      backdropPath: "/rytc6Lf4447C0CDncwFa4gxe0vY.jpg",
    },
  },
];

export const fantasticFourLegacyTitles: Title[] = [
  {
    id: "fantastic-four-2005",
    storyOrder: 25,
    title: "Fantastic Four",
    year: 2005,
    timelineYear: 2005,
    type: "movie",
    franchises: ["fantastic-four"],
    track: "fantastic-four-legacy",
    runtimeMinutes: 106,
    optionalNote: "Optional / non-MCU",
    whyItMatters:
      "A campy, non-MCU intro to Reed, Sue, Johnny, and Ben — flavor only, not the 2025 First Steps team.",
    tmdb: {
      id: 9738,
      mediaType: "movie",
      posterPath: "/4YMcYEFS8sFuW3soP1HVmgR3cSm.jpg",
      backdropPath: "/2cDXXLirYsoP6rk9B8yrvNHbbFy.jpg",
    },
  },
  {
    id: "fantastic-four-rise-of-the-silver-surfer-2007",
    storyOrder: 26,
    title: "Fantastic Four: Rise of the Silver Surfer",
    year: 2007,
    timelineYear: 2007,
    type: "movie",
    franchises: ["fantastic-four"],
    track: "fantastic-four-legacy",
    runtimeMinutes: 92,
    optionalNote: "Optional / non-MCU",
    whyItMatters:
      "Silver Surfer (and a very loose Galactus) as optional texture — not MCU canon and not required.",
    tmdb: {
      id: 1979,
      mediaType: "movie",
      posterPath: "/9wRfzTcMyyzkQxVDqBHv8RwuZOv.jpg",
      backdropPath: "/o2wYH40zW0JIYiYUTu6L4gsNy7E.jpg",
    },
  },
  {
    id: "fantastic-four-2015",
    storyOrder: 27,
    title: "Fantastic Four",
    year: 2015,
    timelineYear: 2015,
    type: "movie",
    franchises: ["fantastic-four"],
    track: "fantastic-four-legacy",
    runtimeMinutes: 100,
    optionalNote: "Optional / non-MCU",
    whyItMatters:
      "A grim reboot that is not MCU and not needed; skip unless you are curious about every screen version.",
    tmdb: {
      id: 166424,
      mediaType: "movie",
      posterPath: "/cDroz5qSlP8xZ6tOpeYoPkBvKyL.jpg",
      backdropPath: "/or5kDR8Ve3TtuPSdEf1X5NdQHyz.jpg",
    },
  },
];

function attachWatchLinks(title: Title): Title {
  const query = `${title.title} ${title.year}`;
  const officialDisneyPlus =
    title.track === "essential" &&
    title.order != null &&
    title.order >= 1 &&
    title.order <= 15;
  return {
    ...title,
    justWatchUrl:
      title.justWatchUrl ??
      `https://www.justwatch.com/ca/search?q=${encodeURIComponent(query)}`,
    disneyPlusUrl:
      title.disneyPlusUrl ??
      (officialDisneyPlus
        ? `https://www.disneyplus.com/search?q=${encodeURIComponent(title.title)}`
        : undefined),
  };
}

for (const title of essentialTitles) Object.assign(title, attachWatchLinks(title));
for (const title of recommendedTitles) Object.assign(title, attachWatchLinks(title));
for (const title of xmenDeeperTitles) Object.assign(title, attachWatchLinks(title));
for (const title of upcomingTitles) Object.assign(title, attachWatchLinks(title));
for (const title of fantasticFourLegacyTitles)
  Object.assign(title, attachWatchLinks(title));

export const allTitles: Title[] = [
  ...essentialTitles,
  ...recommendedTitles,
  ...xmenDeeperTitles,
  ...upcomingTitles,
  ...fantasticFourLegacyTitles,
];

/** Main All-list pool: essentials + recommended extras + Logan + upcoming. */
export const mainListTitles: Title[] = [
  ...essentialTitles,
  ...recommendedTitles,
  ...xmenDeeperTitles,
  ...upcomingTitles,
];

export const essentialIds = essentialTitles.map((title) => title.id);

const storyOrders = allTitles.map((title) => title.storyOrder);
if (new Set(storyOrders).size !== storyOrders.length) {
  throw new Error("Each title must have a unique storyOrder");
}

const titlesById = new Map(allTitles.map((title) => [title.id, title]));
for (const piece of heroCollagePieces) {
  if (!titlesById.has(piece.titleId)) {
    throw new Error(`Hero collage references unknown title ${piece.titleId}`);
  }
}
if (allTitles.some((title) => !title.justWatchUrl)) {
  throw new Error("Each title must have a JustWatch Canada search URL");
}
if (
  allTitles.some(
    (title) => title.timelineYear == null && !title.timelineYearLabel,
  )
) {
  throw new Error("Each title must have timelineYear or timelineYearLabel");
}

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
  if (filter === "upcoming") return title.track === "upcoming";
  if (filter === "xmen") return title.franchises.includes("xmen");
  if (filter === "mcu") return title.franchises.includes("mcu");
  return title.franchises.includes("fantastic-four");
}

export function sortByStoryOrder(titles: Title[]): Title[] {
  return [...titles].sort(
    (a, b) => a.storyOrder - b.storyOrder || a.year - b.year,
  );
}

export function titlesForSort(filter: FilterId, sortMode: SortMode): Title[] {
  const pool = filter === "essential" ? essentialTitles : mainListTitles;
  const visible = pool.filter((title) => titleMatchesFilter(title, filter));
  if (sortMode === "story") return sortByStoryOrder(visible);
  return [...visible].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const orderA = a.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });
}

const movieMinutes = essentialTitles.reduce(
  (sum, title) => sum + (title.runtimeMinutes ?? 0),
  0,
);

export const essentialRuntimeHint = `~${Math.round(movieMinutes / 60 + 10)} hr including Loki`;
