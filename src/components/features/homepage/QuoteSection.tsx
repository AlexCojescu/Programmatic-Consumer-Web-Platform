"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

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
            {/* Badge 1 */}
            <div className="flex items-center gap-1.5 sm:gap-3 fade-in-up-soft fade-in-delay-1">
              <div className="h-16 sm:h-28 md:h-32 w-auto">
                <Image
                  src="/wreath left.png"
                  alt="Left wreath"
                  width={140}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm sm:text-lg md:text-xl font-semibold text-blue-950 tracking-tight">
                  Systems Integration
                </p>
                <p className="text-[0.65rem] sm:text-sm md:text-base text-blue-900/90">
                  Production‑grade workflows.
                </p>
              </div>
              <div className="h-16 sm:h-28 md:h-32 w-auto">
                <Image
                  src="/wreath right.png"
                  alt="Right wreath"
                  width={140}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-1.5 sm:gap-3 fade-in-up-soft fade-in-delay-2">
              <div className="h-16 sm:h-28 md:h-32 w-auto">
                <Image
                  src="/wreath left.png"
                  alt="Left wreath"
                  width={140}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm sm:text-lg md:text-xl font-semibold text-blue-950 tracking-tight">
                  Client Experience
                </p>
                <p className="text-[0.65rem] sm:text-sm md:text-base text-blue-900/90">
                  Friction‑light onboarding.
                </p>
              </div>
              <div className="h-16 sm:h-28 md:h-32 w-auto">
                <Image
                  src="/wreath right.png"
                  alt="Right wreath"
                  width={140}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-1.5 sm:gap-3 fade-in-up-soft fade-in-delay-3">
              <div className="h-16 sm:h-28 md:h-32 w-auto">
                <Image
                  src="/wreath left.png"
                  alt="Left wreath"
                  width={140}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm sm:text-lg md:text-xl font-semibold text-blue-950 tracking-tight">
                  Operational Reliability
                </p>
                <p className="text-[0.65rem] sm:text-sm md:text-base text-blue-900/90">
                  Repeatable delivery.
                </p>
              </div>
              <div className="h-16 sm:h-28 md:h-32 w-auto">
                <Image
                  src="/wreath right.png"
                  alt="Right wreath"
                  width={140}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* …rest of quote section unchanged… */}
      </div>
    </section>
  );
};

export default QuoteSection;
