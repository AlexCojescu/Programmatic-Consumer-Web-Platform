import React from "react";

interface PricingSectionBandProps {
  /** Optional anchor id applied to the section element. */
  id?: string;
  children: React.ReactNode;
}

/**
 * Full-width section band with the shared max-width padded container used by
 * the neutral-styled pricing sections.
 */
export const PricingSectionBand: React.FC<PricingSectionBandProps> = ({
  id,
  children,
}) => {
  return (
    <section id={id} className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {children}
      </div>
    </section>
  );
};
