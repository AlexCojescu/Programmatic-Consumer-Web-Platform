import React from "react";

interface CheckListProps {
  items: string[];
}

/**
 * Bordered, row-divided list where each row leads with a black check circle.
 */
export const CheckList: React.FC<CheckListProps> = ({ items }) => {
  return (
    <div className="space-y-0 divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 bg-slate-50/50"
        >
          <span className="mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center">
            <svg
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path
                d="M10 3L5 8.5 2 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[13px] sm:text-[15px] text-slate-700">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};
