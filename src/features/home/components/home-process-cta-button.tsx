"use client";

import React from "react";

interface HomeProcessCtaButtonProps {
  style: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}

const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.backgroundColor = "#111827";
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow =
    "0 26px 70px rgba(0,0,0,0.5), 0 10px 26px rgba(0,0,0,0.5)";
};

const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.backgroundColor = "#000000";
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow =
    "0 26px 70px rgba(0,0,0,0.45), 0 8px 22px rgba(0,0,0,0.45)";
};

/**
 * Homepage process section CTA button with imperative hover lift styles.
 */
export const HomeProcessCtaButton: React.FC<HomeProcessCtaButtonProps> = ({
  style,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      style={style}
      onMouseEnter={handleButtonHover}
      onMouseLeave={handleButtonLeave}
      onClick={onClick}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {children}
    </button>
  );
};
