"use client";

import { useEffect, useState } from "react";
import { DOOMSDAY_DATE } from "@/lib/titles";

function daysUntilDoomsday(): number {
  const target = Date.parse(`${DOOMSDAY_DATE}T00:00:00`);
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / 86_400_000));
}

export function DaysUntil() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysUntilDoomsday());
  }, []);

  return (
    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1.5 text-sm text-ember-hot">
      <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
      {days == null
        ? "Counting down to December 18, 2026"
        : days === 0
          ? "Doomsday is today"
          : `${days} day${days === 1 ? "" : "s"} until Doomsday`}
    </p>
  );
}
