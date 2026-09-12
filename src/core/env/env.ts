/**
 * Centralized, secure API key and env handling (OWASP: never log keys, use env vars, rotate keys).
 * All secrets are server-side only; never expose via NEXT_PUBLIC_ or in API responses.
 */

import { experimental_taintUniqueValue } from "react";

/** Lifetime reference for React taint checks on server secrets. */
const serverSecrets = Object.freeze({});

const secretCache = new Map<string, string>();

function getEnv(key: string): string | undefined {
  return process.env[key];
}

function requireEnv(key: string, friendlyName: string): string {
  const cached = secretCache.get(key);
  if (cached) return cached;

  const value = getEnv(key);
  if (value == null || value.trim() === "") {
    throw new Error(`${friendlyName} is not set. Add ${key} to your environment (e.g. .env.local).`);
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

/** Resend API key for sending email. Server-side only. */
export function getResendApiKey(): string {
  return requireEnv("RESEND_API_KEY", "RESEND_API_KEY");
}

export function getResendFromEmail(): string {
  return requireEnv("RESEND_FROM_EMAIL", "RESEND_FROM_EMAIL");
}

export function getYourEmail(): string {
  return requireEnv("YOUR_EMAIL", "YOUR_EMAIL");
}
