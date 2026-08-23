import {
  disneyPlusSearchUrl,
  isUsuallyOnDisneyPlus,
  justWatchSearchUrl,
} from "@/lib/watch-links";
import type { Title } from "@/lib/types";

type WhereToWatchProps = {
  title: Title;
  providers?: string[];
};

export function WhereToWatch({ title, providers = [] }: WhereToWatchProps) {
  const justWatch = justWatchSearchUrl(title);
  const showDisney = isUsuallyOnDisneyPlus(title);
  const upcoming = title.track === "upcoming";

  return (
    <div className="where-to-watch">
      <div className="where-to-watch-row">
        {upcoming ? (
          <span className="watch-providers">Coming soon</span>
        ) : null}
        <a
          className="watch-link"
          href={justWatch}
          target="_blank"
          rel="noreferrer"
        >
          {upcoming ? "JustWatch" : "Where to watch"}
        </a>
        {showDisney ? (
          <a
            className="watch-link watch-link-disney"
            href={title.disneyPlusUrl ?? disneyPlusSearchUrl(title)}
            target="_blank"
            rel="noreferrer"
          >
            Usually on Disney+
          </a>
        ) : null}
      </div>
      {providers.length > 0 ? (
        <p className="watch-providers">CA · {providers.join(" · ")}</p>
      ) : null}
    </div>
  );
}
