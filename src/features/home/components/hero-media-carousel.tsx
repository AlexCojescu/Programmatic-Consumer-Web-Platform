"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  HERO_AUTOPLAY_DELAY_MS,
  HERO_AUTOPLAY_PAUSE_AFTER_INTERACTION_MS,
  HERO_SLIDES,
} from "@/features/home/data/hero-slides";
import { HeroSlideContent } from "@/features/home/components/hero-carousel-slide";
import { HeroCarouselControls } from "@/features/home/components/hero-carousel-controls";
import styles from "../styles/hero-media-carousel.module.css";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

export default function HeroMediaCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: HERO_AUTOPLAY_DELAY_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
      align: "start",
      containScroll: false,
    },
    prefersReducedMotion ? [] : [autoplayPlugin]
  );

  const pauseAutoplayTemporarily = useCallback(() => {
    if (prefersReducedMotion || !emblaApi) return;

    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    autoplay.stop();

    if (autoplayResumeTimeoutRef.current) {
      clearTimeout(autoplayResumeTimeoutRef.current);
    }

    autoplayResumeTimeoutRef.current = setTimeout(() => {
      autoplay.play();
      autoplayResumeTimeoutRef.current = null;
    }, HERO_AUTOPLAY_PAUSE_AFTER_INTERACTION_MS);
  }, [emblaApi, prefersReducedMotion]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    startTransition(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion) return;

    const onPointerDown = () => pauseAutoplayTemporarily();
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, pauseAutoplayTemporarily, prefersReducedMotion]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit(
      {
        loop: true,
        dragFree: false,
        align: "start",
        containScroll: false,
      },
      prefersReducedMotion ? [] : [autoplayPlugin]
    );
  }, [autoplayPlugin, emblaApi, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (autoplayResumeTimeoutRef.current) {
        clearTimeout(autoplayResumeTimeoutRef.current);
      }
    };
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      pauseAutoplayTemporarily();
    },
    [emblaApi, pauseAutoplayTemporarily]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    pauseAutoplayTemporarily();
  }, [emblaApi, pauseAutoplayTemporarily]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    pauseAutoplayTemporarily();
  }, [emblaApi, pauseAutoplayTemporarily]);

  return (
    <>
      <section
        className={styles.viewport}
        ref={emblaRef}
        aria-roledescription="carousel"
        aria-label="Hero highlights"
      >
        <div className={styles.container}>
          {HERO_SLIDES.map((slide, index) => (
            <HeroSlideContent
              key={slide.id}
              slide={slide}
              index={index}
              isActive={index === selectedIndex}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </section>

      <HeroCarouselControls
        selectedIndex={selectedIndex}
        onSelectSlide={scrollTo}
        onPrev={scrollPrev}
        onNext={scrollNext}
      />
    </>
  );
}
