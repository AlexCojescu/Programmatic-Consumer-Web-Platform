import React from "react";

interface PricingEyebrowProps {
  children: React.ReactNode;
}

/**
 * Small uppercase tracked eyebrow label used across the neutral-styled
 * pricing sections.
 */
export const PricingEyebrow: React.FC<PricingEyebrowProps> = ({ children }) => {
  return (
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
      {children}
    </p>
  );
};
