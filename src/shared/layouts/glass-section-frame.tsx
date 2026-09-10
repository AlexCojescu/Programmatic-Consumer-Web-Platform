import React from "react";

interface GlassSectionFrameProps {
  children: React.ReactNode;
}

/**
 * Shared frame for the themed pricing sections: relative py-20 wrapper,
 * subtle transparent grid texture, and centered max-w-6xl container.
 */
export const GlassSectionFrame: React.FC<GlassSectionFrameProps> = ({
  children,
}) => {
  return (
    <div className="relative py-20">
      {/* Subtle background pattern - made transparent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative container mx-auto px-6 max-w-6xl">
        {children}
      </div>
    </div>
  );
};
