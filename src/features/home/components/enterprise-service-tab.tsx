"use client";

import React from "react";
import styles from "@/features/home/styles/enterprise-services-hub.module.css";

export interface EnterpriseServiceOption {
  id: string;
  label: string;
  shortLabel?: string;
  component: React.ComponentType;
  description: string;
  icon: React.ReactNode;
}

interface EnterpriseServiceTabProps {
  option: EnterpriseServiceOption;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

/**
 * Keyboard-accessible service tab button for the enterprise services hub.
 */
export const EnterpriseServiceTab: React.FC<EnterpriseServiceTabProps> = ({
  option,
  index,
  isActive,
  onSelect,
}) => {
  return (
    <button
      type="button"
      role="tab"
      id={`service-tab-${option.id}`}
      aria-controls={`service-panel-${option.id}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      onFocus={onSelect}
      className={`${styles.serviceTab} ${isActive ? styles.active : ""}`}
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className={styles.tabIcon} aria-hidden="true">{option.icon}</div>
      <div className={styles.tabContent}>
        <span className={styles.tabLabelFull}>
          {option.label}
        </span>
        <span className={styles.tabLabelShort}>
          {option.shortLabel}
        </span>
        <span className={styles.tabDescription}>
          {option.id === "inbound" &&
            "We make it easier for teams to respond quickly, qualify opportunities consistently, and move the right work into onboarding and delivery without confusion."}
          {option.id === "process" &&
            "We help define stages, responsibilities, and supporting tools so work moves forward predictably, progress is visible, and teams can manage capacity without constant firefighting."}
          {option.id === "onboarding" &&
            "We streamline steps, clarify expectations, and connect the necessary systems so new clients move from “yes” to “fully active” with fewer delays and much less manual follow-up."}
        </span>
      </div>
      <div className={styles.tabIndicator} aria-hidden="true"></div>
    </button>
  );
};
