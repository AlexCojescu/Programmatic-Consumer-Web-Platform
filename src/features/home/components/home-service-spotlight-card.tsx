"use client";

import React from "react";

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
  onSelect: () => void;
}

const commonStyles: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
};

/**
 * Homepage process/service grid card. Uses CSS hover instead of layout projection.
 */
export const HomeServiceSpotlightCard: React.FC<
  HomeServiceSpotlightCardProps
> = ({
  service,
  isMobile,
  isHoverEnabled,
  titleStyle,
  descriptionStyle,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-transform duration-200 ${
        isHoverEnabled ? "hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_12px_30px_-8px_rgba(15,23,42,0.18)]" : ""
      }`}
      style={{
        ...commonStyles,
        padding: isMobile ? "0.7rem" : "1.25rem",
      }}
    >
      <h3 style={titleStyle}>{service.title}</h3>
      <p style={descriptionStyle}>{service.description}</p>
    </button>
  );
};
