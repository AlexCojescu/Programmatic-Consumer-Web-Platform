import "server-only";

import { getTurnstileSecretKey } from "@/core/env/env";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const VERIFY_FAILED = "Please complete the verification challenge.";
const GENERIC_FAILURE = "Failed to send message. Please try again later.";

type TurnstileVerifyResponse = {
  success?: boolean;
};

export async function verifyTurnstile(
  token: string | undefined,
  ip: string
): Promise<void> {
  const secret = getTurnstileSecretKey();
  const isProd = process.env.NODE_ENV === "production";

  if (!secret) {
    if (isProd) {
      throw new Error(GENERIC_FAILURE);
    }
    return;
  }

  const trimmed = token?.trim() ?? "";
  if (trimmed.length === 0 || trimmed.length > 2048) {
    throw new Error(VERIFY_FAILED);
  }

  const body = new URLSearchParams({
    secret,
    response: trimmed,
  });

  if (ip && ip !== "unknown") {
    body.set("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(GENERIC_FAILURE);
  }

  const result = (await response.json()) as TurnstileVerifyResponse;
  if (result.success !== true) {
    throw new Error(VERIFY_FAILED);
  }
}
