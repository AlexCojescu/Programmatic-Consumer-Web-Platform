"use client";

import React from "react";
import Link from "next/link";
import { PricingSectionBand } from "@/features/pricing/components/pricing-section-band";
import { PricingCenteredHeader } from "@/features/pricing/components/pricing-centered-header";
import { PricingEyebrow } from "@/features/pricing/components/pricing-eyebrow";
import { PartnerBenefit } from "@/features/pricing/components/partner-benefit";

const TOP_BENEFITS = [
  {
    title: "Earn while you optimize",
    paragraphs: [
      "Receive a recurring commission for every qualified business owner you introduce to Programmatic. A few referrals can cover a meaningful portion of your own 4‑month Milestone Path.",
    ],
  },
  {
    title: "Passive income at scale",
    paragraphs: [
      "For each ISP or operator you refer that moves forward, you earn ongoing monthly partner revenue. Over time, your partner income can offset your $10k–$12k investment and turn your system into a profit center.",
    ],
  },
  {
    title: "Built for real operators",
    paragraphs: [
      "ISPs talk to each other at trade shows, regional meetups, and in peer groups. Your private partner link makes it easy to share our work in those natural conversations, without feeling like a salesperson.",
    ],
  },
];

const TRACKING_BENEFIT = {
  title: "Seamless referral tracking",
  paragraphs: [
    "You’ll receive a dedicated partner page and tracking link where you can submit referrals and monitor their status automatically. No spreadsheets, no chasing updates.",
    "You’ll also get automatic text notifications as your referrals move through our pipeline—from audit booked to system build signed—so you always know what’s happening without needing to ask.",
  ],
};

const PartnerProgram: React.FC = () => {
  return (
    <PricingSectionBand id="partner-program">
      {/* Section header */}
      <PricingCenteredHeader
        eyebrow="Referral & partner program"
        title="For operators who want their system to pay them back."
      />

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10">
        {/* Card header */}
        <PricingEyebrow>Partner ecosystem</PricingEyebrow>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Turn your system into a revenue stream.
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
          We believe operational excellence should be rewarded. Once your operating backbone is
          live, you can join our Operator Referral Program to help other ISPs scale while
          generating recurring income that can offset—or even exceed—the cost of your own build.
        </p>

        {/* Top three columns */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {TOP_BENEFITS.map((benefit) => (
            <PartnerBenefit
              key={benefit.title}
              title={benefit.title}
              paragraphs={benefit.paragraphs}
            />
          ))}
        </div>

        {/* Bottom row: tracking + high-integrity card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] lg:items-start">
          <PartnerBenefit
            title={TRACKING_BENEFIT.title}
            paragraphs={TRACKING_BENEFIT.paragraphs}
          />

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 sm:p-6">
            <h4 className="text-sm font-semibold text-neutral-900 sm:text-base">
              High‑integrity, vetted only
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              This is not a get‑rich‑quick program. Just as we’re not doing “AI theatre,” we only
              invite vetted operators into the partner ecosystem—people whose word actually
              carries weight with their peers.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              The goal is simple: help more ISPs get out of chaos, while letting our best clients
              turn their operational backbone into a quiet, compounding revenue stream.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/contact?type=partner-program"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            Join the Partner Program
          </Link>
        </div>
      </div>
    </PricingSectionBand>
  );
};

export default PartnerProgram;
