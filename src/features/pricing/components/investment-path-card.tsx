import React from "react";
import Link from "next/link";

export interface InvestmentPathCardProps {
  /** Full verbatim class string for the card container. */
  containerClassName: string;
  /** Optional floating badge label rendered above the card's top edge. */
  badge?: string;
  eyebrow: string;
  price: string;
  description: string;
  /** Bullet strings, including their leading bullet glyph. */
  bullets: string[];
  ctaHref: string;
  ctaLabel: string;
  /** Full verbatim class string for the CTA link. */
  ctaClassName: string;
}

/**
 * Investment path option card: optional floating badge, eyebrow, price,
 * description, bullet list, and a full-width CTA link.
 */
export const InvestmentPathCard: React.FC<InvestmentPathCardProps> = ({
  containerClassName,
  badge,
  eyebrow,
  price,
  description,
  bullets,
  ctaHref,
  ctaLabel,
  ctaClassName,
}) => {
  return (
    <div className={containerClassName}>
      {badge && (
        <div className="absolute -top-4 left-8">
          <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
            {badge}
          </span>
        </div>
      )}

      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {eyebrow}
      </p>

      <p className="mt-4 text-2xl font-semibold text-neutral-900 sm:text-[1.7rem]">
        {price}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
        {description}
      </p>

      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
        {bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>

      <div className="mt-6 pt-2">
        <Link href={ctaHref} className={ctaClassName}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
};
