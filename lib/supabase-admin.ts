import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type WatchListRow = {
  code: string;
  watched: string[];
  updated_at: string;
};

let cached: SupabaseClient | null | undefined;

export function isSyncConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseKey());
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) {
    cached = null;
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

function supabaseUrl(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  return value || undefined;
}

function supabaseKey(): string | undefined {
  const value = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();
  return value || undefined;
}
