import React from "react";
import styles from "@/features/home/styles/scs.module.css";

interface ScsPanelIntroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  description: React.ReactNode;
  /** Optional action rendered after the description (e.g. Learn More button). */
  action?: React.ReactNode;
}

/**
 * Left-column intro copy block (title, subtitle, description, optional
 * action) for the SCS service panels.
 */
export const ScsPanelIntro: React.FC<ScsPanelIntroProps> = ({
  title,
  subtitle,
  description,
  action,
}) => {
  return (
    <div className={styles.leftContent}>
      <h2 className={styles.mainTitle}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <p className={styles.description}>{description}</p>
      {action}
    </div>
  );
};
