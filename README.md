# Avengers: Doomsday watch order

Public homework site for **Avengers: Doomsday** (December 18, 2026).

The primary list is the Disney+ / Marvel official **Countdown to Avengers: Doomsday** — 15 titles in **Release order**. Switch to **Story order** for the same titles (plus deeper X-Men cuts) in in-universe chronology. Optional older Fantastic Four films stay on a collapsed track.

Progress (watched / unwatched) is stored in the visitor’s browser with `localStorage`. There is no account, database, or API key.

This project is **not affiliated** with Marvel, Disney, or 20th Century Studios.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static-friendly for Vercel (no auth, no server data)

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

`npm run build` should pass before you deploy.

## Deploy on Vercel

1. Import [tysongreenan/doomsday-watch-order](https://github.com/tysongreenan/doomsday-watch-order) in the Vercel dashboard (or `npx vercel` from this repo).
2. Framework preset: **Next.js**. Leave build settings at defaults (`npm run build`, output `.next`).
3. Do **not** add environment variables or API keys. The site is fully client-side for progress and has no backend.
4. Deploy. The homepage is statically generated; checkboxes persist per visitor in the browser.

## Official 15 (release order)

1. X-Men (2000)
2. X2 (2003)
3. Captain America: The First Avenger (2011)
4. The Avengers (2012)
5. Avengers: Infinity War (2018)
6. Avengers: Endgame (2019)
7. Loki (series, 2021)
8. Shang-Chi and the Legend of the Ten Rings (2021)
9. Spider-Man: No Way Home (2021)
10. Black Panther: Wakanda Forever (2022)
11. Doctor Strange in the Multiverse of Madness (2022)
12. Deadpool & Wolverine (2024)
13. Captain America: Brave New World (2025)
14. Thunderbolts* (2025)
15. The Fantastic Four: First Steps (2025)

## Story order (in-universe, practical)

Not a single official MCU timeline. First Class before the original X-Men films; Cap: First Avenger before The Avengers; Loki after Endgame; First Steps last as the current MCU Fantastic Four. Older non-MCU Fantastic Four stay optional.
