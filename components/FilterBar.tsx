import { FILTERS } from "@/lib/titles";
import type { FilterId } from "@/lib/types";

type FilterBarProps = {
  value: FilterId;
  onChange: (filter: FilterId) => void;
};

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <div
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      role="tablist"
      aria-label="Watch-order filters"
    >
      {FILTERS.map((filter) => {
        const selected = value === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(filter.id)}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-sm transition-colors ${
              selected
                ? "border-ember bg-ember text-black"
                : "border-white/12 bg-black/30 text-foreground hover:border-ember/40"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
