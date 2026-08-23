import { SORT_MODES } from "@/lib/titles";
import type { SortMode } from "@/lib/types";

type OrderModeCardsProps = {
  value: SortMode;
  onChange: (sort: SortMode) => void;
};

export function OrderModeCards({ value, onChange }: OrderModeCardsProps) {
  return (
    <div className="order-cards" role="radiogroup" aria-label="Watch order">
      {SORT_MODES.map((mode) => {
        const selected = value === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(mode.id)}
            className="order-card"
          >
            <span className="order-card-title">{mode.label}</span>
            <span className="order-card-hint">{mode.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
