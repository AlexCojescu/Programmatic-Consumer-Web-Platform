import React from "react";

interface EyebrowProps {
  /** Text color class; defaults to the neutral variant. */
  colorClassName?: string;
  children: React.ReactNode;
}

/**
 * Small uppercase kicker line used above section headings.
 */
export const Eyebrow: React.FC<EyebrowProps> = ({
  colorClassName = "text-neutral-500",
  children,
}) => {
  return (
    <p
      className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${colorClassName}`}
    >
      {children}
    </p>
  );
};
