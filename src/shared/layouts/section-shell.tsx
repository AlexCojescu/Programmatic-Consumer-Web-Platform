import React from "react";

interface SectionShellProps {
  /** Optional absolutely-positioned background layer (e.g. grid texture). */
  background?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Outer section frame: relative wrapper with an optional background slot
 * and the max-width padded content container.
 */
export const SectionShell: React.FC<SectionShellProps> = ({
  background,
  children,
}) => {
  return (
    <section className="relative">
      {background}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-20 lg:py-28">
        {children}
      </div>
    </section>
  );
};
