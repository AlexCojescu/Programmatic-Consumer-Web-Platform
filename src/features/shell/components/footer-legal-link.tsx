import Link from "next/link";
import React from "react";

interface FooterLegalLinkProps {
  href: string;
  children: React.ReactNode;
}

/** Small legal/policy link used in the footer bottom bar. */
export const FooterLegalLink: React.FC<FooterLegalLinkProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
};
