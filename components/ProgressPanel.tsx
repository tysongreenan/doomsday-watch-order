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
    <div className="progress-strip">
      <div className="progress-strip-row">
        <p className="text-sm text-muted">
          {ready ? watchedCount : "–"} of {total} must-watch
        </p>
        <button
          type="button"
          onClick={onReset}
          disabled={!ready || watchedCount === 0}
          className="reset-link"
        >
          Reset
        </button>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={ready ? watchedCount : 0}
        aria-label="Must-watch titles watched"
      >
        <div
          className="progress-fill"
          style={{ width: ready ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}
