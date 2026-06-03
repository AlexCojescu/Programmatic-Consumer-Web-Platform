"use client";

import React, { useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  Transition,
  Variants,
} from "motion/react";
import Navbar from "@/components/features/Navbar";
import AboutHeader from "@/components/features/aboutuspage/AboutHeader";
import AboutHub from "@/components/features/aboutuspage/AboutHub";

// Animation variants
const fadeInVariants: Variants = {
  initial: { opacity: 0 },
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

export default function Page() {
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
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />

        {/* Navbar renders immediately without animation for smooth navigation */}
        <Navbar />

        {/* Hero block: AboutHeader + AboutHub fade in */}
        <m.header
          className="relative"
          variants={memoizedAnimations.fadeIn.variants}
          initial="initial"
          animate="animate"
          transition={{ ...memoizedAnimations.fadeIn.transition, delay: 0.1 }}
        >
          <AboutHeader />

          <m.div
            variants={memoizedAnimations.fadeIn.variants}
            initial="initial"
            animate="animate"
            transition={{ ...memoizedAnimations.fadeIn.transition, delay: 0.2 }}
          >
            <AboutHub />
          </m.div>
        </m.header>

        <main>
          {/* Placeholder future section with slide-up on scroll */}
          <m.section
            variants={memoizedAnimations.slideUp.variants}
            initial="initial"
            whileInView="whileInView"
            viewport={memoizedAnimations.slideUp.viewport}
            transition={{ ...memoizedAnimations.slideUp.transition, delay: 0.1 }}
          >
            {/* Add any new sections here (e.g., AboutBody) */}
          </m.section>
        </main>
      </div>
    </LazyMotion>
  );
}
