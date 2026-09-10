"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/features/home/data/hero-slides";
import styles from "@/features/home/styles/hero-media-carousel.module.css";

interface HeroCarouselControlsProps {
  selectedIndex: number;
  onSelectSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Prev/next arrows and dot tablist for the homepage hero carousel.
 */
export const HeroCarouselControls: React.FC<HeroCarouselControlsProps> = ({
  selectedIndex,
  onSelectSlide,
  onPrev,
  onNext,
}) => {
  return (
    <>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight aria-hidden="true" />
      </button>

      <div className={styles.dots} role="tablist" aria-label="Choose a hero slide">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={slide.id}
              id={`hero-tab-${slide.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`hero-slide-${slide.id}`}
              tabIndex={isActive ? 0 : -1}
              aria-label={`Go to slide ${index + 1}`}
              className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
              onClick={() => onSelectSlide(index)}
            />
          );
        })}
      </div>
    </>
  );
};
