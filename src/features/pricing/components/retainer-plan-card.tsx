import React from "react";
import { PricingFeatureList } from "@/components/ui/pricing-feature-list";

const STANDARD_CONTAINER_CLASS =
  "bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300";

const POPULAR_CONTAINER_CLASS =
  "bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:bg-white/25 transition-all duration-300 transform scale-105";

export interface RetainerPlanCardProps {
  name: string;
  price: React.ReactNode;
  features: string[];
  /**
   * Full verbatim class string for the "Most Popular" badge. When provided,
   * the card renders the highlighted (scaled) popular variant.
   */
  popularBadgeClassName?: string;
}

/**
 * Monthly retainer card for the web development pricing section: centered
 * name and price (no description) followed by a checked feature list.
 */
export const RetainerPlanCard: React.FC<RetainerPlanCardProps> = ({
  name,
  price,
  features,
  popularBadgeClassName,
}) => {
  return (
    <div
      className={
        popularBadgeClassName ? POPULAR_CONTAINER_CLASS : STANDARD_CONTAINER_CLASS
      }
    >
      <div className="text-center mb-8">
        {popularBadgeClassName && (
          <div className={popularBadgeClassName}>
            Most Popular
          </div>
        )}
        <h4 className="text-2xl font-bold text-gray-900 mb-4">{name}</h4>
        <div className="text-4xl font-bold text-blue-600 mb-2">{price}</div>
      </div>

      <PricingFeatureList features={features} />
    </div>
  );
};
