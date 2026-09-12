"use client";

import React, { useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  Transition,
  Variants,
} from "motion/react";
import AboutHeader from "@/features/about/components/about-header";
import AboutHub from "@/features/about/components/about-hub";

const fadeInVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
};

const fadeInTransition: Transition = {
  duration: 0.5,
  ease: "easeOut",
};

const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
};

const slideUpTransition: Transition = {
  duration: 0.4,
  ease: "easeOut",
  delay: 0.05,
};

export default function AboutPageView() {
  const memoizedAnimations = useMemo(
    () => ({
      fadeIn: {
        variants: fadeInVariants,
        transition: fadeInTransition,
      },
      slideUp: {
        variants: slideUpVariants,
        viewport: { once: true, amount: 0.2 },
        transition: slideUpTransition,
      },
    }),
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen text-gray-800">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />

        <m.header
          className="relative"
          variants={memoizedAnimations.fadeIn.variants}
          initial={false}
          animate="animate"
          transition={{ ...memoizedAnimations.fadeIn.transition, delay: 0 }}
        >
          <AboutHeader />

          <m.div
            variants={memoizedAnimations.slideUp.variants}
            initial="initial"
            whileInView="whileInView"
            viewport={memoizedAnimations.slideUp.viewport}
            transition={memoizedAnimations.slideUp.transition}
          >
            <AboutHub />
          </m.div>
        </m.header>
      </div>
    </LazyMotion>
  );
}
