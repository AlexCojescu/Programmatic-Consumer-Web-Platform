import React from "react";

interface GlassCardProps {
  /** Renders the highlighted "Most Popular" variant (stronger glass + scale). */
  featured?: boolean;
  children: React.ReactNode;
}

const STANDARD_CLASSES =
  "bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300";

const FEATURED_CLASSES =
  "bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:bg-white/25 transition-all duration-300 transform scale-105";

/**
 * Frosted-glass pricing card shell used across the themed pricing sections.
 */
export const GlassCard: React.FC<GlassCardProps> = ({ featured, children }) => {
  return (
    <div className={featured ? FEATURED_CLASSES : STANDARD_CLASSES}>
      {children}
    </div>
  );
};
