import { DOOMSDAY_DATE } from "./titles";

/**
 * Shared public countdown: midnight at the start of Doomsday
 * in America/Toronto. December is Eastern Standard Time (UTC−5),
 * so this is `2026-12-18T00:00:00-05:00`.
 */
export const DOOMSDAY_TIME_ZONE = "America/Toronto";
export const DOOMSDAY_INSTANT = Date.parse(`${DOOMSDAY_DATE}T00:00:00-05:00`);

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

const EMPTY: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  totalMs: 0,
};

/** Last snapshot. useSyncExternalStore requires Object.is-stable getSnapshot. */
let cachedParts: CountdownParts = EMPTY;

function sameUnits(left: CountdownParts, right: CountdownParts): boolean {
  return (
    left.days === right.days &&
    left.hours === right.hours &&
    left.minutes === right.minutes &&
    left.seconds === right.seconds
  );
}

export function getCountdownParts(now = Date.now()): CountdownParts {
  const remainingMs = DOOMSDAY_INSTANT - now;
  if (remainingMs <= 0) {
    cachedParts = EMPTY;
    return cachedParts;
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const next: CountdownParts = {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    totalMs: totalSeconds * 1000,
  };

  if (cachedParts !== EMPTY && sameUnits(cachedParts, next)) {
    return cachedParts;
  }
  cachedParts = next;
  return cachedParts;
}

export function countdownHeadline(parts: CountdownParts): string {
  if (parts.totalMs <= 0) return "Doomsday is here";
  if (parts.days > 1) return `Just ${parts.days} days till Doomsday`;
  if (parts.days === 1) return "Just 1 day till Doomsday";
  if (parts.hours > 1) return `Just ${parts.hours} hours till Doomsday`;
  if (parts.hours === 1) return "Just 1 hour till Doomsday";
  if (parts.minutes > 1) return `Just ${parts.minutes} minutes till Doomsday`;
  if (parts.minutes === 1) return "Just 1 minute till Doomsday";
  return "Doomsday is here";
}

export const SERVER_COUNTDOWN_HEADLINE = "Countdown to Doomsday";
