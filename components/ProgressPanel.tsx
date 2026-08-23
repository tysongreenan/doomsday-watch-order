type ProgressPanelProps = {
  watchedCount: number;
  total: number;
  ready: boolean;
  onReset: () => void;
};

export function ProgressPanel({
  watchedCount,
  total,
  ready,
  onReset,
}: ProgressPanelProps) {
  const percent = total === 0 ? 0 : Math.round((watchedCount / total) * 100);

  return (
    <section className="rounded-2xl border border-ember/25 bg-black/45 p-4 sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ember-hot">
            Homework progress
          </p>
          <p className="mt-1 font-display text-2xl tracking-wide">
            {ready ? watchedCount : "–"} of {total} essential
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={!ready || watchedCount === 0}
          className="rounded-full border border-white/12 px-3 py-1.5 text-sm text-muted transition-colors hover:border-ember/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset progress
        </button>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-white/8"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={ready ? watchedCount : 0}
        aria-label="Essential titles watched"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-ember-deep via-ember to-ember-hot transition-[width] duration-300"
          style={{ width: ready ? `${percent}%` : "0%" }}
        />
      </div>
    </section>
  );
}
