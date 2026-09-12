/**
 * Security headers for all public responses.
 * Static headers are applied via next.config.ts `headers()`.
 * CSP is applied in middleware with a per-request nonce.
 */

const isDev = process.env.NODE_ENV === "development";

/**
 * Build a nonce-based Content-Security-Policy.
 * Script `'unsafe-inline'` is omitted; `'unsafe-eval'` is development-only (webpack HMR).
 */
export function buildContentSecurityPolicy(nonce: string): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "object-src": ["'none'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "https://assets.calendly.com",
      "https://challenges.cloudflare.com",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://assets.calendly.com",
    ],
    "font-src": [
      "'self'",
      "https://fonts.gstatic.com",
      "https://assets.calendly.com",
      "data:",
    ],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://assets.calendly.com",
      "https://calendly.com",
    ],
    "media-src": ["'self'"],
    "connect-src": [
      "'self'",
      "https://calendly.com",
      "https://assets.calendly.com",
      "https://challenges.cloudflare.com",
    ],
    "frame-src": ["https://calendly.com", "https://challenges.cloudflare.com"],
    "worker-src": ["'self'", "blob:"],
  };

  if (!isDev) {
    directives["upgrade-insecure-requests"] = [];
  }

  return Object.entries(directives)
    .map(([name, values]) =>
      values.length === 0 ? name : `${name} ${values.join(" ")}`
    )
    .join("; ");
}

/** Non-CSP headers. CSP is set per-request in middleware so it can include a nonce. */
export function getSecurityHeaders(): { key: string; value: string }[] {
  const headers: { key: string; value: string }[] = [
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin-allow-popups",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-origin",
    },
  ];

  if (!isDev) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
