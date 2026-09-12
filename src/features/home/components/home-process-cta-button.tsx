"use client";

import Link from "next/link";
import React from "react";

interface HomeProcessCtaButtonProps {
  style: React.CSSProperties;
  href: string;
  children: React.ReactNode;
}

/**
 * Homepage process section CTA that uses client navigation.
 */
export const HomeProcessCtaButton: React.FC<HomeProcessCtaButtonProps> = ({
  style,
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      style={style}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-gray-900 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
};
