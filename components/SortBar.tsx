import { SORT_MODES } from "@/lib/titles";
import type { SortMode } from "@/lib/types";

type SortBarProps = {
  value: SortMode;
  onChange: (sort: SortMode) => void;
};

export function SortBar({ value, onChange }: SortBarProps) {
  return (
    <div
      className="grid grid-cols-2 gap-2"
      role="radiogroup"
      aria-label="Watch-order sort"
    >
      {SORT_MODES.map((mode) => {
        const selected = value === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(mode.id)}
            className="chip"
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
