"use client";

import { useSyncExternalStore } from "react";
import { DOOMSDAY_DATE } from "@/lib/titles";

function daysUntilDoomsday(): number {
  const target = Date.parse(`${DOOMSDAY_DATE}T00:00:00`);
  return Math.max(0, Math.ceil((target - Date.now()) / 86_400_000));
}

function subscribeToDay(onStoreChange: () => void): () => void {
  const id = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(id);
}

export function DaysUntil() {
  const days = useSyncExternalStore(
    subscribeToDay,
    daysUntilDoomsday,
    () => -1,
  );

  const label =
    days < 0
      ? "Counting down to December 18, 2026"
      : days === 0
        ? "Doomsday is today"
        : `${days} day${days === 1 ? "" : "s"} until Doomsday`;

  return (
    <p className="btn-primary mt-8" aria-live="polite">
      {label}
    </p>
  );
}
