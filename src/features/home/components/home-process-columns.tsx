import React from "react";

interface HomeProcessColumnsProps {
  isMobile: boolean;
  isTablet: boolean;
  left: React.ReactNode;
  right: React.ReactNode;
}

const commonStyles: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
};

/**
 * Homepage process section main row: 55/45 two-column flex layout that
 * stacks on mobile/tablet, styled with the section's inline-style system.
 */
export const HomeProcessColumns: React.FC<HomeProcessColumnsProps> = ({
  isMobile,
  isTablet,
  left,
  right,
}) => {
  const rowStyle: React.CSSProperties = {
    ...commonStyles,
    display: "flex",
    flexDirection: isMobile || isTablet ? "column" : "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: isMobile ? "1.25rem" : isTablet ? "2rem" : "3rem",
    margin: 0,
    padding: isMobile || isTablet ? "0 1rem" : "0 2rem",
    boxSizing: "border-box",
  };

  const leftColumnStyle: React.CSSProperties = {
    ...commonStyles,
    flex: isMobile || isTablet ? "1 1 100%" : "1 1 55%",
    maxWidth: isMobile || isTablet ? "100%" : "48rem",
    margin: 0,
  };

  const rightColumnStyle: React.CSSProperties = {
    ...commonStyles,
    flex: isMobile || isTablet ? "1 1 100%" : "1 1 45%",
    maxWidth: isMobile || isTablet ? "100%" : "32rem",
    margin: isMobile || isTablet ? "0.25rem 0 0 0" : "7.8rem 0 0 0",
  };

  return (
    <div style={rowStyle}>
      <div style={leftColumnStyle}>{left}</div>
      <div style={rightColumnStyle}>{right}</div>
    </div>
  );
};
