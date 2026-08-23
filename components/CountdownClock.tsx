"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import {
  countdownHeadline,
  getCountdownParts,
  SERVER_COUNTDOWN_HEADLINE,
  type CountdownParts,
} from "@/lib/countdown";

const SERVER_PARTS: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  totalMs: -1,
};

function subscribeToSecond(onStoreChange: () => void): () => void {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

const UNITS: { key: keyof Pick<CountdownParts, "days" | "hours" | "minutes" | "seconds">; label: string }[] =
  [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
  ];

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function CountdownClock({ children }: { children?: ReactNode }) {
  const parts = useSyncExternalStore(
    subscribeToSecond,
    getCountdownParts,
    () => SERVER_PARTS,
  );
  const ready = parts.totalMs >= 0;
  const headline = ready ? countdownHeadline(parts) : SERVER_COUNTDOWN_HEADLINE;

  return (
    <div className="countdown">
      <h1 className="hero-title">{headline}</h1>
      {children}
      <div className="countdown-clock" role="timer" aria-live="polite" aria-label={headline}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="countdown-unit">
            <span className="countdown-value">
              {ready ? (unit.key === "days" ? String(parts[unit.key]) : pad(parts[unit.key])) : "––"}
            </span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
