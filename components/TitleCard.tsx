import Image from "next/image";
import { WhereToWatch } from "@/components/WhereToWatch";
import { formatRuntime, FRANCHISE_LABEL } from "@/lib/titles";
import { tmdbImageUrl } from "@/lib/tmdb";
import type { Title } from "@/lib/types";

type TitleCardProps = {
  title: Title;
  watched: boolean;
  ready: boolean;
  onToggle: (id: string) => void;
  /** Badge in the circle — countdown number, story number, or a bullet. */
  displayOrder?: number | string;
  providers?: string[];
};

export function TitleCard({
  title,
  watched,
  ready,
  onToggle,
  displayOrder,
  providers,
}: TitleCardProps) {
  const runtime = formatRuntime(title);
  const checkboxId = `watched-${title.id}`;
  const orderBadge = displayOrder ?? title.order ?? "•";
  const optionalLabel =
    title.optionalNote ??
    (title.track === "upcoming"
      ? "Coming soon"
      : title.track === "recommended"
        ? "Recommended"
        : title.track !== "essential"
          ? "Optional"
          : undefined);

  return (
    <article className={`title-card ${watched ? "is-watched" : ""}`}>
      <div className="title-card-rail" aria-hidden />
      <div className="title-poster">
        <Image
          src={tmdbImageUrl(title.tmdb.posterPath, "w342")}
          alt={`${title.title} (${title.year}) poster`}
          fill
          sizes="(max-width: 640px) 108px, 156px"
          className="title-poster-img"
        />
        <span className="title-poster-shade" aria-hidden />
        <span className="title-poster-bar" />
        <span className="title-poster-number">{orderBadge}</span>
        {watched ? <span className="title-poster-stamp">Watched</span> : null}
      </div>

      <div className="title-card-body">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <label htmlFor={checkboxId} className="cursor-pointer">
            <h3
              className={`text-lg font-extrabold leading-tight tracking-wide uppercase sm:text-xl ${
                watched ? "text-muted line-through decoration-primary" : ""
              }`}
            >
              {title.title}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {title.year}
              <span className="mx-2 text-border">·</span>
              {title.type === "series" ? "Series" : "Movie"}
              {runtime ? (
                <>
                  <span className="mx-2 text-border">·</span>
                  {runtime}
                </>
              ) : null}
            </p>
          </label>
          {optionalLabel ? (
            <span className="optional-chip">{optionalLabel}</span>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1">
          {title.franchises.map((franchise) => (
            <span key={franchise} className="franchise-chip">
              {FRANCHISE_LABEL[franchise]}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-muted">{title.whyItMatters}</p>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex items-center gap-2">
            <input
              id={checkboxId}
              type="checkbox"
              checked={ready ? watched : false}
              disabled={!ready}
              onChange={() => onToggle(title.id)}
              className="watch-check"
              aria-label={`Mark ${title.title} as watched`}
            />
            <label
              htmlFor={checkboxId}
              className="label-caps cursor-pointer text-muted"
            >
              Mark watched
            </label>
          </div>
          <WhereToWatch title={title} providers={providers} />
        </div>
      </div>
    </article>
  );
}
