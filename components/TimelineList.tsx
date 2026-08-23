import { TitleCard } from "@/components/TitleCard";
import { groupTitlesByRailYear } from "@/lib/timeline";
import type { SortMode, Title } from "@/lib/types";

type TimelineListProps = {
  titles: Title[];
  sortMode: SortMode;
  watched: Set<string>;
  ready: boolean;
  onToggle: (id: string) => void;
  providersById: Record<string, string[]>;
};

export function TimelineList({
  titles,
  sortMode,
  watched,
  ready,
  onToggle,
  providersById,
}: TimelineListProps) {
  const groups = groupTitlesByRailYear(titles, sortMode);
  const isStory = sortMode === "story";

  return (
    <div className="timeline-list">
      {groups.map((group) => (
        <section
          key={group.key}
          className="timeline-group"
          aria-label={`${group.label} titles`}
        >
          <div className="timeline-year">
            <span className="timeline-year-label">{group.label}</span>
          </div>
          <ol className="timeline-cards">
            {group.titles.map((title) => {
              const posterIndex = titles.indexOf(title);
              return (
                <li key={title.id}>
                  <TitleCard
                    title={title}
                    displayOrder={isStory ? title.storyOrder : title.order}
                    watched={watched.has(title.id)}
                    ready={ready}
                    onToggle={onToggle}
                    providers={providersById[title.id]}
                    eager={posterIndex < 2}
                  />
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
