import React from "react";

interface GreenCheckListProps {
  features: string[];
  /** List wrapper classes; defaults to the stacked "space-y-4" layout. */
  className?: string;
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

/**
 * Feature list where each row leads with a green checkmark icon.
 */
export const GreenCheckList: React.FC<GreenCheckListProps> = ({
  features,
  className = "space-y-4",
}) => {
  return (
    <div className={className}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <CheckIcon />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>
  );
};
