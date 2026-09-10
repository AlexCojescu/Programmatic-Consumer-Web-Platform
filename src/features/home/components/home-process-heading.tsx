import React from "react";

interface HomeProcessHeadingProps {
  isMobile: boolean;
  isTablet: boolean;
  gradientText: string;
  plainText: string;
}

const commonStyles: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #111827, #4b5563, #111827)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/**
 * Homepage process section headline with the gradient first clause and the
 * responsive inline/block second clause.
 */
export const HomeProcessHeading: React.FC<HomeProcessHeadingProps> = ({
  isMobile,
  isTablet,
  gradientText,
  plainText,
}) => {
  const headingWrapperStyle: React.CSSProperties = {
    ...commonStyles,
    width: "100%",
    display: "block",
    textAlign: "left",
    marginBottom: isMobile ? "0.75rem" : "1.5rem",
    padding: isMobile || isTablet ? "0 1rem" : "0 2rem",
  };

  const headingStyle: React.CSSProperties = {
    ...commonStyles,
    fontSize: isMobile ? "1.5rem" : isTablet ? "2.75rem" : "4.5rem",
    fontWeight: 700,
    color: "#111827",
    lineHeight: isMobile ? 1.2 : 1.1,
    letterSpacing: "-0.025em",
    marginBottom: 0,
    maxWidth: isMobile || isTablet ? "100%" : "72rem",
    wordBreak: "normal",
  };

  return (
    <div style={headingWrapperStyle}>
      <h1 style={headingStyle}>
        <span style={gradientTextStyle}>{gradientText}</span>
        <span
          style={{
            display: isMobile || isTablet ? "inline" : "block",
          }}
        >
          {" "}
          {plainText}
        </span>
      </h1>
    </div>
  );
};
