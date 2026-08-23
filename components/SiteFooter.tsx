import { DOOMSDAY_LABEL, GITHUB_REPO } from "@/lib/titles";
import { TMDB_CREDIT, TMDB_HOME } from "@/lib/tmdb";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border px-4 py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="max-w-xl space-y-3 leading-relaxed">
          <p>
            Fan-made watch order. Not affiliated with Marvel, Disney,
            Netflix, JustWatch, or 20th Century Studios. Avengers: Doomsday is
            scheduled for {DOOMSDAY_LABEL}. Where-to-watch links search
            JustWatch Canada and Disney+ and are not a guarantee of
            availability.
          </p>
          <p>
            {TMDB_CREDIT}{" "}
            <a
              href={TMDB_HOME}
              className="text-primary underline-offset-4 hover:text-foreground hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              themoviedb.org
            </a>
          </p>
        </div>
        <a
          href={GITHUB_REPO}
          className="label-caps text-primary underline-offset-4 hover:text-foreground hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          GitHub repo
        </a>
      </div>
    </footer>
  );
}
