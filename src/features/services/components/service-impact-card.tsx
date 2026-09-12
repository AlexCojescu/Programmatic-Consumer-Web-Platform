"use client";

import React from "react";

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
  style: React.CSSProperties;
  isHoverEnabled: boolean;
  iconContainerStyle: React.CSSProperties;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  onSelect: () => void;
}

/**
 * Grid card for one service impact area. CSS/compositor hover only — no layout projection.
 */
export const ServiceImpactCard: React.FC<ServiceImpactCardProps> = ({
  service,
  style,
  isHoverEnabled,
  iconContainerStyle,
  titleStyle,
  descriptionStyle,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-[18px] transition-[transform,box-shadow,border-color] duration-200 ${
        isHoverEnabled
          ? "hover:-translate-y-[3px] hover:border-gray-300 hover:shadow-[0_16px_40px_-10px_rgba(15,23,42,0.22)]"
          : ""
      }`}
      style={style}
    >
      <div style={iconContainerStyle}>{service.icon}</div>
      <div>
        <h3 style={titleStyle}>{service.title}</h3>
        <p style={descriptionStyle}>{service.description}</p>
      </div>
    </button>
  );
};
