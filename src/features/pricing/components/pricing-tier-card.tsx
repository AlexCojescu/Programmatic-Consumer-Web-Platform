import React from "react";
import { PricingFeatureList } from "@/components/ui/pricing-feature-list";

const STANDARD_CONTAINER_CLASS =
  "bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300";

const POPULAR_CONTAINER_CLASS =
  "bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:bg-white/25 transition-all duration-300 transform scale-105";

export interface PricingTierCardProps {
  name: string;
  description: string;
  price: React.ReactNode;
  priceNote: string;
  /** Full verbatim class string for the price element (accent color varies). */
  priceClassName: string;
  features: string[];
  /**
   * Full verbatim class string for the "Most Popular" badge. When provided,
   * the card renders the highlighted (scaled) popular variant.
   */
  popularBadgeClassName?: string;
}

/**
 * Glass pricing tier card: centered name/description/price header followed
 * by a checked feature list. Renders the scaled "Most Popular" variant when
 * a badge class is provided.
 */
export const PricingTierCard: React.FC<PricingTierCardProps> = ({
  name,
  description,
  price,
  priceNote,
  priceClassName,
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
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className={priceClassName}>{price}</div>
        <p className="text-sm text-gray-500">{priceNote}</p>
      </div>

      <PricingFeatureList features={features} />
    </div>
  );
};
