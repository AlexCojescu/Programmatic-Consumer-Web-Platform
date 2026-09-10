import React from "react";

interface FooterContactRowProps {
  /** Leading icon markup (svg). */
  icon: React.ReactNode;
  children: React.ReactNode;
}

/** Footer contact-info row pairing an icon with its detail content. */
export const FooterContactRow: React.FC<FooterContactRowProps> = ({
  icon,
  children,
}) => {
  return (
    <div className="flex items-start space-x-2 justify-center sm:justify-start">
      {icon}
      {children}
    </div>
  );
};
