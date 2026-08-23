-- Sync-code watch lists for the Doomsday homework tracker.
-- Anyone with a code can read/write that row. Prefer SUPABASE_SERVICE_ROLE_KEY
-- on the server so this table is not exposed through the public Data API.

create table if not exists public.watch_lists (
  code text primary key,
  watched text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint watch_lists_code_format check (code ~ '^DOOM-[A-Z0-9]{4}$')
);

create index if not exists watch_lists_updated_at_idx
  on public.watch_lists (updated_at desc);

alter table public.watch_lists enable row level security;

drop policy if exists "watch_lists_select" on public.watch_lists;
drop policy if exists "watch_lists_insert" on public.watch_lists;
drop policy if exists "watch_lists_update" on public.watch_lists;

-- Used when the API is configured with the anon key instead of the service role.
-- Do not put the anon key in NEXT_PUBLIC_* — the Next.js route handlers are
-- the access layer, and the sync code is the capability.
create policy "watch_lists_select"
  on public.watch_lists
  for select
  to anon, authenticated
  using (true);

create policy "watch_lists_insert"
  on public.watch_lists
  for insert
  to anon, authenticated
  with check (true);

create policy "watch_lists_update"
  on public.watch_lists
  for update
  to anon, authenticated
  using (true)
  with check (true);

grant select, insert, update on public.watch_lists to anon, authenticated;
grant all on public.watch_lists to service_role;
