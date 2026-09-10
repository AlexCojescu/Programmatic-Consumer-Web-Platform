import React from "react";

interface PricingPlanHeaderProps {
  /** Optional pill (e.g. "Most Popular") rendered above the title. */
  pill?: React.ReactNode;
  title: string;
  /** Heading tag; the retainer cards use h4, plan cards use h3. */
  titleAs?: "h3" | "h4";
  description?: string;
  /** Price content; may include a nested span for the "/mo" suffix. */
  price: React.ReactNode;
  /** Price text color class (e.g. "text-green-600"). */
  priceColorClassName: string;
  note?: string;
}

/**
 * Centered plan-card header: optional pill, title, description, price, note.
 */
export const PricingPlanHeader: React.FC<PricingPlanHeaderProps> = ({
  pill,
  title,
  titleAs: TitleTag = "h3",
  description,
  price,
  priceColorClassName,
  note,
}) => {
  return (
    <div className="text-center mb-8">
      {pill}
      <TitleTag className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </TitleTag>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      <div className={`text-4xl font-bold ${priceColorClassName} mb-2`}>
        {price}
      </div>
      {note && <p className="text-sm text-gray-500">{note}</p>}
    </div>
  );
};
