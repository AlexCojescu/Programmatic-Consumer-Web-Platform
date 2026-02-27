"use client";

import React, { useMemo, Suspense } from "react";
import { LazyMotion, domAnimation, m, Variants, Transition } from "motion/react";
import dynamic from "next/dynamic";

import Navbar from "@/components/features/Navbar";
import ServicesHeader from "@/components/features/servicepage/ServicesHeader";
import HowWeHelp from "@/components/features/servicepage/HowWeHelp";
import ServiceTimeline from "@/components/features/servicepage/ServiceTimeline";
import SFAQ from "@/components/features/servicepage/SFAQ";
import FadedGridBackground from "@/components/ui/FadedGridBackground";

const WebDev = dynamic(
  () => import("@/components/features/servicepage/WebDev"),
  {
    loading: () => (
      <div className="h-36 rounded-lg bg-white/20 backdrop-blur-sm animate-pulse" />
    ),
    ssr: true,
  }
);

const ChatbotWidget = dynamic(
  () => import("../../components/chatbotui/chat-widget/page"),
  {
    loading: () => (
      <div className="h-12 w-32 rounded-lg bg-blue-100/30 backdrop-blur-sm animate-pulse" />
    ),
    ssr: false,
  }
);

// Shared fade-in variants
const sectionVariants: Variants = {
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
}>;

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className,
  id,
}) => {
  const viewport = useMemo(
    () => ({ once: true, amount: 0.15 }),
    []
  );

  return (
    <m.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={viewport}
      transition={sectionTransition}
    >
      {children}
    </m.section>
  );
};


export default function Page() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen text-gray-800">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
        <FadedGridBackground />

        {/* Navbar - rendered immediately for smooth navigation */}
        <div className="sticky top-0 z-30 bg-transparent">
          <Navbar />
        </div>

        {/* Hero / services header fade-in */}
        <FadeInSection>
          <ServicesHeader />
        </FadeInSection>

        <main className="relative pt-32 sm:pt-40 pb-20 sm:pb-24">
          <div className="space-y-20 sm:space-y-24">
            {/* Main services content block fade-in */}
            <FadeInSection id="web-development" className="space-y-16">
  <Suspense fallback={<div className="h-36 rounded-lg bg-white/20 backdrop-blur-sm animate-pulse" />}>
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

          {/* Chatbot fade-in */}
          <FadeInSection className="mt-20 flex justify-center">
            <Suspense
              fallback={
                <div className="h-12 w-32 rounded-lg bg-blue-100/30 backdrop-blur-sm animate-pulse" />
              }
            >
              <ChatbotWidget />
            </Suspense>
          </FadeInSection>
        </main>
      </div>
    </LazyMotion>
  );
}
