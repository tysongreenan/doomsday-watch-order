"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { FilterBar } from "@/components/FilterBar";
import { OptionalTracks } from "@/components/OptionalTracks";
import { OrderModeCards } from "@/components/OrderModeCards";
import { ProgressPanel } from "@/components/ProgressPanel";
import { SyncCodePanel } from "@/components/SyncCodePanel";
import { TimelineList } from "@/components/TimelineList";
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
import { useWatchProviders } from "@/lib/watch-providers";
import {
  essentialIds,
  fantasticFourLegacyTitles,
  sortByStoryOrder,
  titleMatchesFilter,
  titlesForSort,
} from "@/lib/titles";
import type { FilterId, SortMode, Title } from "@/lib/types";

export function WatchOrderApp() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [sortMode, setSortMode] = useState<SortMode>("story");
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
  const providersById = useWatchProviders();

  const toggle = useCallback((id: string) => {
    toggleWatched(id);
  }, []);

  const reset = useCallback(() => {
    if (watched.size === 0) return;
    const confirmed = window.confirm("Clear watched titles on this device?");
    if (confirmed) resetWatched();
  }, [watched.size]);

  const watchedCount = useMemo(
    () => essentialIds.filter((id) => watched.has(id)).length,
    [watched],
  );

  const mainTitles = titlesForSort(filter, sortMode);
  const visibleXmen: Title[] = [];
  const visibleFf = (
    sortMode === "story"
      ? sortByStoryOrder(fantasticFourLegacyTitles)
      : fantasticFourLegacyTitles
  ).filter((title) => titleMatchesFilter(title, filter));
  const showOptional = filter !== "essential" && filter !== "upcoming";
  const isStory = sortMode === "story";

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <OrderModeCards value={sortMode} onChange={setSortMode} />
      <SyncCodePanel />

      <div className="mt-8 space-y-4">
        <FilterBar value={filter} onChange={setFilter} />
        <ProgressPanel
          watchedCount={watchedCount}
          total={essentialIds.length}
          ready={ready}
          onReset={reset}
        />
      </div>

      <section className="mt-8">
        <div className="mb-6">
          <p className="label-caps text-primary">
            {isStory ? "In-universe" : "By release year"}
          </p>
          <h2 className="section-title mt-2">
            {isStory ? "Timeline order" : "Release order"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            {isStory
              ? "From Captain America in 1943 through Doomsday in 2026. Check titles off as you go."
              : "The same titles, by the year they came out."}
          </p>
        </div>

        {mainTitles.length > 0 ? (
          <TimelineList
            titles={mainTitles}
            sortMode={sortMode}
            watched={watched}
            ready={ready}
            onToggle={toggle}
            providersById={providersById}
          />
        ) : (
          <p className="empty-panel px-4 py-6 text-sm text-muted">
            No titles match this filter.
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
          providersById={providersById}
        />
      ) : null}
    </div>
  );
}
