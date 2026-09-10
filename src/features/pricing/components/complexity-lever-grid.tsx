import React from "react";

export interface ComplexityLever {
  label: string;
  title: string;
  /** Opening paragraph (top margin). */
  intro: React.ReactNode;
  /** First bold-led comparison paragraph (top margin). */
  primary: React.ReactNode;
  /** Second bold-led comparison paragraph (no top margin). */
  secondary: React.ReactNode;
  /** Optional closing paragraph (top margin). */
  outro?: React.ReactNode;
}

interface ComplexityLeverGridProps {
  levers: ComplexityLever[];
}

/**
 * Dashed-bordered rounded container holding a four-up divided grid of
 * scoping lever columns.
 */
export const ComplexityLeverGrid: React.FC<ComplexityLeverGridProps> = ({
  levers,
}) => {
  return (
    <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl border border-dashed border-neutral-400/70">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y divide-dashed divide-neutral-400/60 md:divide-y-0 md:divide-x">
        {levers.map((lever) => (
          <div
            key={lever.title}
            className="flex h-full flex-col px-4 py-6 text-left sm:px-5 sm:py-7"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              {lever.label}
            </p>
            <h3 className="mt-2 text-sm font-semibold text-neutral-900 sm:text-base">
              {lever.title}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
              {lever.intro}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
              {lever.primary}
            </p>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
              {lever.secondary}
            </p>
            {lever.outro && (
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                {lever.outro}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
