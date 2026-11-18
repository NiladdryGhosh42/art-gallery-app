type AttemptRecord = {
  count: number;
  lockedUntil: number | null;
};

const attempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000; // 1 minute lockout after 5 failed attempts

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const record = attempts.get(ip);
  if (!record) return { allowed: true };

  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((record.lockedUntil - Date.now()) / 1000),
    };
  }

  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    attempts.delete(ip);
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string) {
  const current = attempts.get(ip) || { count: 0, lockedUntil: null };
  current.count += 1;
  if (current.count >= MAX_ATTEMPTS) {
    current.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  attempts.set(ip, current);
}

export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
