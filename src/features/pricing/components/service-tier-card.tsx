import React from "react";
import Link from "next/link";

export interface ServiceTier {
  id: string;
  label: string;
  name: string;
  bestFor: string;
  focus: string;
  investment: string;
  note: string;
  ctaLabel: string;
  highlight?: boolean;
}

interface ServiceTierCardProps {
  tier: ServiceTier;
}

/**
 * Tiered service architecture card with hover-lift, optional "Most Popular"
 * highlight treatment, and a contact CTA derived from the tier id.
 */
export const ServiceTierCard: React.FC<ServiceTierCardProps> = ({ tier }) => {
  return (
    <div
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
          {tier.ctaLabel}
        </Link>
      </div>
    </div>
  );
};
