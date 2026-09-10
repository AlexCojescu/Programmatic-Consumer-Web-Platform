import React from "react";

interface PartnerBenefitProps {
  title: string;
  paragraphs: string[];
}

/**
 * Titled copy block for the partner program: small heading followed by one
 * or more supporting paragraphs.
 */
export const PartnerBenefit: React.FC<PartnerBenefitProps> = ({
  title,
  paragraphs,
}) => {
  return (
    <div>
      <h4 className="text-sm font-semibold text-neutral-900 sm:text-base">
        {title}
      </h4>
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};
