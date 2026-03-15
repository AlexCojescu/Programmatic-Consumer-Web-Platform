/**
 * In-memory rate limiter for API routes (OWASP: protect against abuse).
 * Keyed by identifier: IP and optionally user (so limits apply per IP and per user).
 * Uses a sliding window: keeps timestamps of recent requests and allows max N per window.
 * Graceful 429 responses include Retry-After and JSON body.
 */

const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute
const DEFAULT_MAX_REQUESTS = 20;

const store = new Map<string, number[]>();

function prune(timestamps: number[], windowMs: number): number[] {
  const cutoff = Date.now() - windowMs;
  return timestamps.filter((t) => t > cutoff);
}

export type RateLimitResult =
  | { ok: true; remaining: number; resetInMs: number }
  | { ok: false; retryAfterMs: number };

/**
 * Check rate limit for the given key (e.g. client IP or composite IP+user).
 * Returns { ok: true, ... } if under limit, { ok: false, retryAfterMs } if over.
 */
export function checkRateLimit(
  key: string,
  options: { windowMs?: number; maxRequests?: number } = {}
): RateLimitResult {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const maxRequests = options.maxRequests ?? DEFAULT_MAX_REQUESTS;

  const now = Date.now();
  let timestamps = store.get(key) ?? [];
  timestamps = prune(timestamps, windowMs);

  if (timestamps.length >= maxRequests) {
    const oldestInWindow = timestamps[0];
    const retryAfterMs = oldestInWindow + windowMs - now;
    return { ok: false, retryAfterMs: Math.max(0, Math.ceil(retryAfterMs / 1000) * 1000) };
  }

  timestamps.push(now);
  store.set(key, timestamps);

  const resetInMs = timestamps.length === 1 ? windowMs : timestamps[0] + windowMs - now;
  return {
    ok: true,
    remaining: maxRequests - timestamps.length,
    resetInMs: Math.max(0, resetInMs),
  };
}

/**
 * Get client IP from request headers (works behind proxies). Do not trust client-supplied
 * headers in untrusted environments; prefer platform-provided (e.g. Vercel) when available.
 */
export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Optional user-based identifier (e.g. auth header or session id). Use when you have
 * authenticated users so rate limits can be applied per user as well as per IP.
 */
export function getUserIdentifier(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7).trim();
    if (token.length > 0) return token.slice(0, 64); // cap length for storage key
  }
  // Optional: session cookie or similar
  return null;
}

/**
 * Composite key for rate limiting: IP + optional user. Ensures both IP and user are
 * limited (e.g. same user from different IPs gets separate limits per IP).
 */
export function getRateLimitKey(req: Request): string {
  const ip = getClientIdentifier(req);
  const user = getUserIdentifier(req);
  return user ? `ip:${ip}|user:${user}` : `ip:${ip}`;
}

/** Sensible defaults for public API endpoints (20 req/min per identifier). */
export const RATE_LIMIT_DEFAULTS = {
  windowMs: DEFAULT_WINDOW_MS,
  maxRequests: DEFAULT_MAX_REQUESTS,
};

/**
 * If over limit, returns a 429 Response with JSON body and Retry-After header.
 * Otherwise returns null so the route can proceed.
 */
export function rateLimitResponse(req: Request, options?: { windowMs?: number; maxRequests?: number }): Response | null {
  const key = getRateLimitKey(req);
  const rate = checkRateLimit(key, options ?? RATE_LIMIT_DEFAULTS);
  if (rate.ok) return null;
  const retryAfterSec = Math.ceil(rate.retryAfterMs / 1000);
  return new Response(
    JSON.stringify({
      error: "Too many requests. Please slow down.",
      retryAfter: retryAfterSec,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
      },
    }
  );
}
