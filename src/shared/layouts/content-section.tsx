import React from "react";

interface ContentSectionProps {
  id?: string;
  children: React.ReactNode;
}

/**
 * Full-width section with the shared centered max-w-6xl padded container
 * used by the ISP pricing sections.
 */
export const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  children,
}) => {
  return (
    <section id={id} className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {children}
      </div>
    </section>
  );
};
