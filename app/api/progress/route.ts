import {
  getWatchListByCode,
  insertWatchList,
  isSyncConfigured,
  upsertWatchList,
} from "@/lib/db";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import {
  generateSyncCode,
  isValidSyncCode,
  normalizeSyncCode,
  SYNC_COOKIE,
} from "@/lib/sync-code";
import { sanitizeWatchedIds } from "@/lib/title-ids";

export const dynamic = "force-dynamic";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function GET(request: Request) {
  const limited = rateLimitResponse(request);
  if (limited) return limited;

  if (!isSyncConfigured()) {
    return Response.json({ enabled: false }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("code");
  if (!raw) {
    return Response.json({ enabled: true });
  }

  const code = normalizeSyncCode(raw);
  if (!code) {
    return Response.json(
      { enabled: true, error: "Invalid sync code. Use DOOM-XXXX." },
      { status: 400 },
    );
  }

  try {
    const data = await getWatchListByCode(code);
    if (!data) {
      return Response.json(
        { enabled: true, error: "No list found for that code." },
        { status: 404 },
      );
    }

    return jsonWithCodeCookie(
      {
        enabled: true,
        code: data.code,
        watched: sanitizeWatchedIds(data.watched),
        updatedAt: data.updated_at,
      },
      data.code,
    );
  } catch {
    return Response.json(
      { enabled: true, error: "Could not load progress." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const limited = rateLimitResponse(request);
  if (limited) return limited;

  if (!isSyncConfigured()) {
    return Response.json({ enabled: false }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { enabled: true, error: "Expected JSON body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return Response.json(
      { enabled: true, error: "Expected JSON object." },
      { status: 400 },
    );
  }

  const payload = body as { code?: unknown; watched?: unknown };
  const watched = sanitizeWatchedIds(payload.watched);
  const requested =
    typeof payload.code === "string" ? normalizeSyncCode(payload.code) : null;

  if (typeof payload.code === "string" && payload.code.trim() && !requested) {
    return Response.json(
      { enabled: true, error: "Invalid sync code. Use DOOM-XXXX." },
      { status: 400 },
    );
  }

  const updatedAt = new Date().toISOString();

  if (requested) {
    try {
      const data = await upsertWatchList(requested, watched, updatedAt);
      return jsonWithCodeCookie(
        {
          enabled: true,
          code: data.code,
          watched: sanitizeWatchedIds(data.watched),
          updatedAt: data.updated_at,
        },
        data.code,
      );
    } catch {
      return Response.json(
        { enabled: true, error: "Could not save progress." },
        { status: 500 },
      );
    }
  }

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = generateSyncCode();
    if (!isValidSyncCode(code)) continue;

    try {
      const result = await insertWatchList(code, watched, updatedAt);
      if (result.ok) {
        return jsonWithCodeCookie(
          {
            enabled: true,
            code: result.row.code,
            watched: sanitizeWatchedIds(result.row.watched),
            updatedAt: result.row.updated_at,
          },
          result.row.code,
          201,
        );
      }
      if (result.uniqueViolation) continue;
      return Response.json(
        { enabled: true, error: "Could not create a sync list." },
        { status: 500 },
      );
    } catch {
      return Response.json(
        { enabled: true, error: "Could not create a sync list." },
        { status: 500 },
      );
    }
  }

  return Response.json(
    { enabled: true, error: "Could not allocate a sync code." },
    { status: 500 },
  );
}

function rateLimitResponse(request: Request): Response | null {
  if (!isRateLimited(`progress:${clientKey(request)}`)) return null;
  return Response.json({ error: "Too many requests." }, { status: 429 });
}

function jsonWithCodeCookie(
  body: unknown,
  code: string,
  status = 200,
): Response {
  return Response.json(body, {
    status,
    headers: {
      "Set-Cookie": `${SYNC_COOKIE}=${encodeURIComponent(code)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
    },
  });
}
