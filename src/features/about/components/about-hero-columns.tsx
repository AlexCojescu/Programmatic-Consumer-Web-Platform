import React from "react";

interface AboutHeroColumnsProps {
  /** Media slot rendered in the right-hand column (e.g. bot detection card). */
  media: React.ReactNode;
  children: React.ReactNode;
}

/**
 * About hero grid: wide copy column (centered on small screens) paired
 * with a right-aligned media column.
 */
export const AboutHeroColumns: React.FC<AboutHeroColumnsProps> = ({
  media,
  children,
}) => {
  return (
    <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-center">
      {/* Left: copy + CTAs */}
      <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
        <div className="space-y-5 sm:space-y-7">{children}</div>
      </div>

      {/* Right: media card */}
      <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
        {media}
      </div>
    </div>
  );
};
