import React from "react";
import FadedGridBackground from "@/shared/ui/faded-grid-background";
import styles from "@/features/home/styles/enterprise-services-hub.module.css";

interface EnterpriseHeroShellProps {
  isVisible: boolean;
  children: React.ReactNode;
}

/**
 * Enterprise services hub hero frame: faded grid background plus the
 * wrapper/content/visibility structure around the hero content.
 */
export const EnterpriseHeroShell: React.FC<EnterpriseHeroShellProps> = ({
  isVisible,
  children,
}) => {
  return (
    <section className={styles.heroSection}>
      <FadedGridBackground />
      <div className={styles.heroWrapper}>
        <div
          className={`${styles.heroContent} ${
            isVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.contentWrapper}>{children}</div>
        </div>
      </div>
    </section>
  );
};
