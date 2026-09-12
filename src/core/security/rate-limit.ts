/**
 * Sliding-window rate limiter for server actions and API routes.
 * Production uses Upstash Redis when configured; otherwise an evicted in-memory store.
 * Keyed by scope + platform-attested client IP only (never Authorization or X-Forwarded-For).
 */

import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const DEFAULT_WINDOW_MS = 60 * 1000;
const DEFAULT_MAX_REQUESTS = 20;
const MEMORY_MAX_KEYS = 4096;

/** Stricter limits for public contact form server actions. */
export const CONTACT_FORM_RATE_LIMIT = {
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
} as const;

const memoryStore = new Map<string, number[]>();

let redisClient: Redis | null | undefined;

function prune(timestamps: number[], windowMs: number): number[] {
  const cutoff = Date.now() - windowMs;
  return timestamps.filter((t) => t > cutoff);
}

function evictMemoryIfNeeded(): void {
  if (memoryStore.size <= MEMORY_MAX_KEYS) return;

  const overflow = memoryStore.size - MEMORY_MAX_KEYS;
  const keys = memoryStore.keys();
  for (let i = 0; i < overflow; i += 1) {
    const key = keys.next().value;
    if (key) memoryStore.delete(key);
  }
}

export type RateLimitResult =
  | { ok: true; remaining: number; resetInMs: number }
  | { ok: false; retryAfterMs: number };

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token || !url.startsWith("https://")) {
    redisClient = null;
    return null;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

function checkRateLimitMemory(
  key: string,
  windowMs: number,
  maxRequests: number
): RateLimitResult {
  const now = Date.now();
  let timestamps = prune(memoryStore.get(key) ?? [], windowMs);

  if (timestamps.length === 0) {
    memoryStore.delete(key);
  }

  if (timestamps.length >= maxRequests) {
    const oldestInWindow = timestamps[0];
    const retryAfterMs = oldestInWindow + windowMs - now;
    return {
      ok: false,
      retryAfterMs: Math.max(0, Math.ceil(retryAfterMs / 1000) * 1000),
    };
  }

  timestamps.push(now);
  memoryStore.set(key, timestamps);
  evictMemoryIfNeeded();

  const resetInMs =
    timestamps.length === 1 ? windowMs : timestamps[0] + windowMs - now;
  return {
    ok: true,
    remaining: maxRequests - timestamps.length,
    resetInMs: Math.max(0, resetInMs),
  };
}

async function checkRateLimitRedis(
  client: Redis,
  key: string,
  windowMs: number,
  maxRequests: number
): Promise<RateLimitResult> {
  const redisKey = `rl:${key}`;
  const count = await client.incr(redisKey);

  if (count === 1) {
    await client.pexpire(redisKey, windowMs);
  }

  if (count > maxRequests) {
    const ttl = await client.pttl(redisKey);
    const retryAfterMs = ttl > 0 ? ttl : windowMs;
    return {
      ok: false,
      retryAfterMs: Math.max(0, Math.ceil(retryAfterMs / 1000) * 1000),
    };
  }

  const ttl = await client.pttl(redisKey);
  return {
    ok: true,
    remaining: Math.max(0, maxRequests - count),
    resetInMs: ttl > 0 ? ttl : windowMs,
  };
}

export async function checkRateLimit(
  key: string,
  options: { windowMs?: number; maxRequests?: number } = {}
): Promise<RateLimitResult> {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const maxRequests = options.maxRequests ?? DEFAULT_MAX_REQUESTS;

  const client = getRedis();
  if (client) {
    try {
      return await checkRateLimitRedis(client, key, windowMs, maxRequests);
    } catch {
      return checkRateLimitMemory(key, windowMs, maxRequests);
    }
  }

  return checkRateLimitMemory(key, windowMs, maxRequests);
}

/**
 * Prefer platform-attested IPs. Do not parse client-supplied X-Forwarded-For.
 */
export function getClientIdentifier(headerList: Headers): string {
  const vercelForwarded = headerList
    .get("x-vercel-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  if (vercelForwarded) return vercelForwarded;

  const realIp = headerList.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

export function getRateLimitKey(headerList: Headers, scope: string): string {
  return `${scope}|ip:${getClientIdentifier(headerList)}`;
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
  const result = await checkRateLimit(key, options);

  if (!result.ok) {
    throw new RateLimitError(result.retryAfterMs);
  }
}

/** Returns a 429 Response for API routes, or null when under the limit. */
export async function rateLimitResponse(
  req: Request,
  options?: { windowMs?: number; maxRequests?: number; scope?: string }
): Promise<Response | null> {
  const scope = options?.scope ?? "api";
  const key = getRateLimitKeyFromRequest(req, scope);
  const rate = await checkRateLimit(key, options ?? RATE_LIMIT_DEFAULTS);

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
