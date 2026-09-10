import React from "react";

interface GlassPricingFrameProps {
  children: React.ReactNode;
}

/**
 * Outer frame for the glassmorphism pricing sections: relative wrapper with
 * the subtle transparent grid background pattern and the centered container.
 */
export const GlassPricingFrame: React.FC<GlassPricingFrameProps> = ({
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
