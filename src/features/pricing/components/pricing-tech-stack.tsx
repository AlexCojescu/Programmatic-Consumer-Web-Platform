import React from "react";
import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/shared/lib/image-sizes";

interface TechStackLogo {
  src: string;
  alt: string;
}

interface PricingTechStackProps {
  title: string;
  logos: TechStackLogo[];
}

/**
 * Centered glass panel showcasing a row of tool logos under a small title.
 */
export const PricingTechStack: React.FC<PricingTechStackProps> = ({
  title,
  logos,
}) => {
  return (
    <div className="text-center mb-16">
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 inline-block">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center space-x-8">
          {logos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={80}
              height={40}
              quality={IMAGE_QUALITY}
              sizes={IMAGE_SIZES.pricingLogo}
              className="opacity-70"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
