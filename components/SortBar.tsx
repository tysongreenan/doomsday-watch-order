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
            className={`rounded-full border px-3 py-2 text-sm transition-colors ${
              selected
                ? "border-ember bg-ember text-black"
                : "border-white/12 bg-black/30 text-foreground hover:border-ember/40"
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
