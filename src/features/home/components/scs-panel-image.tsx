import React from "react";
import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-sizes";
import styles from "@/components/features/homepage/SCS.module.css";

interface ScsPanelImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Floating top illustration with saucer shadow for the SCS service panels.
 */
export const ScsPanelImage: React.FC<ScsPanelImageProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageWithShadow}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={IMAGE_QUALITY}
          sizes={IMAGE_SIZES.scsTopImage}
          className={styles.topImage}
        />
        <div className={styles.saucerShadow}></div>
      </div>
    </div>
  );
};
