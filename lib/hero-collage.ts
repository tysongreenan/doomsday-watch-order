/**
 * Cinematic hero collage — CSS-layered TMDB stills, not a generated poster.
 *
 * Composition:
 * - base: Endgame backdrop (full-bleed atmosphere)
 * - xmen: X-Men (2000) backdrop (left mutant panel)
 * - avengers: The Avengers (2012) backdrop (center team panel)
 * - ff: Fantastic Four: First Steps backdrop (right family panel)
 * - deadpool: Deadpool & Wolverine poster (foreground stack)
 * - cap: Captain America: The First Avenger poster (foreground stack)
 * - logan: Logan poster (Wolverine sendoff in the stack)
 */
export type HeroCollageSlot =
  | "base"
  | "xmen"
  | "avengers"
  | "ff"
  | "deadpool"
  | "cap"
  | "logan";

export type HeroCollagePiece = {
  titleId: string;
  image: "poster" | "backdrop";
  slot: HeroCollageSlot;
};

export const heroCollagePieces: HeroCollagePiece[] = [
  { titleId: "avengers-endgame-2019", image: "backdrop", slot: "base" },
  { titleId: "x-men-2000", image: "backdrop", slot: "xmen" },
  { titleId: "the-avengers-2012", image: "backdrop", slot: "avengers" },
  {
    titleId: "fantastic-four-first-steps-2025",
    image: "backdrop",
    slot: "ff",
  },
  {
    titleId: "deadpool-and-wolverine-2024",
    image: "poster",
    slot: "deadpool",
  },
  {
    titleId: "captain-america-the-first-avenger-2011",
    image: "poster",
    slot: "cap",
  },
  { titleId: "logan-2017", image: "poster", slot: "logan" },
];
