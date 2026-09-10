"use client";

import React from "react";
import styles from "@/components/features/homepage/SCS.module.css";

interface ScsLearnMoreButtonProps {
  onClick: () => void;
}

/**
 * "Learn More" button with trailing arrow used in the SCS service panels.
 */
export const ScsLearnMoreButton: React.FC<ScsLearnMoreButtonProps> = ({
  onClick,
}) => {
  return (
    <button type="button" className={styles.learnMoreBtn} onClick={onClick}>
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
    </button>
  );
};
