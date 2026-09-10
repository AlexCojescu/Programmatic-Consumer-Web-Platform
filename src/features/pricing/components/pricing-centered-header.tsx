import React from "react";

interface PricingCenteredHeaderProps {
  eyebrow: string;
  title: string;
  /** Optional supporting paragraph rendered under the title. */
  description?: string;
}

/**
 * Centered section header for the neutral-styled pricing sections: eyebrow,
 * title, and an optional supporting paragraph.
 */
export const PricingCenteredHeader: React.FC<PricingCenteredHeaderProps> = ({
  eyebrow,
  title,
  description,
}) => {
  return (
    <div className="mb-8 mx-auto max-w-3xl text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
          {description}
        </p>
      )}
    </div>
  );
};
