import React from "react";

interface ServiceMetricColumnProps {
  title: string;
  items: string[];
}

/**
 * Uppercase-titled column listing the operational metrics we improve.
 */
export const ServiceMetricColumn: React.FC<ServiceMetricColumnProps> = ({
  title,
  items,
}) => {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide">
        {title}
      </h4>
      <ul className="space-y-1.5 sm:space-y-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
