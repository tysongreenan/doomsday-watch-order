import { formatRuntime, FRANCHISE_LABEL } from "@/lib/titles";
import type { Title } from "@/lib/types";

type TitleCardProps = {
  title: Title;
  watched: boolean;
  ready: boolean;
  onToggle: (id: string) => void;
};

export function TitleCard({ title, watched, ready, onToggle }: TitleCardProps) {
  const runtime = formatRuntime(title);
  const checkboxId = `watched-${title.id}`;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border bg-ash/80 transition-colors ${
        watched
          ? "border-ember/35 bg-ember/5"
          : "border-white/8 hover:border-ember/30"
      }`}
    >
      <div className="flex gap-3 p-4 sm:gap-5 sm:p-5">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full border font-display text-sm tracking-wide sm:h-12 sm:w-12 ${
              watched
                ? "border-ember bg-ember text-black"
                : "border-white/15 bg-black/40 text-ember-hot"
            }`}
          >
            {title.order ?? "•"}
          </div>
          <input
            id={checkboxId}
            type="checkbox"
            checked={ready ? watched : false}
            disabled={!ready}
            onChange={() => onToggle(title.id)}
            className="h-5 w-5 cursor-pointer accent-ember disabled:cursor-wait"
            aria-label={`Mark ${title.title} as watched`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <label htmlFor={checkboxId} className="cursor-pointer">
              <h3
                className={`font-display text-lg leading-tight tracking-wide sm:text-xl ${
                  watched ? "text-muted line-through decoration-ember/50" : ""
                }`}
              >
                {title.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {title.year}
                <span className="mx-2 text-white/20">·</span>
                {title.type === "series" ? "Series" : "Movie"}
                {runtime ? (
                  <>
                    <span className="mx-2 text-white/20">·</span>
                    {runtime}
                  </>
                ) : null}
              </p>
            </label>
            {title.optionalNote ? (
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                {title.optionalNote}
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {title.franchises.map((franchise) => (
              <span
                key={franchise}
                className="rounded-full border border-ember/25 bg-ember/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-ember-hot"
              >
                {FRANCHISE_LABEL[franchise]}
              </span>
            ))}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#ddd2c6]">
            {title.whyItMatters}
          </p>
        </div>
      </div>
    </article>
  );
}
