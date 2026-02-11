"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { VideoText } from "@/components/magicui/video-text";
import { AnimatedListDemo } from "@/components/features/homepage/AnimatedList";
import WorldMap from "@/components/ui/world-map";
import styles from "./HeroSection.module.css";

// Helper function for linear interpolation (lerping)
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

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      if (isMobile) {
        setTimeout(() => setTitleAnimated(true), 300);
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Button fade-in after content
  useEffect(() => {
    if (opacity === 1) {
      const buttonTimer = setTimeout(
        () => setButtonOpacity(1),
        isMobile ? 800 : 1000
      );
      return () => clearTimeout(buttonTimer);
    }
  }, [opacity, isMobile]);

  // Parallax + button visibility (throttled with rAF)
  useEffect(() => {
    let animationFrameId: number | null = null;
    let targetYOffset = window.scrollY;

    const handleScroll = () => {
      targetYOffset = window.scrollY;

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
      smoothedYOffset.current = lerp(
        smoothedYOffset.current,
        targetYOffset,
        0.15
      );

      if (heroRef.current && !isMobile) {
        heroRef.current.style.transform = `translateY(-${
          smoothedYOffset.current * 0.5
        }px)`;
      }

      animationFrameId = null;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  const handleServicesClick = () => {
    router.push("/services");
  };

  return (
    <>
      {/* Background gradient */}
      <div className="sticky top-0 h-screen w-full bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]">
        <div
          ref={heroRef}
          className="relative h-full w-full transition-opacity duration-1000 ease-in-out"
          style={{ opacity }}
        >
          <div className="flex h-full w-full items-center justify-center">
            {isMobile ? (
              // Mobile version
              <div className={styles.mobileHeroContent}>
                <div className={styles.floatingElements}>
                  <div
                    className={`${styles.floatingCircle} ${styles.circle1}`}
                  ></div>
                  <div
                    className={`${styles.floatingCircle} ${styles.circle2}`}
                  ></div>
                  <div
                    className={`${styles.floatingCircle} ${styles.circle3}`}
                  ></div>
                </div>

                <div
                  className={`${styles.mobileTitle} ${
                    titleAnimated ? styles.animated : ""
                  }`}
                >
                  <h1 className={styles.titleText}>Programmatic</h1>
                  <div className={styles.titleUnderline}></div>
                  <p className={styles.titleTagline}>
                    AI-Powered Business Solutions
                  </p>
                </div>
              </div>
            ) : (
              // Desktop layout
              <div className="relative z-20 mx-auto w-full max-w-7xl flex flex-col px-8 pt-40 lg:pt-56">

                <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12">
                  {/* Left: larger VideoText section, tighter spacing */}
                  <div className="lg:col-span-8 flex flex-col items-start gap-4">
                    <div className="flex w-full flex-col gap-1.5">
                      <div className="relative h-[72px] min-h-[72px] w-full">
                        <VideoText
                          src="/HeroVid.mp4"
                          fontSize={6.5}
                          fontWeight="800"
                          textAnchor="start"
                          className="h-full w-full"
                        >
                          Production Grade Automation
                        </VideoText>
                      </div>
                      <div className="relative h-[72px] min-h-[72px] w-full">
                        <VideoText
                          src="/HeroVid.mp4"
                          fontSize={6.5}
                          fontWeight="800"
                          textAnchor="start"
                          className="h-full w-full"
                        >
                          For the Modern Enterprise
                        </VideoText>
                      </div>
                    </div>

                    <p className="mt-1.5 max-w-xl text-sm md:text-base text-neutral-700">
                    Engineering custom multi-agent frameworks with persistent memory and tool orchestration. Our high-fidelity systems turn messy operational data into self-healing, end-to-end pipelines.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <button
                        onClick={handleServicesClick}
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
                        Start your free trial
                      </button>

                      <button className="text-sm font-medium text-neutral-800 underline-offset-4 hover:underline">
                        View role based demos
                      </button>
                    </div>
                  </div>

                  {/* Right: smaller AnimatedList, side-by-side */}
                  <div className="lg:col-span-4 flex items-center justify-center">
                    <div className="w-full max-w-sm">
                      <AnimatedListDemo className="h-[320px]" />
                    </div>
                  </div>
                </div>

              
{/* World Map at the bottom */}
<div className="mt-12 w-full">
  <div className="mx-auto max-w-[1200px] px-0 lg:px-4">
    <WorldMap
      dots={[
        {
          start: { lat: 64.2008, lng: -149.4937 }, // Alaska
          end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        },
        {
          start: { lat: 64.2008, lng: -149.4937 }, // Alaska
          end: { lat: -15.7975, lng: -47.8919 }, // Brasília
        },
        {
          start: { lat: -15.7975, lng: -47.8919 }, // Brasília
          end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
        },
        {
          start: { lat: 51.5074, lng: -0.1278 }, // London
          end: { lat: 28.6139, lng: 77.209 }, // New Delhi
        },
        {
          start: { lat: 28.6139, lng: 77.209 }, // New Delhi
          end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
        },
        {
          start: { lat: 28.6139, lng: 77.209 }, // New Delhi
          end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
        },
      ]}
    />
  </div>
</div>


              </div>
            )}
          </div>

          {/* Center button overlay placeholder (kept for compatibility) */}
          {showButton && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ease-in-out"
              style={{ opacity: buttonOpacity }}
            >
              {/* Add overlay content here if needed */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
