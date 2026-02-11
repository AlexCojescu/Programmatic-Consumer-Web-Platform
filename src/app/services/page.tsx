'use client';

import React, { useMemo, Suspense } from 'react';
import { LazyMotion, domAnimation, m, Transition, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';

// Component Imports - Optimized with dynamic imports for non-critical components
import Navbar from "@/components/features/Navbar";
import ServicesHeader from '@/components/features/servicepage/ServicesHeader';

// Lazy-loaded components for better initial page load performance
const LeadGen = dynamic(() => import("@/components/features/servicepage/LeadGen"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-32" />,
  ssr: true
});

const TechStackSection = dynamic(() => import("@/components/features/servicepage/TechStackSection"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-40" />,
  ssr: true
});

const AutomationSection = dynamic(() => import("@/components/features/servicepage/AutomationSection"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-32" />,
  ssr: true
});

const WebDev = dynamic(() => import("@/components/features/servicepage/WebDev"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-36" />,
  ssr: true
});

const ChatbotWidget = dynamic(() => import("../../components/chatbotui/chat-widget/page"), {
  loading: () => <div className="animate-pulse bg-blue-100/30 backdrop-blur-sm rounded-lg h-12 w-32" />,
  ssr: false // Chatbot doesn't need SSR
});


// Type-safe animation variants
const sectionVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  whileInView: { 
    opacity: 1, 
    y: 0 
  }
};

const sectionTransition: Transition = {
  duration: 0.5,
  ease: "easeOut"
};

// --- Main Page Component ---
export default function Page() {

  const memoizedAnimations = useMemo(() => ({
    section: {
      variants: sectionVariants,
      viewport: { once: true, amount: 0.15 },
      transition: sectionTransition
    }
  }), []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen text-gray-800">
        {/* Exact background gradient matching your main page */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
        
        <Navbar />

        <ServicesHeader />

        <main className="relative py-20 sm:py-24">
          <div className="px-6 space-y-20 sm:space-y-24">

            {/* Web Development Section */}
            <m.section 
              id="web-development"
              variants={memoizedAnimations.section.variants}
              initial="initial"
              whileInView="whileInView"
              viewport={memoizedAnimations.section.viewport}
              transition={memoizedAnimations.section.transition}
              className="p-8"
            >
              <Suspense fallback={<div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-36" />}>
                <WebDev />
              </Suspense>
            </m.section>

            {/* Lead Generation Section */}
            <m.section 
              id="lead-generation"
              variants={memoizedAnimations.section.variants}
              initial="initial"
              whileInView="whileInView"
              viewport={memoizedAnimations.section.viewport}
              transition={{...memoizedAnimations.section.transition, delay: 0.1}}
              className="p-8"
            >
              <Suspense fallback={<div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-32 mb-8" />}>
                <LeadGen />
              </Suspense>
              
              <div className="mt-12">
                <Suspense fallback={<div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-40" />}>
                  <TechStackSection />
                </Suspense>
              </div>
            </m.section>

            {/* Automation Section */}
            <m.section 
              id="automation"
              variants={memoizedAnimations.section.variants}
              initial="initial"
              whileInView="whileInView"
              viewport={memoizedAnimations.section.viewport}
              transition={{...memoizedAnimations.section.transition, delay: 0.2}}
              className="p-8"
            >
              <Suspense fallback={<div className="animate-pulse bg-white/20 backdrop-blur-sm rounded-lg h-32" />}>
                <AutomationSection />
              </Suspense>
            </m.section>

          </div>

          <div className="mt-20 flex justify-center">
            <Suspense fallback={<div className="animate-pulse bg-blue-100/30 backdrop-blur-sm rounded-lg h-12 w-32" />}>
              <ChatbotWidget />
            </Suspense>
          </div>
        </main>
      </div>
    </LazyMotion>
  );
}