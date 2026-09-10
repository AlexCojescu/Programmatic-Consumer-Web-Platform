import React from "react";

/**
 * Absolute-positioned subtle 48px grid texture overlay.
 * Render inside a `relative` container.
 */
export const GridBackground: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
};
