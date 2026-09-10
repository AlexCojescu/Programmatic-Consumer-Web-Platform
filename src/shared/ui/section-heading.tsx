import React from "react";

interface SectionHeadingProps {
  title: string;
}

/**
 * Section header row with the shared responsive baseline-aligned wrapper.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-2xl font-semibold text-slate-900">
        {title}
      </h3>
    </div>
  );
};
