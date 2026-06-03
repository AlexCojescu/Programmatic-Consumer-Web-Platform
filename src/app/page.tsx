"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, type ReactNode } from "react";
import HeroSection from "@/components/features/homepage/HeroSection";
import Navbar from "@/components/features/Navbar";
import QuoteSection from "@/components/features/homepage/QuoteSection";
import FadedGridBackground from "@/components/ui/FadedGridBackground";
import { DeferredMount } from "@/components/ui/deferred-mount";

function SectionSkeleton({ className }: { className: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/40 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

const ProcessSection = dynamic(
  () => import("@/components/features/homepage/ProcessSection"),
  {
    loading: () => <SectionSkeleton className="min-h-[640px] w-full" />,
    ssr: true,
  }
);

const ServiceFilter = dynamic(
  () => import("@/components/features/homepage/Service-filter"),
  {
    loading: () => <SectionSkeleton className="min-h-[650px] w-full max-w-6xl mx-auto" />,
    ssr: true,
  }
);

const ContactHeader = dynamic(
  () => import("@/components/features/ContactHeader"),
  {
    loading: () => <SectionSkeleton className="h-36 w-full max-w-4xl mx-auto" />,
    ssr: true,
  }
);

const ContactFormMain = dynamic(
  () => import("@/components/features/contactmemain"),
  {
    loading: () => <SectionSkeleton className="min-h-[520px] w-full" />,
    ssr: true,
  }
);

const CalendlyWidget = dynamic(
  () => import("@/components/features/homepage/CalendlyWidget"),
  {
    loading: () => <SectionSkeleton className="h-[750px] w-full" />,
    ssr: false,
  }
);

const ContactFooter = dynamic(
  () => import("@/components/features/ContactFooter"),
  {
    loading: () => <SectionSkeleton className="h-28 w-full" />,
    ssr: true,
  }
);

function useFadeInOnScroll(
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, isVisible]);

  return { elementRef, isVisible };
}

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  rootMargin?: string;
}

function FadeInSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: FadeInSectionProps) {
  const { elementRef, isVisible } = useFadeInOnScroll(threshold, rootMargin);

  const getTransformClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-8";
      case "down":
        return "-translate-y-8";
      case "left":
        return "translate-x-8";
      case "right":
        return "-translate-x-8";
      default:
        return "translate-y-8";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <div className="w-full">
      <Navbar />
      <HeroSection />
      <QuoteSection />

      <div className="relative z-10 overflow-hidden bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]">
        <FadedGridBackground />

        <section className="relative py-16 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <DeferredMount
              fallback={<SectionSkeleton className="min-h-[640px] w-full" />}
            >
              <ProcessSection />
            </DeferredMount>
          </div>
        </section>

        <FadeInSection delay={300} direction="up" threshold={0.2}>
          <DeferredMount
            fallback={
              <SectionSkeleton className="min-h-[650px] w-full max-w-6xl mx-auto" />
            }
          >
            <ServiceFilter />
          </DeferredMount>
        </FadeInSection>

        <DeferredMount fallback={<SectionSkeleton className="h-36 w-full max-w-4xl mx-auto" />}>
          <ContactHeader />
        </DeferredMount>

        <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-0 px-16 lg:px-32 xl:px-48 2xl:px-64">
          <div className="flex items-center justify-center py-4 lg:py-6 lg:pr-1">
            <div className="w-full max-w-none">
              <DeferredMount
                fallback={<SectionSkeleton className="min-h-[520px] w-full" />}
              >
                <ContactFormMain />
              </DeferredMount>
            </div>
          </div>

          <div
            id="contact-me"
            className="flex items-center justify-center py-4 lg:py-6 lg:pl-1"
          >
            <div className="w-full">
              <DeferredMount
                fallback={<SectionSkeleton className="h-[750px] w-full" />}
                rootMargin="480px"
              >
                <CalendlyWidget />
              </DeferredMount>
            </div>
          </div>
        </div>

        <DeferredMount fallback={<SectionSkeleton className="h-28 w-full" />}>
          <ContactFooter />
        </DeferredMount>
      </div>
    </div>
  );
}
