import { allTitles } from "@/lib/titles";
import type { TmdbMediaType } from "@/lib/types";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type CachedProviders = {
  expiresAt: number;
  byTitleId: Record<string, string[]>;
};

let cache: CachedProviders | null = null;
const CACHE_MS = 6 * 60 * 60 * 1000;

type TmdbProvider = { provider_name?: string };
type TmdbRegion = {
  flatrate?: TmdbProvider[];
  ads?: TmdbProvider[];
  free?: TmdbProvider[];
};
type TmdbWatchResponse = {
  results?: Record<string, TmdbRegion>;
};

export async function GET(request: Request) {
  if (isRateLimited(`providers:${clientKey(request)}`)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  const key = tmdbKey();
  if (!key) {
    return Response.json({ enabled: false, byTitleId: {} });
  }

  if (cache && Date.now() < cache.expiresAt) {
    return Response.json({ enabled: true, byTitleId: cache.byTitleId });
  }

  const entries = await Promise.all(
    allTitles.map(async (title) => {
      const names = await fetchCanadaProviders(
        title.tmdb.mediaType,
        title.tmdb.id,
        key,
      );
      return [title.id, names] as const;
    }),
  );

  const byTitleId: Record<string, string[]> = {};
  for (const [id, names] of entries) {
    if (names.length > 0) byTitleId[id] = names;
  }

  cache = { expiresAt: Date.now() + CACHE_MS, byTitleId };
  return Response.json({ enabled: true, byTitleId });
}

function tmdbKey(): string | undefined {
  const value = (
    process.env.TMDB_API_KEY ?? process.env.NEXT_PUBLIC_TMDB_API_KEY
  )?.trim();
  return value || undefined;
}

async function fetchCanadaProviders(
  mediaType: TmdbMediaType,
  id: number,
  key: string,
): Promise<string[]> {
  const path = `/${mediaType}/${id}/watch/providers`;
  const { url, headers } = tmdbRequest(path, key);

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 21_600 },
    });
    if (!response.ok) return [];
    const json = (await response.json()) as TmdbWatchResponse;
    const region = json.results?.CA;
    if (!region) return [];

    const names = [
      ...(region.flatrate ?? []),
      ...(region.ads ?? []),
      ...(region.free ?? []),
    ]
      .map((provider) => provider.provider_name?.trim())
      .filter((name): name is string => Boolean(name));

    return [...new Set(names)].slice(0, 6);
  } catch {
    return [];
  }
}

function tmdbRequest(
  path: string,
  key: string,
): { url: string; headers: HeadersInit } {
  if (key.startsWith("eyJ")) {
    return {
      url: `https://api.themoviedb.org/3${path}`,
      headers: { Authorization: `Bearer ${key}`, accept: "application/json" },
    };
  }

  return {
    url: `https://api.themoviedb.org/3${path}?api_key=${encodeURIComponent(key)}`,
    headers: { accept: "application/json" },
  };
}
