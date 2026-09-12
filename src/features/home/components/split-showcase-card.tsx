"use client";

import React from "react";
import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/shared/lib/image-sizes";
import { ScsLearnMoreButton } from "@/features/home/components/scs-learn-more-button";
import styles from "@/features/home/styles/scs.module.css";

interface ShowcaseBlock {
  title: React.ReactNode;
  /** Each entry is rendered inside its own bulletItem row. */
  bullets: React.ReactNode[];
}

interface SplitShowcaseCardProps {
  imageSource: string;
  imageAlt: string;
  /** SCS02 uses a wider illustration (290); all others use the default. */
  imageWidth?: number;
  className?: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  description: React.ReactNode;
  blocks: ShowcaseBlock[];
}

/**
 * Shared shell for the SCS service showcase cards: illustration + copy on the
 * left, divider, and titled bullet blocks on the right. Styling comes from
 * the shared SCS CSS module; the Learn More button routes to /services.
 */
export const SplitShowcaseCard: React.FC<SplitShowcaseCardProps> = ({
  imageSource,
  imageAlt,
  imageWidth = 250,
  className = "",
  title,
  subtitle,
  description,
  blocks,
}) => {
  return (
    <section className={`${styles.strategyConsultingContainer} ${className}`}>
      <div className={styles.strategyConsultingCard}>
        {/* Left Side */}
        <div className={styles.leftSection}>
          {/* Image with shadow */}
          <div className={styles.imageContainer}>
            <div className={styles.imageWithShadow}>
              <Image
                src={imageSource}
                alt={imageAlt}
                width={imageWidth}
                height={130}
                quality={IMAGE_QUALITY}
                sizes={IMAGE_SIZES.scsTopImage}
                className={styles.topImage}
              />
              <div className={styles.saucerShadow}></div>
            </div>
          </div>

          <div className={styles.leftContent}>
            <h2 className={styles.mainTitle}>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <p className={styles.description}>{description}</p>
            <ScsLearnMoreButton />
          </div>
        </div>

        {/* Divider */}
        <div className={styles.dividerLine}></div>

        {/* Right Side */}
        <div className={styles.rightSection}>
          <div className={styles.rightContent}>
            {blocks.map((block, index) => (
              <div key={index} className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>{block.title}</h3>
                <div className={styles.bulletPoints}>
                  {block.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className={styles.bulletItem}>
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
