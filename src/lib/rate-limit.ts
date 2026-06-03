/**
 * In-memory sliding-window rate limiter for server actions and API routes.
 * Keyed by scope + client IP (and optional user id when available).
 */

import { headers } from "next/headers";

const DEFAULT_WINDOW_MS = 60 * 1000;
const DEFAULT_MAX_REQUESTS = 20;

/** Stricter limits for public contact form server actions. */
export const CONTACT_FORM_RATE_LIMIT = {
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
} as const;

const store = new Map<string, number[]>();

function prune(timestamps: number[], windowMs: number): number[] {
  const cutoff = Date.now() - windowMs;
  return timestamps.filter((t) => t > cutoff);
}

export type RateLimitResult =
  | { ok: true; remaining: number; resetInMs: number }
  | { ok: false; retryAfterMs: number };

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

export function getClientIdentifier(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headerList.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export function getUserIdentifier(headerList: Headers): string | null {
  const auth = headerList.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7).trim();
    if (token.length > 0) return token.slice(0, 64);
  }

  return null;
}

export function getRateLimitKey(headerList: Headers, scope: string): string {
  const ip = getClientIdentifier(headerList);
  const user = getUserIdentifier(headerList);
  return user ? `${scope}|ip:${ip}|user:${user}` : `${scope}|ip:${ip}`;
}

/** Get client IP from a fetch Request (API routes). */
export function getClientIdentifierFromRequest(req: Request): string {
  return getClientIdentifier(req.headers);
}

export function getRateLimitKeyFromRequest(req: Request, scope = "api"): string {
  return getRateLimitKey(req.headers, scope);
}

export const RATE_LIMIT_DEFAULTS = {
  windowMs: DEFAULT_WINDOW_MS,
  maxRequests: DEFAULT_MAX_REQUESTS,
};

export class RateLimitError extends Error {
  retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super("Too many submissions. Please wait a few minutes before trying again.");
    this.name = "RateLimitError";
    this.retryAfterMs = retryAfterMs;
  }
}

/** Enforce rate limits for Next.js server actions. Throws RateLimitError when exceeded. */
export async function assertRateLimit(
  scope: string,
  options: { windowMs?: number; maxRequests?: number } = CONTACT_FORM_RATE_LIMIT
): Promise<void> {
  const headerList = await headers();
  const key = getRateLimitKey(headerList, scope);
  const result = checkRateLimit(key, options);

  if (!result.ok) {
    throw new RateLimitError(result.retryAfterMs);
  }
}

/** Returns a 429 Response for API routes, or null when under the limit. */
export function rateLimitResponse(
  req: Request,
  options?: { windowMs?: number; maxRequests?: number; scope?: string }
): Response | null {
  const scope = options?.scope ?? "api";
  const key = getRateLimitKeyFromRequest(req, scope);
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
