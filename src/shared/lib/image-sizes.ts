/** Responsive `sizes` hints for next/image and <picture> — match rendered CSS dimensions. */
export const IMAGE_SIZES = {
  navbarLogo: "130px",
  scsTopImage: "(max-width: 768px) 70vw, 290px",
  wreath: "(max-width: 640px) 64px, (max-width: 768px) 112px, 140px",
  partnerPortrait: "(max-width: 768px) 256px, 384px",
  pricingLogo: "80px",
  calmHero: "(max-width: 768px) 100vw, 1200px",
  heroSlide: "100vw",
  beamIcon: "80px",
} as const;

/** Default encoder quality for next/image (AVIF/WebP generated at request time). */
export const IMAGE_QUALITY = 80;

export const HERO_SRCSET_WIDTHS = [800, 1280, 1920] as const;
