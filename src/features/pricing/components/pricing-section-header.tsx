import React from "react";

interface PricingSectionHeaderProps {
  /** Full verbatim class string for the pill badge container. */
  badgeClassName: string;
  /** Full verbatim class string for the pulsing dot inside the badge. */
  dotClassName: string;
  badgeLabel: string;
  /** Plain heading text rendered before the gradient span. */
  headingPrefix: string;
  /** Full verbatim class string for the gradient heading span. */
  gradientClassName: string;
  gradientText: string;
  description: string;
}

/**
 * Centered header for the glass pricing sections: pill badge with pulsing
 * dot, large heading with a gradient-highlighted span, and a subheading.
 */
export const PricingSectionHeader: React.FC<PricingSectionHeaderProps> = ({
  badgeClassName,
  dotClassName,
  badgeLabel,
  headingPrefix,
  gradientClassName,
  gradientText,
  description,
}) => {
  return (
    <div className="text-center mb-16">
      <div className={badgeClassName}>
        <div className={dotClassName} />
        {badgeLabel}
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
        {headingPrefix}{' '}
        <span className={gradientClassName}>
          {gradientText}
        </span>
      </h2>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};
