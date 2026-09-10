import React from "react";

interface SplitColumnsProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

/**
 * Two-column layout with a thin vertical rule between the columns on large
 * screens. Columns stack on smaller viewports.
 */
export const SplitColumns: React.FC<SplitColumnsProps> = ({ left, right }) => {
  return (
    <div className="mb-16 sm:mb-20 grid lg:grid-cols-[1fr_2px_1fr] gap-8 lg:gap-12 items-start">
      {left}
      <div className="hidden lg:block w-px bg-slate-200 self-stretch" />
      {right}
    </div>
  );
};
