# Programmatic Consumer Web Platform

> **Repository title (GitHub):** `programmatic-consumer-web-platform`  
> **Short description:** Production Next.js consumer site for Programmatic—structured lead capture with automated routing, and dynamic media/content modules for high-intent ISP operators.

---

## Project Overview

This repository hosts **Programmatic’s primary consumer-facing web application**: a full-stack marketing and conversion platform built on the Next.js App Router. The site communicates systems-integration and operational-engineering services to fiber and wireless ISP operators, with:

1. **Contact & lead capture** — Multi-tier intake (lightweight contact, high-intent consultation, Calendly scheduling) with server-side validation, transactional email delivery, and structured payloads optimized for CRM ingestion and sales workflows.
2. **Interactive content portal** — Embedded BunnyCDN video, animated process modules, and service-specific landing experiences designed for creator-grade media and engagement.

The application is optimized for **Vercel-style serverless deployment**, with secrets confined to server routes.

**Production URL (metadata):** `https://www.programmatic-it.com`

---

## Core Capabilities

### Contact & Lead Capture

| Surface | Route / component | Behavior |
|--------|-------------------|----------|
| Consultation intake | `/contact`, homepage embed — `ContactFormMain` | Zod-validated fields: name, work email, company, job title, solution interest, operational challenge, existing systems (NMS/CRM/billing), project narrative. Submitted via React Hook Form → Next.js Server Action → **Resend** HTML email to operations inbox. |
| Lightweight contact | `ContactForm` (`contactme.tsx`) | First/last name, email, ops-context message; same Resend pipeline with distinct template. |
| Scheduling | `CalendlyWidget` | Embedded scheduling on homepage and contact page for direct calendar conversion. |

Lead data is structured at capture time (systems stack, challenge taxonomy, solution interest) so downstream **CRM workflows** receive actionable context without re-discovery calls.

**Server modules:** `src/lib/email.ts`, `src/lib/schemas.ts`, `src/lib/schemasmain.ts`, `src/lib/env.ts`

---

### Interactive Content Portal

| Integration | Implementation | Purpose |
|-------------|----------------|---------|
| **BunnyCDN** | `BunnyVideoPlayer` — iframe embed to `iframe.mediadelivery.net` | Portrait/landscape hero video, autoplay/mute/loop, configurable `videoLibraryId` / `videoId`, start offset via `t=` query param |
| **Dynamic modules** | `ProcessSection`, `Service-filter`, pricing sections, `BotDetection` | Interactive cards, metadata-tagged service pipelines, scroll-driven animations (Framer Motion / Motion) |
| **Analytics visuals** | `line-chart`, `Timeline`, `world-map` | Embedded data storytelling on homepage and service pages |

Content strategy and digital-architecture routes extend the portal pattern for campaign-specific experiences.

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS Modules, Framer Motion / Motion |
| **UI primitives** | Radix UI, Headless UI, shadcn-style contact components |
| **Forms** | React Hook Form + Zod resolvers |
| **Email** | Resend (transactional lead notifications) |
| **Scheduling** | react-calendly |
| **Media CDN** | BunnyCDN (video) |
| **Charts** | Recharts |
| **Security** | Zod form validation, env centralization (`src/lib/env.ts`) |

---

## Repository Structure

```
├── public/                     # Static assets, OG images
├── src/
│   ├── app/                    # App Router pages
│   │   ├── contact/            # Lead capture + Calendly
│   │   ├── pricing|services|about|...
│   ├── components/
│   │   ├── contactui/          # Form primitives
│   │   └── features/           # Marketing sections, Bunny player
│   └── lib/
│       ├── email.ts            # Resend server actions
│       └── env.ts              # Secret accessors
└── .env.example
```

---

## Local Development

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm**, **yarn**, or **pnpm**
- **Resend** credentials (contact forms)

### Installation

```bash
git clone <repository-url>
cd programmatic-consumer-web-platform   # or your local folder name
npm install
```

### Environment

```bash
cp .env.example .env.local
```

| Variable | Required | Scope |
|----------|----------|-------|
| `RESEND_API_KEY` | Yes (forms) | Server |
| `RESEND_FROM_EMAIL` | Yes | Server |
| `YOUR_EMAIL` | Yes (lead destination) | Server |

Never commit `.env.local`. Rotate keys if exposed.

### Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build (local smoke test)

```bash
npm run build
npm run start
```

---

## Production Deployment

### Recommended host

**Vercel** (or any Node-compatible platform supporting Next.js 16 with webpack bundling as configured).

### Environment variables

Configure the same keys as `.env.example` in the hosting provider’s **Production** and **Preview** environments. Mark all API keys as **server-only** (no `NEXT_PUBLIC_` prefix for secrets).

### Build settings

- **Install command:** `npm install` (or `yarn` / `pnpm` per lockfile)
- **Build command:** `npm run build`
- **Output:** Next.js default (`.next`)

### `next.config.ts` notes

- Webpack alias for `motion/react` resolution
- `experimental.optimizePackageImports` for lucide-react, motion, recharts, and Radix/Headless UI
- Bundle analyzer via `npm run analyze` (`@next/bundle-analyzer`)
- Global security headers (CSP, `X-Frame-Options`, `X-Content-Type-Options`, HSTS in production, etc.) via `src/lib/security-headers.ts`

### Security checklist

- [ ] All secrets in platform env vars, not in repo
- [ ] Resend domain verified for `RESEND_FROM_EMAIL`
- [x] Security headers and CSP configured in `next.config.ts`

---

## License & Ownership

Proprietary — Programmatic (AI Automation Agency). Internal use and authorized deployments only unless otherwise specified by the rights holder.

---

## Quick Reference

```bash
npm run dev      # Development server (webpack)
npm run build    # Production build
npm run start    # Serve production build
npm run analyze  # Production build + bundle size report
```
