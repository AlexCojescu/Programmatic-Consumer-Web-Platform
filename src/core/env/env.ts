/**
 * Centralized, secure API key and env handling (OWASP: never log keys, use env vars, rotate keys).
 * All secrets are server-side only; never expose via NEXT_PUBLIC_ or in API responses.
 */

import "server-only";

import { experimental_taintUniqueValue } from "react";
import { z } from "zod";

/** Lifetime reference for React taint checks on server secrets. */
const serverSecrets = Object.freeze({});

const secretCache = new Map<string, string>();

const emailSchema = z.string().trim().email().max(254);

const CONFIG_ERROR = "Server configuration error.";

function getEnv(key: string): string | undefined {
  return process.env[key];
}

function requireEnv(key: string): string {
  const cached = secretCache.get(key);
  if (cached) return cached;

  const value = getEnv(key);
  if (value == null || value.trim() === "") {
    throw new Error(CONFIG_ERROR);
  }

  const trimmed = value.trim();

  experimental_taintUniqueValue(
    `Do not pass ${key} to the client.`,
    serverSecrets,
    trimmed
  );

  secretCache.set(key, trimmed);
  return trimmed;
}

function requireEmailEnv(key: string): string {
  const parsed = emailSchema.safeParse(requireEnv(key));
  if (!parsed.success) {
    throw new Error(CONFIG_ERROR);
  }
  return parsed.data;
}

/** Resend API key for sending email. Server-side only. */
export function getResendApiKey(): string {
  return requireEnv("RESEND_API_KEY");
}

export function getResendFromEmail(): string {
  return requireEmailEnv("RESEND_FROM_EMAIL");
}

export function getYourEmail(): string {
  return requireEmailEnv("YOUR_EMAIL");
}

/** Cloudflare Turnstile secret. Absent in local dev when bot-check is skipped. */
export function getTurnstileSecretKey(): string | undefined {
  const value = getEnv("TURNSTILE_SECRET_KEY")?.trim();
  if (!value) return undefined;

  experimental_taintUniqueValue(
    "Do not pass TURNSTILE_SECRET_KEY to the client.",
    serverSecrets,
    value
  );

  return value;
}
