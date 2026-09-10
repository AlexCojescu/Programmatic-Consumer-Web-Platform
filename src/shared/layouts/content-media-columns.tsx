import React from "react";

interface ContentMediaColumnsProps {
  /** Media slot rendered in the narrower right-hand column. */
  media: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 3:2 two-column layout pairing prose content with a media slot.
 * Columns stack on smaller viewports.
 */
export const ContentMediaColumns: React.FC<ContentMediaColumnsProps> = ({
  media,
  children,
}) => {
  return (
    <div className="mb-16 sm:mb-20 grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-6 items-center">
      <div>{children}</div>
      <div className="mt-6 lg:mt-0 flex items-center justify-center w-full">
        {media}
      </div>
    </div>
  );
};
