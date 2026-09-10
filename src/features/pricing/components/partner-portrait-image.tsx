import React from "react";
import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/shared/lib/image-sizes";

interface PartnerPortraitImageProps {
  className: string;
  priority?: boolean;
}

/**
 * Circular portrait of Alex used in the homepage partner section
 * (mobile and desktop variants pass their own ring classes).
 */
export const PartnerPortraitImage: React.FC<PartnerPortraitImageProps> = ({
  className,
  priority = false,
}) => {
  return (
    <Image
      src="/Creator.png"
      alt="A portrait of Alex"
      width={400}
      height={400}
      quality={IMAGE_QUALITY}
      sizes={IMAGE_SIZES.partnerPortrait}
      className={className}
      priority={priority}
    />
  );
};
