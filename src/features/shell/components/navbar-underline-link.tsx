import Link from "next/link";
import React from "react";

interface NavbarUnderlineLinkProps {
  href: string;
  children: React.ReactNode;
}

/** Desktop navbar anchor with the animated purple underline on hover. */
export const NavbarUnderlineLink: React.FC<NavbarUnderlineLinkProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="text-gray-800 hover:text-purple-700 transition-colors duration-200 cursor-pointer relative group font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};
