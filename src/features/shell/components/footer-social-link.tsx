import React from "react";

interface FooterSocialLinkProps {
  href: string;
  ariaLabel: string;
  /** Icon markup (svg) rendered inside the anchor. */
  children: React.ReactNode;
}

/** Footer social-media icon link with hover scale treatment. */
export const FooterSocialLink: React.FC<FooterSocialLinkProps> = ({
  href,
  ariaLabel,
  children,
}) => {
  return (
    <a
      href={href}
      className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-110 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};
