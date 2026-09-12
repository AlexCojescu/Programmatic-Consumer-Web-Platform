"use client";

import React, { useMemo, Suspense } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  Variants,
  Transition,
} from "motion/react";
import dynamic from "next/dynamic";
import ServicesHeader from "@/features/services/components/services-header";
import HowWeHelp from "@/features/services/components/how-we-help";
import ServiceTimeline from "@/features/services/components/service-timeline";
import SFAQ from "@/features/services/components/sfaq";
import { FadedGridBackground } from "@/shared/ui/faded-grid-background";

const WebDev = dynamic(
  () => import("@/features/services/components/web-dev"),
  {
    loading: () => (
      <div className="h-36 rounded-lg bg-white/20 backdrop-blur-sm animate-pulse" />
    ),
  }
);

const sectionVariants: Variants = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
};

const belowFoldVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
};

const sectionTransition: Transition = {
  duration: 0.45,
  ease: "easeOut",
};

type FadeInSectionProps = React.PropsWithChildren<{
  className?: string;
  id?: string;
  aboveFold?: boolean;
}>;

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className,
  id,
  aboveFold = false,
}) => {
  const viewport = useMemo(() => ({ once: true, amount: 0.15 }), []);

  return (
    <m.section
      id={id}
      className={className}
      variants={aboveFold ? sectionVariants : belowFoldVariants}
      initial={aboveFold ? false : "initial"}
      whileInView="whileInView"
      viewport={viewport}
      transition={sectionTransition}
    >
      {children}
    </m.section>
  );
};

export default function ServicesPageView() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen text-gray-800">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
        <FadedGridBackground />

        <FadeInSection aboveFold>
          <ServicesHeader />
        </FadeInSection>

        <main className="relative pt-32 sm:pt-40 pb-20 sm:pb-24">
          <div className="space-y-20 sm:space-y-24">
            <FadeInSection id="web-development" className="space-y-16">
              <Suspense
                fallback={
                  <div className="h-36 rounded-lg bg-white/20 backdrop-blur-sm animate-pulse" />
                }
              >
                <FadeInSection>
                  <HowWeHelp />
                </FadeInSection>

                <FadeInSection>
                  <ServiceTimeline />
                </FadeInSection>

                <FadeInSection>
                  <WebDev />
                </FadeInSection>

                <FadeInSection>
                  <SFAQ />
                </FadeInSection>
              </Suspense>
            </FadeInSection>
          </div>
        </main>
      </div>
    </LazyMotion>
  );
}
