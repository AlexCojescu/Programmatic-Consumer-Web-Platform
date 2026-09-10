import React from "react";

/**
 * First-focus skip control so keyboard users can bypass repeating chrome.
 */
export const SkipLink: React.FC = () => {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
};
