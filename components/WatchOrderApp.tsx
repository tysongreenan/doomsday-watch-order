"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { OptionalTracks } from "@/components/OptionalTracks";
import { ProgressPanel } from "@/components/ProgressPanel";
import { TitleCard } from "@/components/TitleCard";
import { loadWatchedIds, saveWatchedIds } from "@/lib/progress";
import {
  essentialIds,
  essentialRuntimeHint,
  essentialTitles,
  fantasticFourLegacyTitles,
  titleMatchesFilter,
  xmenDeeperTitles,
} from "@/lib/titles";
import type { FilterId } from "@/lib/types";

export function WatchOrderApp() {
  const [watched, setWatched] = useState<Set<string>>(() => new Set());
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<FilterId>("all");

  useEffect(() => {
    setWatched(new Set(loadWatchedIds()));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveWatchedIds([...watched]);
  }, [ready, watched]);

  const toggle = useCallback((id: string) => {
    setWatched((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (watched.size === 0) return;
    const confirmed = window.confirm(
      "Clear watched checkboxes on this device?",
    );
    if (confirmed) setWatched(new Set());
  }, [watched.size]);

  const watchedCount = useMemo(
    () => essentialIds.filter((id) => watched.has(id)).length,
    [watched],
  );

  const visibleEssentials = essentialTitles.filter((title) =>
    titleMatchesFilter(title, filter),
  );
  const visibleXmen = xmenDeeperTitles.filter((title) =>
    titleMatchesFilter(title, filter),
  );
  const visibleFf = fantasticFourLegacyTitles.filter((title) =>
    titleMatchesFilter(title, filter),
  );
  const showOptional = filter !== "essential";

  return (
    <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-16">
      <ProgressPanel
        watchedCount={watchedCount}
        total={essentialIds.length}
        ready={ready}
        onReset={reset}
      />

      <div className="mt-6">
        <FilterBar value={filter} onChange={setFilter} />
      </div>

      <section className="mt-8">
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ember-hot">
            Official Disney+ countdown
          </p>
          <h2 className="mt-1 font-display text-2xl tracking-wide sm:text-3xl">
            Countdown to Avengers: Doomsday
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Marvel / Disney+&apos;s official 15-title prep list, shown here in
            release order. Check titles off as you go — progress stays on this
            device only. {essentialRuntimeHint}.
          </p>
        </div>

        {visibleEssentials.length > 0 ? (
          <ol className="space-y-3">
            {visibleEssentials.map((title) => (
              <li key={title.id}>
                <TitleCard
                  title={title}
                  watched={watched.has(title.id)}
                  ready={ready}
                  onToggle={toggle}
                />
              </li>
            ))}
          </ol>
        ) : (
          <p className="rounded-2xl border border-white/8 px-4 py-6 text-sm text-muted">
            No official countdown titles match this filter.
          </p>
        )}
      </section>

      {showOptional ? (
        <OptionalTracks
          xmenTitles={visibleXmen}
          ffTitles={visibleFf}
          watched={watched}
          ready={ready}
          onToggle={toggle}
          expandXmen={filter === "xmen"}
          expandFf={filter === "fantastic-four"}
        />
      ) : null}
    </div>
  );
}
