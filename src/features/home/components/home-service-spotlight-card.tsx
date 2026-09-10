"use client";

import React from "react";
import { motion } from "motion/react";
import type { Transition } from "motion/react";

export interface HomeServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string;
  metadata: string;
}

interface HomeServiceSpotlightCardProps {
  service: HomeServiceData;
  isMobile: boolean;
  /** Disable the hover lift while the expanded modal is open. */
  isHoverEnabled: boolean;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  transition: Transition;
  onSelect: () => void;
}

const commonStyles: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
};

/**
 * Homepage process/service grid card with shared-layout ids that pair with
 * the expanded HomeServiceModal.
 */
export const HomeServiceSpotlightCard: React.FC<
  HomeServiceSpotlightCardProps
> = ({
  service,
  isMobile,
  isHoverEnabled,
  titleStyle,
  descriptionStyle,
  transition,
  onSelect,
}) => {
  return (
    <motion.div
      layoutId={`service-card-${service.id}`}
      layout
      initial={false}
      animate={{ borderRadius: 16 }}
      transition={transition}
      style={{
        ...commonStyles,
        padding: isMobile ? "0.7rem" : "1.25rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)",
        cursor: "pointer",
      }}
      whileHover={
        isHoverEnabled
          ? {
              y: -2,
              borderColor: "#d1d5db",
              boxShadow:
                "0 12px 30px -8px rgba(15, 23, 42, 0.18)",
            }
          : {}
      }
      onClick={onSelect}
    >
      {/* If you want to actually show the icon, you can place this just above the title:
          <div style={iconContainerStyle}>{service.icon}</div>
      */}
      <motion.h3
        layoutId={`service-title-${service.id}`}
        transition={transition}
        style={titleStyle}
      >
        {service.title}
      </motion.h3>
      <motion.p
        layoutId={`service-desc-${service.id}`}
        transition={transition}
        style={descriptionStyle}
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
};
