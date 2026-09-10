"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BotDetection from "@/features/about/components/bot-detection";
import FadedGridBackground from "@/shared/ui/faded-grid-background";
import { AboutHeroColumns } from "@/features/about/components/about-hero-columns";

const AboutHeader: React.FC = () => {
  const router = useRouter();

  const handleServicesClick = () => {
    router.push("/services");
  };

  const handleLearnMoreClick = () => {
    router.push("/pricing");
  };

  return (
    <header className="relative overflow-hidden">
      <FadedGridBackground />
      <div
        className="
          relative z-10 max-w-7xl mx-auto 
          px-4 sm:px-6 lg:px-8
          pt-28 sm:pt-36 lg:pt-45
          pb-16 sm:pb-20 lg:pb-28
        "
      >
        {/* Main hero content */}
        <AboutHeroColumns
          media={<BotDetection />}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-tight">
            <span className="block">Turning Chaotic Data</span>
            <span className="block sm:whitespace-nowrap">
              into Hardwired Systems
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed sm:leading-relaxed">
            We're systems integrators for service businesses. We turn
            fragmented data and chaotic system tools into a high‑performance
            operating structure
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              onClick={handleServicesClick}
              className="bg-black px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white
                             transition hover:-translate-y-0.5 hover:bg-neutral-900
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                             focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              style={{
                borderRadius: "14px",
                boxShadow:
                  "0 26px 70px rgba(0,0,0,0.45), 0 8px 22px rgba(0,0,0,0.45)",
              }}
              type="button"
            >
              View System Outcomes
            </button>

            <button
              onClick={handleLearnMoreClick}
              className="bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-black border border-black/10
                             transition hover:-translate-y-0.5 hover:bg-neutral-50
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                             focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              style={{
                borderRadius: "14px",
                boxShadow: "0 8px 22px rgba(0,0,0,0.16)",
              }}
              type="button"
            >
              Our 4-Stage Methodology
            </button>
          </div>
        </AboutHeroColumns>
      </div>
    </header>
  );
};

export default AboutHeader;
