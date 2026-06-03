"use client";

import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from "@/components/features/Navbar";
import PricingOneLinerHero from '@/components/features/pricespages/PricingOneLinerHero';
import OperationalAudit from '@/components/features/pricespages/OperationalAudit';
import TieredArchitecture from '@/components/features/pricespages/TSA';
import ComplexityMatrix from '@/components/features/pricespages/ComplexityMatrix';
import InvestmentPaths from '@/components/features/pricespages/InvestmentPaths';
import PartnerProgram from '@/components/features/pricespages/PartnerProgram';
import FadedGridBackground from "@/components/ui/FadedGridBackground";

// Dynamically import pricing sections to reduce initial bundle size
const WebDevPricingSection = dynamic(() => import("@/components/features/pricespages/WebDevPricingSection"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm h-96 rounded-lg" />
});

const AutomationPricingSection = dynamic(() => import("@/components/features/pricespages/AutomationPricingSection"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm h-96 rounded-lg" />
});

const AiContentPricingSection = dynamic(() => import("@/components/features/pricespages/AIContentPricingSection"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm h-96 rounded-lg" />
});

const LeadGenPricingSection = dynamic(() => import("@/components/features/pricespages/LeadGenPricingSection"), {
  loading: () => <div className="animate-pulse bg-white/20 backdrop-blur-sm h-96 rounded-lg" />
});

// Memoized Arrow SVG component to prevent unnecessary re-renders
const ArrowIcon = React.memo(({ direction = 'left' }: { direction?: 'left' | 'right' }) => (
  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
    />
  </svg>
));

ArrowIcon.displayName = 'ArrowIcon';

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoized sections array to prevent recreation on every render
  const sections = useMemo(() => [
    { title: "Web Development", component: <WebDevPricingSection /> },
    { title: "Automation", component: <AutomationPricingSection /> },
    { title: "Lead Generation", component: <LeadGenPricingSection /> },
    { title: "AI Content", component: <AiContentPricingSection /> }
  ], []);

  // Memoized navigation functions to prevent recreation
  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sections.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, sections.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === sections.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, sections.length]);

  // Memoized slide navigation function
  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }, []);

  return (
    <>      
      <div className="relative min-h-screen">
        {/* EXACT same gradient as your other pages */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
        <FadedGridBackground />
        
        <Navbar />
        {/* Pricing Header Section with top spacing matching Services page header */}
        <div className="pt-16 sm:pt-20 lg:pt-24 xl:pt-32">
          <PricingOneLinerHero />
          <OperationalAudit />
          <TieredArchitecture />
          <ComplexityMatrix />
          <InvestmentPaths />
          <PartnerProgram />
        </div>
        
      </div>
    </>
  );
}
