import React from "react";

interface PopularPillProps {
  /** Pill background class (e.g. "bg-green-100/50"). */
  bgClassName: string;
  /** Pill text color class (e.g. "text-green-800"). */
  textClassName: string;
  children: React.ReactNode;
}

/**
 * Small rounded "Most Popular" pill rendered above featured plan titles.
 */
export const PopularPill: React.FC<PopularPillProps> = ({
  bgClassName,
  textClassName,
  children,
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-full ${bgClassName} px-3 py-1 text-xs font-semibold ${textClassName} mb-4`}
    >
      {children}
    </div>
  );
};
