import Link from "next/link";
import React from "react";

interface FooterNavLinkProps {
  href: string;
  children: React.ReactNode;
}

/** Footer column navigation link with the hover slide treatment. */
export const FooterNavLink: React.FC<FooterNavLinkProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-200 hover:translate-x-0 sm:hover:translate-x-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
};
