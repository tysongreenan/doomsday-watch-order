import { neon, NeonDbError, type NeonQueryFunction } from "@neondatabase/serverless";

export type WatchListRow = {
  code: string;
  watched: string[];
  updated_at: string;
};

type Sql = NeonQueryFunction<false, false>;

let cached: Sql | null | undefined;

export function isSyncConfigured(): boolean {
  return Boolean(databaseUrl());
}

export async function getWatchListByCode(
  code: string,
): Promise<WatchListRow | null> {
  const sql = getSql();
  if (!sql) return null;

  const rows = await sql`
    SELECT code, watched, updated_at
    FROM watch_lists
    WHERE code = ${code}
    LIMIT 1
  `;

  const row = rows[0];
  return row ? mapWatchListRow(row) : null;
}

export async function upsertWatchList(
  code: string,
  watched: string[],
  updatedAt: string,
): Promise<WatchListRow> {
  const sql = requireSql();
  const rows = await sql`
    INSERT INTO watch_lists (code, watched, updated_at)
    VALUES (${code}, ${watched}, ${updatedAt}::timestamptz)
    ON CONFLICT (code) DO UPDATE SET
      watched = EXCLUDED.watched,
      updated_at = EXCLUDED.updated_at
    RETURNING code, watched, updated_at
  `;

  const row = rows[0];
  if (!row) {
    throw new Error("Watch list upsert returned no row.");
  }
  return mapWatchListRow(row);
}

export async function insertWatchList(
  code: string,
  watched: string[],
  updatedAt: string,
): Promise<{ ok: true; row: WatchListRow } | { ok: false; uniqueViolation: boolean }> {
  const sql = requireSql();
  try {
    const rows = await sql`
      INSERT INTO watch_lists (code, watched, updated_at)
      VALUES (${code}, ${watched}, ${updatedAt}::timestamptz)
      RETURNING code, watched, updated_at
    `;
    const row = rows[0];
    if (!row) {
      return { ok: false, uniqueViolation: false };
    }
    return { ok: true, row: mapWatchListRow(row) };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, uniqueViolation: true };
    }
    throw error;
  }
}

function databaseUrl(): string | undefined {
  const value = process.env.DATABASE_URL?.trim();
  return value || undefined;
}

function getSql(): Sql | null {
  if (cached !== undefined) return cached;

  const url = databaseUrl();
  if (!url) {
    cached = null;
    return null;
  }

  cached = neon<false, false>(url);
  return cached;
}

function requireSql(): Sql {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not set.");
  }
  return sql;
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof NeonDbError && error.code === "23505";
}

function mapWatchListRow(row: Record<string, unknown>): WatchListRow {
  return {
    code: typeof row.code === "string" ? row.code : "",
    watched: Array.isArray(row.watched)
      ? row.watched.filter((id): id is string => typeof id === "string")
      : [],
    updated_at: toIso(row.updated_at),
  };
}

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return new Date().toISOString();
}
