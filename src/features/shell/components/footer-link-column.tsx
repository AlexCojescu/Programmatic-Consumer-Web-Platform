import React from "react";

interface FooterLinkColumnProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Footer navigation column: uppercase underlined heading with a stacked
 * list of links or rows beneath it.
 */
export const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({
  title,
  children,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-1.5 sm:pb-2">
        {title}
      </h4>
      <div className="space-y-2.5 sm:space-y-3 flex flex-col">{children}</div>
    </div>
  );
};
