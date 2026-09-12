"use client";

import Link from "next/link";
import React from "react";
import styles from "@/features/home/styles/scs.module.css";

interface ScsLearnMoreButtonProps {
  href?: string;
}

/**
 * "Learn More" control with trailing arrow used in the SCS service panels.
 */
export const ScsLearnMoreButton: React.FC<ScsLearnMoreButtonProps> = ({
  href = "/services",
}) => {
  return (
    <Link href={href} className={styles.learnMoreBtn}>
      <span>Learn More</span>
      <svg
        className={styles.arrowIcon}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 8h14m-7-7l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};
