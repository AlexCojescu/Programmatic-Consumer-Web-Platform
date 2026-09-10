import React from "react";
import FadedGridBackground from "@/components/ui/FadedGridBackground";
import styles from "@/components/features/homepage/EnterpriseServicesHub.module.css";

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
