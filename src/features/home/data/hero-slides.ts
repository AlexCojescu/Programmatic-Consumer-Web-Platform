import { HERO_SRCSET_WIDTHS, IMAGE_SIZES } from "@/shared/lib/image-sizes";

export type HeroSlideContent = {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type HeroSlideBase = {
  id: string;
  content: HeroSlideContent;
};

export type HeroPictureSources = {
  assetId: string;
  width: number;
  height: number;
  sizes: string;
};

export type HeroImageSlide = HeroSlideBase & {
  type: "image";
  alt: string;
  picture: HeroPictureSources;
  priority?: boolean;
};

export type HeroVideoSlide = HeroSlideBase & {
  type: "video";
  /** Still-frame asset id in /public/hero/{id}-{width}.{avif,webp} */
  poster: HeroPictureSources;
  alt: string;
  mp4: string;
  priority?: boolean;
};

export type HeroSlide = HeroImageSlide | HeroVideoSlide;

/**
 * Bump this number whenever you replace a file in /public/hero/ with the same
 * filename — forces browsers to fetch the new asset instead of a cached copy.
 */
export const HERO_MEDIA_REVISION = 2;

export function heroAssetUrl(path: string): string {
  return `${path}?v=${HERO_MEDIA_REVISION}`;
}

export function heroSrcSet(assetId: string, format: "avif" | "webp"): string {
  return HERO_SRCSET_WIDTHS.map(
    (width) => `${heroAssetUrl(`/hero/${assetId}-${width}.${format}`)} ${width}w`
  ).join(", ");
}

export function heroFallbackUrl(assetId: string): string {
  return heroAssetUrl(`/hero/${assetId}-fallback.jpg`);
}

const DEFAULT_CTAS = {
  primaryCta: { label: "Get a systems assessment", href: "/contact" },
  secondaryCta: { label: "About", href: "/about" },
} as const;

const HERO_IMAGE_FRAME: Omit<HeroPictureSources, "assetId"> = {
  width: 1920,
  height: 1280,
  sizes: IMAGE_SIZES.heroSlide,
};

/** Media files live in /public/hero/ */
export const HERO_SLIDES: HeroSlide[] = [
  {
    type: "video",
    id: "slide-1",
    poster: {
      assetId: "slide-1-poster",
      width: 1920,
      height: 1080,
      sizes: IMAGE_SIZES.heroSlide,
    },
    mp4: "/hero/slide-1.mp4",
    alt: "Product demo — connected revenue and fulfillment workflows",
    priority: true,
    content: {
      title: "Production-Grade Systems Integration",
      description:
        "Engineering the workflows behind your intake, sales, onboarding, and support. We replace manual patchwork with a production‑grade system built to handle pressure and consistently run at scale.",
      ...DEFAULT_CTAS,
    },
  },
  {
    type: "image",
    id: "slide-2",
    picture: { assetId: "slide-2", ...HERO_IMAGE_FRAME },
    alt: "Workflow automation across intake and onboarding",
    content: {
      title: "Workflow Automation That Scales",
      description:
        "Connect intake, sales, and onboarding into one orchestrated flow — fewer manual handoffs, less dropoff, and teams that always know what happens next.",
      ...DEFAULT_CTAS,
    },
  },
  {
    type: "image",
    id: "slide-3",
    picture: { assetId: "slide-3", ...HERO_IMAGE_FRAME },
    alt: "Operational systems integration overview",
    content: {
      title: "Operational Systems Integration",
      description:
        "Unify the tools behind your revenue and fulfillment into a single operating view — so leaders spot bottlenecks early and teams act on the same truth.",
      ...DEFAULT_CTAS,
    },
  },
  {
    type: "image",
    id: "slide-4",
    picture: { assetId: "slide-4", ...HERO_IMAGE_FRAME },
    alt: "Scalable infrastructure for service businesses",
    content: {
      title: "Built for Pressure at Scale",
      description:
        "Replace duct-tape processes with infrastructure designed for high volume — reliable under load, predictable for clients, and ready when your operation grows.",
      ...DEFAULT_CTAS,
    },
  },
];

export const HERO_AUTOPLAY_DELAY_MS = 6000;

/** Autoplay stays paused this long after the user navigates manually */
export const HERO_AUTOPLAY_PAUSE_AFTER_INTERACTION_MS = 3000;
