import React from "react";

interface SectionIntroProps {
  /** Small uppercase label rendered above the heading. */
  eyebrow: string;
  /** Large heading content. */
  children: React.ReactNode;
}

/**
 * Left-ruled intro block with an uppercase eyebrow and a large heading.
 */
export const SectionIntro: React.FC<SectionIntroProps> = ({
  eyebrow,
  children,
}) => {
  return (
    <div className="border-l-2 border-slate-900 pl-4 sm:pl-6 mb-12 sm:mb-20">
      <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-2 sm:mb-3">
        {eyebrow}
      </p>
      <h2 className="text-lg sm:text-3xl lg:text-4xl font-semibold text-slate-900 leading-relaxed sm:leading-snug max-w-5xl">
        {children}
      </h2>
    </div>
  );
};
