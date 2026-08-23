import { TitleCard } from "@/components/TitleCard";
import type { Title } from "@/lib/types";

type OptionalTracksProps = {
  xmenTitles: Title[];
  ffTitles: Title[];
  watched: Set<string>;
  ready: boolean;
  onToggle: (id: string) => void;
  expandXmen: boolean;
  expandFf: boolean;
  providersById?: Record<string, string[]>;
};

export function OptionalTracks({
  xmenTitles,
  ffTitles,
  watched,
  ready,
  onToggle,
  expandXmen,
  expandFf,
  providersById = {},
}: OptionalTracksProps) {
  if (xmenTitles.length === 0 && ffTitles.length === 0) return null;

  return (
    <div className="mt-16 space-y-4">
      <p className="label-caps text-muted">
        Optional tracks · older Fantastic Four stay off the main list
      </p>
      {xmenTitles.length > 0 ? (
        <details
          className="track-panel"
          {...(expandXmen ? { open: true } : {})}
        >
          <summary className="px-4 py-4 sm:px-6">
            <span className="flex items-center justify-between gap-3">
              <span className="section-title text-lg sm:text-xl">
                Deeper X-Men
              </span>
              <span className="label-caps text-muted">
                {xmenTitles.length} titles
              </span>
            </span>
            <p className="mt-2 text-sm font-normal tracking-normal text-muted normal-case">
              Logan stays here if it is not already in the main list — a grim
              Fox-timeline sendoff, not required plot.
            </p>
          </summary>
          <div className="space-y-3 px-3 pb-4 sm:px-4">
            {xmenTitles.map((title) => (
              <TitleCard
                key={title.id}
                title={title}
                watched={watched.has(title.id)}
                ready={ready}
                onToggle={onToggle}
                providers={providersById[title.id]}
              />
            ))}
          </div>
        </details>
      ) : null}
      {ffTitles.length > 0 ? (
        <details className="track-panel" {...(expandFf ? { open: true } : {})}>
          <summary className="px-4 py-4 sm:px-6">
            <span className="flex items-center justify-between gap-3">
              <span className="section-title text-lg sm:text-xl">
                Older Fantastic Four
              </span>
              <span className="label-caps text-muted">Optional / non-MCU</span>
            </span>
            <p className="mt-2 text-sm font-normal tracking-normal text-muted normal-case">
              Pre-MCU Fox and 2015 films. Flavor only — skip them if you are
              only doing official homework.
            </p>
          </summary>
          <div className="space-y-3 px-3 pb-4 sm:px-4">
            {ffTitles.map((title) => (
              <TitleCard
                key={title.id}
                title={title}
                watched={watched.has(title.id)}
                ready={ready}
                onToggle={onToggle}
                providers={providersById[title.id]}
              />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
