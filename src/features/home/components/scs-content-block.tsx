import React from "react";
import styles from "@/features/home/styles/scs.module.css";

export interface ScsContentBlockData {
  title: React.ReactNode;
  items: React.ReactNode[];
}

interface ScsContentBlockProps extends ScsContentBlockData {
  /** Render a leading "•" span in each bullet item (SCS02 variant). */
  showBulletDot?: boolean;
}

/**
 * Numbered right-column content block with bullet items for the SCS
 * service panels.
 */
export const ScsContentBlock: React.FC<ScsContentBlockProps> = ({
  title,
  items,
  showBulletDot = false,
}) => {
  return (
    <div className={styles.contentBlock}>
      <h3 className={styles.blockTitle}>{title}</h3>
      <div className={styles.bulletPoints}>
        {items.map((item, i) => (
          <div key={i} className={styles.bulletItem}>
            {showBulletDot ? <span className={styles.bullet}>•</span> : null}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
