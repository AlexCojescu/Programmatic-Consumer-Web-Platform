"use client";

import HeroMediaCarousel from "./HeroMediaCarousel";

export default function HeroSection() {
  return (
    <div className="sticky top-0 h-[100dvh] w-full relative overflow-hidden bg-neutral-950">
      <HeroMediaCarousel />
    </div>
  );
}
