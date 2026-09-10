import React from "react";
import { PricingCheckIcon } from "@/features/pricing/components/pricing-check-icon";

interface PricingFeatureItemProps {
  feature: string;
}

/**
 * Single feature row: green check icon followed by the feature text.
 */
export const PricingFeatureItem: React.FC<PricingFeatureItemProps> = ({
  feature,
}) => (
  <div className="flex items-start gap-3">
    <PricingCheckIcon />
    <span className="text-gray-700">{feature}</span>
  </div>
);

interface PricingFeatureListProps {
  features: string[];
}

/**
 * Vertically spaced list of feature rows used inside pricing tier cards.
 */
export const PricingFeatureList: React.FC<PricingFeatureListProps> = ({
  features,
}) => (
  <div className="space-y-4">
    {features.map((feature, index) => (
      <PricingFeatureItem key={index} feature={feature} />
    ))}
  </div>
);
