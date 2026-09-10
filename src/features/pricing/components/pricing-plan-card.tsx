import React from 'react';

// Blue stroke checkmark icon used by the solution plan feature rows.
const CheckIcon = () => (
  <svg className="w-5 h-5 mr-2.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

export interface PricingPlanCardProps {
  title: string;
  description: string;
  /** Contents of the price block (label/price paragraphs, order varies). */
  priceBlock: React.ReactNode;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
}

/**
 * White shadowed plan card with title, description, price block, blue-check
 * feature list, and a full-width pill CTA anchored to the bottom.
 */
export const PricingPlanCard: React.FC<PricingPlanCardProps> = ({
  title,
  description,
  priceBlock,
  features,
  ctaHref,
  ctaLabel,
}) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col shadow-[0_4px_20px_0px_rgba(0,0,0,0.08)]">
      <div className="flex-grow">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {description}
        </p>
        <div className="mb-4 sm:mb-6">
          {priceBlock}
        </div>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm sm:text-base text-gray-700">
              <CheckIcon />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href={ctaHref}
        className="w-full bg-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base hover:bg-blue-700 transition-colors touch-manipulation"
      >
        {ctaLabel}
      </a>
    </div>
  );
};
