import "server-only";

import { headers } from "next/headers";

const PRODUCTION_ORIGINS = [
  "https://www.programmatic-it.com",
  "https://programmatic-it.com",
] as const;

export function getAllowedOrigins(): string[] {
  const origins = new Set<string>(PRODUCTION_ORIGINS);

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    origins.add(`https://${vercelUrl}`);
  }

  return [...origins];
}

export async function assertSameOrigin(): Promise<void> {
  const headerList = await headers();
  const origin = headerList.get("origin");
  if (!origin || !getAllowedOrigins().includes(origin)) {
    throw new Error("Forbidden.");
  }
}
