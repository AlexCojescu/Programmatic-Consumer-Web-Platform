"use client";

import React from "react";
import { PricingSectionBand } from "@/components/layouts/pricing-section-band";
import { PricingEyebrow } from "@/components/ui/pricing-eyebrow";
import {
  ServiceTierCard,
  type ServiceTier,
} from "@/components/ui/service-tier-card";

const tiers: ServiceTier[] = [
  {
    id: "foundation-build",
    label: "Core operating backbone",
    name: "The Foundation Build",
    bestFor: "ISPs at ~$50k MRR with 3–5 core tools.",
    focus:
      "Focus: Core onboarding, fulfillment, and support workflows wired into a single operating backbone.",
    investment: "Investment: Starting at $10,000",
    note: "Best when you need to get out of spreadsheets and into a documented, reliable system.",
    ctaLabel: "Discuss The Foundation Build",
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
    ctaLabel: "Discuss The Growth Engine",
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
    ctaLabel: "Discuss Enterprise Integration",
  },
];

const TieredArchitecture: React.FC = () => {
  return (
    <PricingSectionBand>
      {/* Section header */}
      <div className="mb-8 space-y-3">
        <PricingEyebrow>Tiered service architecture</PricingEyebrow>
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
          <ServiceTierCard key={tier.id} tier={tier} />
        ))}
      </div>
    </PricingSectionBand>
  );
};

export default TieredArchitecture;
