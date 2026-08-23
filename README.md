# Avengers: Doomsday watch order

Public homework site for **Avengers: Doomsday** (December 18, 2026).

The primary list is the Disney+ / Marvel official **Countdown to Avengers: Doomsday** — 15 titles in **Release order**. Switch to **Story order** for the same titles (plus deeper X-Men cuts) in in-universe chronology. Optional older Fantastic Four films stay on a collapsed track.

Progress (watched / unwatched) is stored in the visitor’s browser with `localStorage`. When `DATABASE_URL` is set (Neon Postgres), a short **sync code** (`DOOM-XXXX`) also stores that list so it can be loaded on another device. There is no Google/email login.

Each card has a **Where to watch** link to a Canada JustWatch search, plus **Usually on Disney+** on the official countdown titles. If a TMDB API key is set, Canada provider names are shown as extra context. JustWatch remains the fallback.

This project is **not affiliated** with Marvel, Disney, Netflix, JustWatch, TMDB, or 20th Century Studios.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Optional Neon Postgres for sync codes (`DATABASE_URL`)
- Optional TMDB watch-provider names (Canada)

The homepage still builds and deploys without secrets. Missing env vars fall back to localStorage-only progress and JustWatch links.

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

`npm run build` should pass before you deploy — including with **no** environment variables.

## Sync codes (optional)

On first visit the site creates a list, stores the code in `localStorage` and a cookie, and uploads any existing local watched IDs. The UI shows **Your sync code: DOOM-XXXX** with copy, plus **Enter code** to load another device’s progress. localStorage stays the offline cache.

### 1. Table (docs only)

The production Neon project already has `watch_lists`. Keep [`neon/migrations/20260823120000_watch_lists.sql`](neon/migrations/20260823120000_watch_lists.sql) in the repo for reference — do **not** recreate the table if it already exists.

Equivalent SQL:

```sql
create table if not exists public.watch_lists (
  code text primary key,
  watched text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint watch_lists_code_format check (code ~ '^DOOM-[A-Z0-9]{4}$')
);
create index if not exists watch_lists_updated_at_idx on public.watch_lists (updated_at desc);
```

### 2. Environment variables on Vercel

Project → Settings → Environment Variables:

| Name | Required for | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Sync | Neon Postgres connection string (pooled is fine). Server only. Never expose it to the browser. |
| `TMDB_API_KEY` or `NEXT_PUBLIC_TMDB_API_KEY` | Provider names | Optional. v3 API key or v4 read-access JWT. Site works without it. |

If `DATABASE_URL` is unset, the site still builds. Progress stays on this device via `localStorage`, and the UI notes that you need to add `DATABASE_URL` (Neon) to enable a sync code.

API:

- `POST /api/progress` — upsert watched IDs (omit `code` to create a list)
- `GET /api/progress?code=DOOM-XXXX` — fetch a list
- Codes must match `DOOM-` plus four A–Z / 0–9 characters
- Light in-memory rate limit (~40 req/min/IP)

## Deploy on Vercel

1. Import [tysongreenan/doomsday-watch-order](https://github.com/tysongreenan/doomsday-watch-order) in the Vercel dashboard (or `npx vercel` from this repo).
2. Framework preset: **Next.js**. Leave build settings at defaults (`npm run build`, output `.next`).
3. Env vars are optional. Add `DATABASE_URL` (Neon) to enable sync; add a TMDB key only if you want Canada provider names on cards.
4. Deploy. Checkboxes persist per visitor in the browser even when sync is off.

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
