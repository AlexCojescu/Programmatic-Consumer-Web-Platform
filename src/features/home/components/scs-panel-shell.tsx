import React from "react";
import styles from "@/components/features/homepage/SCS.module.css";

interface ScsPanelShellProps {
  className: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

/**
 * Outer frame for the SCS service panels: section + card with a left
 * content column, vertical divider, and right content column.
 */
export const ScsPanelShell: React.FC<ScsPanelShellProps> = ({
  className,
  left,
  right,
}) => {
  return (
    <section className={`${styles.strategyConsultingContainer} ${className}`}>
      <div className={styles.strategyConsultingCard}>
        {/* Left Side */}
        <div className={styles.leftSection}>{left}</div>

        {/* Divider */}
        <div className={styles.dividerLine}></div>

        {/* Right Side */}
        <div className={styles.rightSection}>
          <div className={styles.rightContent}>{right}</div>
        </div>
      </div>
    </section>
  );
};
