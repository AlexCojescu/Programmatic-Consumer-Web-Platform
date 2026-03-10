"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./HeroSection.module.css";
import { VideoText } from "@/components/magicui/video-text";
import FadedGridBackground from "@/components/ui/FadedGridBackground";

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

export default function HeroSection() {
  const [opacity, setOpacity] = useState(0);
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const smoothedYOffset = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      if (isMobile) {
        setTimeout(() => setTitleAnimated(true), 300);
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (opacity === 1) {
      const buttonTimer = setTimeout(
        () => setButtonOpacity(1),
        isMobile ? 800 : 1000
      );
      return () => clearTimeout(buttonTimer);
    }
  }, [opacity, isMobile]);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const heroHeight = heroRef.current.offsetHeight;

        const heroVisible =
          heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        const scrolledPastHero = window.scrollY > heroHeight * 0.8;
        setShowButton(heroVisible && !scrolledPastHero);
      }

      if (animationFrameId == null) {
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    const smoothScroll = () => {
      smoothedYOffset.current = lerp(smoothedYOffset.current, lastScrollY, 0.15);

      if (heroRef.current && !isMobile) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const heroCenterY = heroRect.top + heroRect.height / 2;
        const viewportCenterY = viewportHeight / 2;
        const distanceFromCenter = heroCenterY - viewportCenterY;

        const maxDistance = viewportHeight;
        let t = distanceFromCenter / maxDistance;

        if (t > 1) t = 1;
        if (t < -1) t = -1;

        const parallaxOffset = t * 40;

        heroRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }

      animationFrameId = null;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  const handleAssessmentClick = () => {
    router.push("/contact");
  };

  const handleAboutClick = () => {
    router.push("/about");
  };

  return (
    <>
      <div className="sticky top-0 h-screen w-full bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)] relative overflow-hidden">
        <FadedGridBackground />
        <div
          ref={heroRef}
          className="relative h-full w-full transition-opacity duration-1000 ease-in-out"
          style={{ opacity }}
        >
          <div className="flex h-full w-full items-center justify-center">
            {isMobile ? (
              // MOBILE VERSION (same content, mobile layout)
              <div className={styles.mobileHeroContent}>
                <div className={styles.floatingElements}>
                  <div
                    className={`${styles.floatingCircle} ${styles.circle1}`}
                  />
                  <div
                    className={`${styles.floatingCircle} ${styles.circle2}`}
                  />
                  <div
                    className={`${styles.floatingCircle} ${styles.circle3}`}
                  />
                </div>

                {/* Mirror desktop "Production‑Grade / Systems Integration" */}
                <div className={styles.mobileVideoTitles}>
                  <p className={styles.mobileVideoLine}>Production‑Grade</p>
                  <p className={styles.mobileVideoLine}>Systems Integration</p>
                </div>

                {/* Same marketing copy as desktop */}
                <p className={styles.mobileBody}>
                  Engineering the workflows behind your intake, sales,
                  onboarding, and support. We replace manual patchwork with a
                  production‑grade system built to handle pressure and
                  consistently run at scale.
                </p>

                {/* Same actions as desktop, touch‑friendly */}
                <div className={styles.mobileActions}>
                  <button
                    onClick={handleAssessmentClick}
                    className={styles.primaryButton}
                  >
                    Get a systems assessment
                  </button>

                  <button
                    onClick={handleAboutClick}
                    className={styles.secondaryButton}
                  >
                    About
                  </button>
                </div>
              </div>
            ) : (
              // DESKTOP VERSION (unchanged except button handlers)
              <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col pt-20 lg:pt-8">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex w-full flex-col items-center text-center px-4 sm:px-6 lg:px-0">
                    <div className="flex w-full flex-col gap-[0px] max-w-6xl mx-auto">
                      <div className="relative h-[160px] min-h-[160px] max-h-[160px] w-full px-2 sm:px-4 lg:px-8">
                        <VideoText
                          src="/HeroVid.mp4"
                          fontSize={22}
                          fontWeight="800"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="h-full w-full"
                        >
                          Production‑Grade
                        </VideoText>
                      </div>
                      <div className="relative h-[160px] min-h-[160px] max-h-[160px] w-full px-2 sm:px-4 lg:px-8 -mt-8">
                        <VideoText
                          src="/HeroVid.mp4"
                          fontSize={22}
                          fontWeight="800"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="h-full w-full"
                        >
                          Systems Integration
                        </VideoText>
                      </div>
                    </div>

                    <p className="mt-2 max-w-xl text-base md:text-lg text-neutral-700 leading-relaxed">
                      Engineering the workflows behind your intake, sales,
                      onboarding, and support. We replace manual patchwork with a
                      production‑grade system built to handle pressure and
                      consistently run at scale.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={handleAssessmentClick}
                        className="bg-black px-8 py-3 text-sm font-medium text-white
                                   transition hover:-translate-y-0.5 hover:bg-neutral-900
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                                   focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        style={{
                          borderRadius: "14px",
                          boxShadow:
                            "0 26px 70px rgba(0,0,0,0.45), 0 8px 22px rgba(0,0,0,0.45)",
                        }}
                      >
                        Get a systems assessment
                      </button>

                      <button
                        onClick={handleAboutClick}
                        className="text-sm font-medium text-neutral-800 underline-offset-4 hover:underline"
                      >
                        About
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showButton && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ease-in-out"
              style={{ opacity: buttonOpacity }}
            >
              {/* Center overlay if needed */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
