/**
 * Security headers for all public responses.
 * Applied via next.config.ts `headers()`.
 */

const isDev = process.env.NODE_ENV === "development";

function buildContentSecurityPolicy(): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "object-src": ["'none'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      "https://assets.calendly.com",
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
    ],
    "frame-src": ["https://calendly.com"],
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

export function getSecurityHeaders(): { key: string; value: string }[] {
  const headers: { key: string; value: string }[] = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(),
    },
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
      value: "off",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin-allow-popups",
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
