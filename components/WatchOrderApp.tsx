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
import { useWatchProviders } from "@/lib/watch-providers";
import {
  essentialIds,
  essentialRuntimeHint,
  fantasticFourLegacyTitles,
  sortByStoryOrder,
  STORY_ORDER_NOTE,
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
    const confirmed = window.confirm(
      "Clear watched checkboxes on this device and your sync list?",
    );
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
    <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
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
        <div className="mb-6">
          <p className="label-caps text-primary">
            {isStory
              ? "In-universe chronology · default"
              : "Release order · official countdown"}
          </p>
          <h2 className="section-title mt-2">
            {isStory ? "Timeline order" : "Release order"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            {isStory ? (
              <>
                Default view: in-universe chronology for Doomsday prep. The
                official Disney+ countdown is 15 titles; we add Spider-Man:
                Brand New Day as essential #16, then recommended deeper cuts
                and the upcoming Avengers films. Essential only still means
                those 16. {STORY_ORDER_NOTE}
              </>
            ) : (
              <>
                Same list by theatrical year — official Disney+ 15, Brand New
                Day as #16, plus recommended extras and upcoming Avengers
                unless you filter to Essential only. Check titles off as you
                go — progress syncs with a short code when the backend is
                configured, and stays on this device either way.{" "}
                {essentialRuntimeHint}.
              </>
            )}
          </p>
        </div>

        {mainTitles.length > 0 ? (
          <ol className="space-y-4">
            {mainTitles.map((title) => (
              <li key={title.id}>
                <TitleCard
                  title={title}
                  displayOrder={isStory ? title.storyOrder : title.order}
                  watched={watched.has(title.id)}
                  ready={ready}
                  onToggle={toggle}
                  providers={providersById[title.id]}
                />
              </li>
            ))}
          </ol>
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
