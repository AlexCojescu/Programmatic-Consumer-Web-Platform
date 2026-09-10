import React from "react";
import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-sizes";

interface WreathBadgeProps {
  title: string;
  subtitle: string;
  /** Fade-in delay utility class, e.g. "fade-in-delay-1". */
  delayClass: string;
  priority?: boolean;
}

/**
 * Laurel-wreath framed accolade badge used in the homepage quote banner.
 */
export const WreathBadge: React.FC<WreathBadgeProps> = ({
  title,
  subtitle,
  delayClass,
  priority = false,
}) => {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-3 fade-in-up-soft ${delayClass}`}>
      <div className="h-16 sm:h-28 md:h-32 w-auto">
        <Image
          src="/wreath-left.webp"
          alt=""
          width={90}
          height={300}
          quality={IMAGE_QUALITY}
          sizes={IMAGE_SIZES.wreath}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="text-center">
        <p className="text-sm sm:text-lg md:text-xl font-semibold text-blue-950 tracking-tight">
          {title}
        </p>
        <p className="text-[0.65rem] sm:text-sm md:text-base text-blue-900/90">
          {subtitle}
        </p>
      </div>
      <div className="h-16 sm:h-28 md:h-32 w-auto">
        <Image
          src="/wreath-right.webp"
          alt=""
          width={90}
          height={300}
          quality={IMAGE_QUALITY}
          sizes={IMAGE_SIZES.wreath}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </div>
    </div>
  );
};
