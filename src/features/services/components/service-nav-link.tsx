"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

interface ServiceNavLinkProps {
  name: string;
  href: string;
  isFeatured: boolean;
  variants: Variants;
}

/**
 * Animated service navigation link with a featured underline or a
 * hover-expanding underline.
 */
export const ServiceNavLink: React.FC<ServiceNavLinkProps> = ({
  name,
  href,
  isFeatured,
  variants,
}) => {
  return (
    <motion.a
      href={href}
      variants={variants}
      className={`text-sm sm:text-2xl text-gray-500 hover:text-gray-900 transition-colors duration-300 relative group
                    ${isFeatured ? "font-medium text-gray-800" : ""}
                  `}
    >
      <span>{name}</span>
      {isFeatured && (
        <span className="absolute bottom-[-4px] left-0 w-full h-px bg-gray-400" />
      )}
      {!isFeatured && (
        <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-gray-500 transition-all duration-300 group-hover:w-full" />
      )}
    </motion.a>
  );
};
