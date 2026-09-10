"use client";

import React from "react";
import { motion } from "motion/react";
import type { TargetAndTransition, Transition } from "motion/react";

export interface ServiceImpactItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  bottlenecks: string[];
  outcomes: string[];
  previewOutcome: string;
  metadata: string;
}

interface ServiceImpactCardProps {
  service: ServiceImpactItem;
  layoutTransition: Transition;
  style: React.CSSProperties;
  whileHover: TargetAndTransition;
  iconContainerStyle: React.CSSProperties;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  onSelect: () => void;
}

/**
 * Grid card for one service impact area. Shares layoutIds with the expanded
 * modal so framer-motion can morph between the two.
 */
export const ServiceImpactCard: React.FC<ServiceImpactCardProps> = ({
  service,
  layoutTransition,
  style,
  whileHover,
  iconContainerStyle,
  titleStyle,
  descriptionStyle,
  onSelect,
}) => {
  return (
    <motion.div
      layoutId={`service-card-${service.id}`}
      layout
      initial={false}
      animate={{ borderRadius: 18 }}
      transition={layoutTransition}
      style={style}
      whileHover={whileHover}
      onClick={onSelect}
    >
      <motion.div
        layoutId={`service-icon-${service.id}`}
        transition={layoutTransition}
        style={iconContainerStyle}
      >
        {service.icon}
      </motion.div>

      <div>
        <motion.h3
          layoutId={`service-title-${service.id}`}
          transition={layoutTransition}
          style={titleStyle}
        >
          {service.title}
        </motion.h3>
        <motion.p
          layoutId={`service-desc-${service.id}`}
          transition={layoutTransition}
          style={descriptionStyle}
        >
          {service.description}
        </motion.p>
      </div>
    </motion.div>
  );
};
