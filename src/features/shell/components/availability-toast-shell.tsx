import React from "react";

interface AvailabilityToastShellProps {
  isVisible: boolean;
  children: React.ReactNode;
}

/**
 * Fixed bottom-left toast frame for the availability notification:
 * slide/fade transition wrapper, white card, gradient overlay, content
 * flex row, and bottom accent line.
 */
export const AvailabilityToastShell: React.FC<AvailabilityToastShellProps> = ({
  isVisible,
  children,
}) => {
  return (
    // Bottom-left toast placement
    <div
      className={`fixed bottom-5 left-5 z-40 w-full max-w-sm transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'
      }`}
      role="alert"
      aria-live="polite"
      aria-label="Project availability notification"
    >
      {/* Premium white theme with enhanced shadows and gradients[140][155] */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/[0.08] backdrop-blur-sm border border-gray-100/80">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-gray-50/30 pointer-events-none"></div>

        {/* Main content container with proper spacing[147][152] */}
        <div className="relative p-6">
          <div className="flex items-start gap-4">{children}</div>
        </div>

        {/* Subtle bottom accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
    </div>
  );
};
