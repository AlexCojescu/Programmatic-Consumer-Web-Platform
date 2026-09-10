"use client";

import React, { useEffect, useRef } from "react";
import { WreathBadge } from "@/components/ui/wreath-badge";

const WREATH_BADGES = [
  {
    title: "Systems Integration",
    subtitle: "Production‑grade workflows.",
    delayClass: "fade-in-delay-1",
    priority: true,
  },
  {
    title: "Client Experience",
    subtitle: "Friction‑light onboarding.",
    delayClass: "fade-in-delay-2",
  },
  {
    title: "Operational Reliability",
    subtitle: "Repeatable delivery.",
    delayClass: "fade-in-delay-3",
  },
];

const QuoteSection = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const items = bannerRef.current.querySelectorAll(".fade-in-up-soft");
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = bannerRef.current?.querySelectorAll(
              ".fade-in-up-soft"
            );
            items?.forEach((el) => el.classList.add("is-visible"));
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-6 sm:py-8 bg-gradient-to-br from-blue-50 to-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Header + subheader */}
        <div className="text-center space-y-2">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-blue-950">
            Where systems integration drives real outcomes
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-blue-900/90 leading-relaxed">
            We engineer the workflows behind onboarding, fulfillment, and support so your teams
            ship on time, your clients see faster value, and your operations stop relying on
            duct tape and heroics.
          </p>
        </div>

        {/* Wreath banner */}
        <div ref={bannerRef} className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-8">
            {WREATH_BADGES.map((badge) => (
              <WreathBadge
                key={badge.delayClass}
                title={badge.title}
                subtitle={badge.subtitle}
                delayClass={badge.delayClass}
                priority={badge.priority}
              />
            ))}
          </div>
        </div>

        {/* …rest of quote section unchanged… */}
      </div>
    </section>
  );
};

export default QuoteSection;
