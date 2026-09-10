import React from "react";

/** Pulsing emerald "live" indicator used in the availability toast. */
export const AvailabilityLiveDot: React.FC = () => {
  return (
    <div className="flex-shrink-0 pt-0.5">
      <div className="relative">
        <span className="flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/75 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-sm ring-2 ring-white"></span>
        </span>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm scale-150 animate-pulse"></div>
      </div>
    </div>
  );
};
