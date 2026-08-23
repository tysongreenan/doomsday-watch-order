import { SyncCodePanel } from "@/components/SyncCodePanel";

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
    <section className="panel p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps text-primary">Homework progress</p>
          <p className="section-title mt-2">
            {ready ? watchedCount : "–"} of {total} essential
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={!ready || watchedCount === 0}
          className="btn-ghost"
        >
          Reset progress
        </button>
      </div>
      <div
        className="progress-track mt-6"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={ready ? watchedCount : 0}
        aria-label="Essential titles watched"
      >
        <div
          className="progress-fill"
          style={{ width: ready ? `${percent}%` : "0%" }}
        />
      </div>
      <SyncCodePanel />
    </section>
  );
}
