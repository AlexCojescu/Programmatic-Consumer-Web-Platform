"use client";

import Link from "next/link";
import React from "react";

interface NavbarMobileLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

/** Mobile navbar menu anchor that closes the menu on click. */
export const NavbarMobileLink: React.FC<NavbarMobileLinkProps> = ({
  href,
  onClick,
  children,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-800 text-lg w-full text-center py-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
};
