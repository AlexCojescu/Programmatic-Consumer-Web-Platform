import React from "react";

interface CtaButtonProps {
  children: React.ReactNode;
}

/**
 * Dark pill call-to-action button with hover-lift shadow and trailing arrow.
 */
export const CtaButton: React.FC<CtaButtonProps> = ({ children }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.25)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.35)] hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      {children}
      <svg
        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );
};
