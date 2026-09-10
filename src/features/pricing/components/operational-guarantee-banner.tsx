import React from "react";

interface OperationalGuaranteeBannerProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

/**
 * Emerald guarantee callout: eyebrow label above a soft-shadowed rounded
 * banner with a title and body copy.
 */
export const OperationalGuaranteeBanner: React.FC<
  OperationalGuaranteeBannerProps
> = ({ eyebrow, title, children }) => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>

      <div className="mt-3 w-full max-w-3xl rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 text-center shadow-[0_16px_50px_rgba(16,185,129,0.25)] sm:p-7">
        <h3 className="text-base font-semibold text-emerald-900 sm:text-lg">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-emerald-900/90 sm:text-[0.95rem]">
          {children}
        </p>
      </div>
    </div>
  );
};
