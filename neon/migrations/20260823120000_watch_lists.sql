-- Docs-only schema for sync-code watch lists (Neon Postgres).
-- Production already has this table — do not recreate it there.
-- Anyone with a DOOM-XXXX code can read/write that row via the Next.js API.

create table if not exists public.watch_lists (
  code text primary key,
  watched text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint watch_lists_code_format check (code ~ '^DOOM-[A-Z0-9]{4}$')
);

create index if not exists watch_lists_updated_at_idx
  on public.watch_lists (updated_at desc);
