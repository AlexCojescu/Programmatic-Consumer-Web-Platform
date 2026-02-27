"use client";

import React from "react";
import Link from "next/link";

type Tier = {
  id: string;
  label: string;
  name: string;
  bestFor: string;
  focus: string;
  investment: string;
  note: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    id: "foundation-build",
    label: "Core operating backbone",
    name: "The Foundation Build",
    bestFor: "ISPs at ~$50k MRR with 3–5 core tools.",
    focus:
      "Focus: Core onboarding, fulfillment, and support workflows wired into a single operating backbone.",
    investment: "Investment: Starting at $10,000",
    note: "Best when you need to get out of spreadsheets and into a documented, reliable system.",
  },
  {
    id: "growth-engine",
    label: "Revenue OS & retention layer",
    name: "The Growth Engine",
    bestFor: "Rapidly scaling ISPs with complex regional data.",
    focus:
      "Focus: Full Revenue OS across intake, sales, onboarding, retention, and stuck‑ticket prevention.",
    investment: "Investment: Starting at $15,000+",
    note: "Includes automated churn prediction and cross‑sell automation so you keep more of the base you’ve already paid to acquire.",
    highlight: true,
  },
  {
    id: "enterprise-integration",
    label: "Custom middleware & compliance",
    name: "Enterprise Integration",
    bestFor: "Multi‑region ISPs with 10+ legacy tools/NMS.",
    focus:
      "Focus: Custom API/middleware, data normalisation, and compliance‑friendly observability.",
    investment: "Investment: Custom quote",
    note: "Best when your legacy stack and regional complexity require bespoke integration and governance.",
  },
];

const TieredArchitecture: React.FC = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Section header */}
        <div className="mb-8 space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Tiered service architecture
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Three ways we build your accelerated system
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
            Different ISPs carry different technical weight. We scope your build around your tool
            stack, data velocity, legacy debt, and team structure—then match you to the right tier.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={[
                "group relative flex h-full flex-col rounded-3xl border bg-white p-6 sm:p-7",
                "transition-all duration-200 ease-out",
                "hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(15,23,42,0.20)]",
                "focus-within:-translate-y-1 focus-within:shadow-[0_26px_90px_rgba(15,23,42,0.20)]",
                tier.highlight
                  ? "border-neutral-900 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
                  : "border-neutral-200 shadow-[0_18px_60px_rgba(15,23,42,0.08)] hover:border-neutral-300 focus-within:border-neutral-300",
              ].join(" ")}
            >
              {tier.highlight && (
                <div className="absolute -top-3 right-6 rounded-full bg-neutral-900 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                  Most Popular
                </div>
              )}

              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {tier.label}
              </p>

              <h3 className="mt-3 text-xl font-semibold text-neutral-900 sm:text-[1.4rem]">
                {tier.name}
              </h3>

              <p className="mt-3 text-sm font-medium text-neutral-800 sm:text-[0.95rem]">
                {tier.bestFor}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
                {tier.focus}
              </p>

              <p className="mt-5 text-sm font-semibold text-neutral-900 sm:text-[0.95rem]">
                {tier.investment}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
                {tier.note}
              </p>

              <div className="mt-6 pt-2">
                <Link
                  href={`/contact?type=${tier.id}`}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                    tier.highlight
                      ? "bg-neutral-900 text-white hover:bg-black group-hover:shadow-[0_18px_50px_rgba(15,23,42,0.35)]"
                      : "bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {tier.id === "foundation-build" && "Discuss The Foundation Build"}
                  {tier.id === "growth-engine" && "Discuss The Growth Engine"}
                  {tier.id === "enterprise-integration" && "Discuss Enterprise Integration"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TieredArchitecture;
