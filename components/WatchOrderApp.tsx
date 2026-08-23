"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { FilterBar } from "@/components/FilterBar";
import { OptionalTracks } from "@/components/OptionalTracks";
import { ProgressPanel } from "@/components/ProgressPanel";
import { SortBar } from "@/components/SortBar";
import { TitleCard } from "@/components/TitleCard";
import {
  getClientReadySnapshot,
  getServerReadySnapshot,
  getServerWatchedSnapshot,
  getWatchedSnapshot,
  resetWatched,
  subscribeClientReady,
  subscribeWatched,
  toggleWatched,
} from "@/lib/progress";
import {
  essentialIds,
  essentialRuntimeHint,
  fantasticFourLegacyTitles,
  sortByStoryOrder,
  STORY_ORDER_NOTE,
  titleMatchesFilter,
  titlesForSort,
  xmenDeeperTitles,
} from "@/lib/titles";
import type { FilterId, SortMode } from "@/lib/types";

export function WatchOrderApp() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [sortMode, setSortMode] = useState<SortMode>("release");
  const ready = useSyncExternalStore(
    subscribeClientReady,
    getClientReadySnapshot,
    getServerReadySnapshot,
  );
  const snapshot = useSyncExternalStore(
    subscribeWatched,
    getWatchedSnapshot,
    getServerWatchedSnapshot,
  );
  const watched = useMemo(() => new Set(JSON.parse(snapshot) as string[]), [snapshot]);

  const toggle = useCallback((id: string) => {
    toggleWatched(id);
  }, []);

  const reset = useCallback(() => {
    if (watched.size === 0) return;
    const confirmed = window.confirm(
      "Clear watched checkboxes on this device?",
    );
    if (confirmed) resetWatched();
  }, [watched.size]);

  const watchedCount = useMemo(
    () => essentialIds.filter((id) => watched.has(id)).length,
    [watched],
  );

  const mainTitles = titlesForSort(filter, sortMode);
  const visibleXmen =
    sortMode === "story"
      ? []
      : xmenDeeperTitles.filter((title) => titleMatchesFilter(title, filter));
  const visibleFf = (
    sortMode === "story"
      ? sortByStoryOrder(fantasticFourLegacyTitles)
      : fantasticFourLegacyTitles
  ).filter((title) => titleMatchesFilter(title, filter));
  const showOptional = filter !== "essential";
  const isStory = sortMode === "story";

  return (
    <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-16">
      <ProgressPanel
        watchedCount={watchedCount}
        total={essentialIds.length}
        ready={ready}
        onReset={reset}
      />

      <div className="mt-6 space-y-3">
        <SortBar value={sortMode} onChange={setSortMode} />
        <FilterBar value={filter} onChange={setFilter} />
      </div>

      <section className="mt-8">
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ember-hot">
            {isStory ? "In-universe chronology" : "Official Disney+ countdown"}
          </p>
          <h2 className="mt-1 font-display text-2xl tracking-wide sm:text-3xl">
            {isStory ? "Story order" : "Countdown to Avengers: Doomsday"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {isStory ? (
              <>
                Same titles as the official 15, plus deeper X-Men cuts woven
                into in-universe order for Doomsday prep. Checkboxes stay
                tied to each title. {STORY_ORDER_NOTE}
              </>
            ) : (
              <>
                Marvel / Disney+&apos;s official 15-title prep list, shown here
                in release order. Check titles off as you go — progress stays
                on this device only. {essentialRuntimeHint}.
              </>
            )}
          </p>
        </div>

        {mainTitles.length > 0 ? (
          <ol className="space-y-3">
            {mainTitles.map((title) => (
              <li key={title.id}>
                <TitleCard
                  title={title}
                  displayOrder={isStory ? title.storyOrder : title.order}
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
