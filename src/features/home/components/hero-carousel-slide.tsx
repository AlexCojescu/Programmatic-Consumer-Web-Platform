"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import {
  heroAssetUrl,
  heroFallbackUrl,
  heroSrcSet,
  type HeroImageSlide,
  type HeroPictureSources,
  type HeroSlide,
  type HeroVideoSlide,
} from "@/lib/hero-slides";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import styles from "@/components/features/homepage/HeroMediaCarousel.module.css";

function HeroPicture({
  picture,
  alt,
  isActive,
  priority,
}: {
  picture: HeroPictureSources;
  alt: string;
  isActive: boolean;
  priority?: boolean;
}) {
  return (
    <ResponsivePicture
      alt={alt}
      width={picture.width}
      height={picture.height}
      sizes={picture.sizes}
      avifSrcSet={heroSrcSet(picture.assetId, "avif")}
      webpSrcSet={heroSrcSet(picture.assetId, "webp")}
      fallbackSrc={heroFallbackUrl(picture.assetId)}
      className={styles.media}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      aria-hidden={!isActive}
    />
  );
}

interface HeroSlideImageProps {
  slide: HeroImageSlide;
  isActive: boolean;
}

const HeroSlideImage = memo(function HeroSlideImage({
  slide,
  isActive,
}: HeroSlideImageProps) {
  return (
    <HeroPicture
      picture={slide.picture}
      alt={slide.alt}
      isActive={isActive}
      priority={slide.priority}
    />
  );
});

interface HeroSlideVideoProps {
  slide: HeroVideoSlide;
  isActive: boolean;
  prefersReducedMotion: boolean;
}

const HeroSlideVideo = memo(function HeroSlideVideo({
  slide,
  isActive,
  prefersReducedMotion,
}: HeroSlideVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoSource, setHasVideoSource] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideoSource) return;

    if (isActive && !prefersReducedMotion) {
      video.preload = "metadata";
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          /* Autoplay blocked or missing file — poster remains visible */
        });
      }
      return;
    }

    video.pause();
    video.preload = "none";
    video.currentTime = 0;
  }, [hasVideoSource, isActive, prefersReducedMotion]);

  return (
    <>
      <HeroPicture
        picture={slide.poster}
        alt={slide.alt}
        isActive={isActive}
        priority={slide.priority}
      />
      {hasVideoSource ? (
        <video
          ref={videoRef}
          className={styles.media}
          poster={heroFallbackUrl(slide.poster.assetId)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden={!isActive}
          onError={() => setHasVideoSource(false)}
        >
          <source src={heroAssetUrl(slide.mp4)} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
});

interface HeroSlideOverlayProps {
  slide: HeroSlide;
  index: number;
  isActive: boolean;
}

const HeroSlideOverlay = memo(function HeroSlideOverlay({
  slide,
  index,
  isActive,
}: HeroSlideOverlayProps) {
  const HeadingTag = index === 0 ? "h1" : "h2";
  const { content } = slide;

  return (
    <div
      className={styles.slideOverlay}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
    >
      <div className={styles.slideCopy}>
        <HeadingTag className={styles.slideTitle}>{content.title}</HeadingTag>
        <p className={styles.slideDescription}>{content.description}</p>

        <div className={styles.slideActions}>
          <Link
            href={content.primaryCta.href}
            className={styles.primaryButton}
            prefetch={false}
          >
            {content.primaryCta.label}
          </Link>
          <Link
            href={content.secondaryCta.href}
            className={styles.secondaryButton}
            prefetch={false}
          >
            {content.secondaryCta.label}
          </Link>
        </div>
      </div>
    </div>
  );
});

interface HeroSlideContentProps {
  slide: HeroSlide;
  index: number;
  isActive: boolean;
  prefersReducedMotion: boolean;
}

export const HeroSlideContent = memo(function HeroSlideContent({
  slide,
  index,
  isActive,
  prefersReducedMotion,
}: HeroSlideContentProps) {
  return (
    <div
      className={styles.slide}
      id={`hero-slide-${slide.id}`}
      role="tabpanel"
      aria-hidden={!isActive}
      aria-labelledby={`hero-tab-${slide.id}`}
      inert={!isActive ? true : undefined}
    >
      <div className={styles.slideMedia}>
        {slide.type === "image" ? (
          <HeroSlideImage slide={slide} isActive={isActive} />
        ) : (
          <HeroSlideVideo
            slide={slide}
            isActive={isActive}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </div>
      <div className={styles.slideFilm} aria-hidden="true" />
      <HeroSlideOverlay slide={slide} index={index} isActive={isActive} />
    </div>
  );
});
