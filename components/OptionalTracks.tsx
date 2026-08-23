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
};

export function OptionalTracks({
  xmenTitles,
  ffTitles,
  watched,
  ready,
  onToggle,
  expandXmen,
  expandFf,
}: OptionalTracksProps) {
  if (xmenTitles.length === 0 && ffTitles.length === 0) return null;

  return (
    <div className="mt-10 space-y-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
        Optional tracks · not on the official countdown
      </p>
      {xmenTitles.length > 0 ? (
        <details
          className="rounded-2xl border border-white/8 bg-black/25 open:border-ember/20"
          {...(expandXmen ? { open: true } : {})}
        >
          <summary className="cursor-pointer list-none px-4 py-4 font-display text-lg tracking-wide sm:px-5">
            <span className="flex items-center justify-between gap-3">
              Deeper X-Men
              <span className="text-xs font-sans uppercase tracking-[0.16em] text-muted">
                {xmenTitles.length} titles
              </span>
            </span>
            <p className="mt-1 font-sans text-sm font-normal tracking-normal text-muted">
              First Class, Days of Future Past, Logan, and the Deadpool films
              before the MCU handshake.
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
              />
            ))}
          </div>
        </details>
      ) : null}
      {ffTitles.length > 0 ? (
        <details
          className="rounded-2xl border border-white/8 bg-black/25 open:border-ember/20"
          {...(expandFf ? { open: true } : {})}
        >
          <summary className="cursor-pointer list-none px-4 py-4 font-display text-lg tracking-wide sm:px-5">
            <span className="flex items-center justify-between gap-3">
              Older Fantastic Four
              <span className="text-xs font-sans uppercase tracking-[0.16em] text-muted">
                Optional / non-MCU
              </span>
            </span>
            <p className="mt-1 font-sans text-sm font-normal tracking-normal text-muted">
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
              />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
