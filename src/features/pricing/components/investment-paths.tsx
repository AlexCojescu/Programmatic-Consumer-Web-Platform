"use client";

import React from "react";
import { PricingSectionBand } from "@/components/layouts/pricing-section-band";
import { PricingCenteredHeader } from "@/components/ui/pricing-centered-header";
import {
  InvestmentPathCard,
  type InvestmentPathCardProps,
} from "@/components/ui/investment-path-card";

const PATHS: InvestmentPathCardProps[] = [
  {
    containerClassName: [
      "group relative flex h-full flex-col rounded-3xl border border-neutral-900 bg-white p-6 sm:p-8",
      "shadow-[0_26px_80px_rgba(15,23,42,0.25)]",
      "transition-all duration-200 ease-out",
      "hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.30)]",
      "focus-within:-translate-y-1 focus-within:shadow-[0_28px_90px_rgba(15,23,42,0.30)]",
    ].join(" "),
    badge: "Best value",
    eyebrow: "Option A · Accelerated Path",
    price: "$10,000 upfront",
    description: "Best for high‑growth operators who need the backbone built yesterday.",
    bullets: [
      "• Full 4‑Stage Build (Discover, Design, Build, Handoff).",
      "• Priority scheduling in our implementation queue.",
      "• Single‑payment discount — total savings: $2,000.",
    ],
    ctaHref: "/contact?type=accelerated-path",
    ctaLabel: "Choose the Accelerated Path",
    ctaClassName:
      "inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-[0_18px_55px_rgba(15,23,42,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
  },
  {
    containerClassName: [
      "group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8",
      "shadow-[0_20px_70px_rgba(15,23,42,0.12)]",
      "transition-all duration-200 ease-out",
      "hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.18)]",
      "focus-within:-translate-y-1 focus-within:border-neutral-300 focus-within:shadow-[0_24px_80px_rgba(15,23,42,0.18)]",
    ].join(" "),
    eyebrow: "Option B · Milestone Path",
    price: "$12,000 total · $3,000/mo × 4",
    description:
      "Best for operators who want to align the build with a 120‑day transformation window.",
    bullets: [
      "• $3,000/month over 4 months.",
      "• Payments tied to stage deliverables, not hours.",
      "• Same high‑touch integration, spread across your fiscal quarter.",
    ],
    ctaHref: "/contact?type=milestone-path",
    ctaLabel: "Choose the Milestone Path",
    ctaClassName:
      "inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-[0_16px_45px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
  },
];

const InvestmentPaths: React.FC = () => {
  return (
    <PricingSectionBand>
      {/* Section header */}
      <PricingCenteredHeader
        eyebrow="Transparent investment paths"
        title="Two ways to fund your operating build."
        description="Most ISP partners choose one of two paths, depending on how fast they want the system live and how they prefer to manage cash flow."
      />

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {PATHS.map((path) => (
          <InvestmentPathCard key={path.eyebrow} {...path} />
        ))}
      </div>
    </PricingSectionBand>
  );
};

export default InvestmentPaths;
