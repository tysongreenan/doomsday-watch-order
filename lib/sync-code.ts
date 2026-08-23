export const SYNC_CODE_PATTERN = /^DOOM-[A-Z0-9]{4}$/;
export const SYNC_COOKIE = "doomsday_watch_code";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function isValidSyncCode(value: string): boolean {
  return SYNC_CODE_PATTERN.test(value);
}

export function generateSyncCode(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const byte of bytes) {
    suffix += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  }
  return `DOOM-${suffix}`;
}

/** Accepts `DOOM-AB12`, `doom-ab12`, or `AB12`. */
export function normalizeSyncCode(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/[\s_]+/g, "");
  if (!cleaned) return null;
  const withPrefix = cleaned.startsWith("DOOM-") ? cleaned : `DOOM-${cleaned}`;
  return isValidSyncCode(withPrefix) ? withPrefix : null;
}
