"use client";

import { useEffect, useState } from "react";

type ProvidersResponse = {
  enabled?: boolean;
  byTitleId?: Record<string, string[]>;
};

export function useWatchProviders(): Record<string, string[]> {
  const [byTitleId, setByTitleId] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/watch-providers")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ProvidersResponse | null) => {
        if (cancelled || !data?.byTitleId) return;
        setByTitleId(data.byTitleId);
      })
      .catch(() => {
        // JustWatch links still work without TMDB.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return byTitleId;
}
