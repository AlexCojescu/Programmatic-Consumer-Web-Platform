import React from "react";

interface CtaPanelProps {
  title: string;
  description: string;
  /** Full class list for the description paragraph (varies per section). */
  descriptionClassName: string;
  buttonLabel: string;
  /** Full class list for the CTA button (theme color varies per section). */
  buttonClassName: string;
}

/**
 * Centered glass call-to-action panel with a heading, copy, and button.
 */
export const CtaPanel: React.FC<CtaPanelProps> = ({
  title,
  description,
  descriptionClassName,
  buttonLabel,
  buttonClassName,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/30 text-center">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className={descriptionClassName}>{description}</p>
      <button type="button" className={`${buttonClassName} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2`}>
        {buttonLabel}
      </button>
    </div>
  );
};
