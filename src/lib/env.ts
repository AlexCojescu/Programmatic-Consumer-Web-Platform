/**
 * Centralized, secure API key and env handling (OWASP: never log keys, use env vars, rotate keys).
 * All secrets are server-side only; never expose via NEXT_PUBLIC_ or in API responses.
 */

function getEnv(key: string): string | undefined {
  return process.env[key];
}

function requireEnv(key: string, friendlyName: string): string {
  const value = getEnv(key);
  if (value == null || value.trim() === "") {
    throw new Error(`${friendlyName} is not set. Add ${key} to your environment (e.g. .env.local).`);
  }
  return value.trim();
}

/** OpenAI API key (chat, embeddings, ingest). Rotate periodically; never commit to git. */
export function getOpenAIApiKey(): string {
  return requireEnv("OPENAI_API_KEY", "OPENAI_API_KEY");
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

/** Weather API key (api-tool). Optional if you don't use that route. */
export function getWeatherApiKey(): string | undefined {
  return getEnv("WEATHER_API_KEY")?.trim() || undefined;
}

/**
 * ImageKit config. Private key must NEVER be sent to the client or logged.
 * Only use this in server-side API routes.
 */
export function getImageKitConfig(): {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
} {
  return {
    publicKey: requireEnv("IMAGEKIT_PUBLIC_KEY", "IMAGEKIT_PUBLIC_KEY"),
    privateKey: requireEnv("IMAGEKIT_PRIVATE_KEY", "IMAGEKIT_PRIVATE_KEY"),
    urlEndpoint: requireEnv("IMAGEKIT_URL_ENDPOINT", "IMAGEKIT_URL_ENDPOINT"),
  };
}

/** Anthropic API key (e.g. web-search-tool). Optional. */
export function getAnthropicApiKey(): string | undefined {
  return getEnv("ANTHROPIC_API_KEY")?.trim() || undefined;
}
