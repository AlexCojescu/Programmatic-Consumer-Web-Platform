"use client";

import { Highlighter } from "@/components/magicui/Highlighter";
import React from "react";

const PricingOneLinerHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="
          relative z-10 mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-8
          pt-28 sm:pt-32 lg:pt-32
          pb-16 lg:pb-20
        "
      >
        <div className="flex flex-col items-center text-center">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Pricing overview
          </p>

          {/* Give heading wider max-w than paragraph */}
          <h1 className="mt-5 w-full max-w-6xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            An{" "}
            <Highlighter
              action="underline"
              color="#0f172a"
              strokeWidth={2.2}
              animationDuration={700}
              padding={2}
              isView
            >
              investment
            </Highlighter>{" "}
            that{" "}
            <Highlighter
              action="highlight"
              color="#fef08a"
              strokeWidth={2}
              animationDuration={700}
              padding={6}
              isView
            >
              pays for itself
            </Highlighter>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-xl">
            Your investment is tied to the operational lift we create, not generic
            automation checklists. For serious operators, this isn’t an expense; it’s a system built to
            pay for itself through recovered margin and scalable execution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingOneLinerHero;
