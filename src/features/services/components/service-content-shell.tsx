import React from "react";

interface ServiceContentShellProps {
  children: React.ReactNode;
}

/**
 * Outer section frame for service-page content blocks: relative section with
 * the max-width padded, vertically-spaced content container.
 */
export const ServiceContentShell: React.FC<ServiceContentShellProps> = ({
  children,
}) => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24 space-y-8 sm:space-y-10">
        {children}
      </div>
    </section>
  );
};
