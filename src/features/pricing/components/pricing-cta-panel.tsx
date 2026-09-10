import React from "react";

interface PricingCtaPanelProps {
  title: string;
  /** Full verbatim class string for the body paragraph. */
  bodyClassName: string;
  body: string;
  /** Full verbatim class string for the CTA button (accent color varies). */
  buttonClassName: string;
  buttonLabel: string;
}

/**
 * Centered glass call-to-action panel with a title, body copy, and a solid
 * CTA button.
 */
export const PricingCtaPanel: React.FC<PricingCtaPanelProps> = ({
  title,
  bodyClassName,
  body,
  buttonClassName,
  buttonLabel,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/30 text-center">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className={bodyClassName}>
        {body}
      </p>
      <button
        type="button"
        className={`${buttonClassName} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};
