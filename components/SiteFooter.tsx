import { DOOMSDAY_LABEL, GITHUB_REPO } from "@/lib/titles";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/8 px-4 py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-md leading-relaxed">
          Fan-made homework tracker. Not affiliated with Marvel, Disney, or
          20th Century Studios. Avengers: Doomsday is scheduled for{" "}
          {DOOMSDAY_LABEL}.
        </p>
        <a
          href={GITHUB_REPO}
          className="text-ember-hot underline-offset-4 hover:text-foreground hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          GitHub repo
        </a>
      </div>
    </footer>
  );
}
