'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import CalendlyWidget from "@/components/features/homepage/CalendlyWidget";
import HeroSection from "@/components/features/homepage/HeroSection";
import Navbar from "@/components/features/Navbar";
import ProcessSection from "@/components/features/homepage/ProcessSection";
import QuoteSection from "@/components/features/homepage/QuoteSection";
import ServiceFilter from "@/components/features/homepage/Service-filter";
import { Separator } from "@/components/features/Seperator";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Contactme from "@/components/features/contactme";
import SalesOverview from '@/components/ui/line-chart';
import ChatbotWidget from "../components/chatbotui/chat-widget/page";


// Custom hook for fade-in animation on scroll
function useFadeInOnScroll(threshold = 0.1, rootMargin = '0px 0px -50px 0px') {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Stop observing after the first intersection
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold,
        rootMargin 
      }
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


// Reusable FadeInSection component
interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
}

function FadeInSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: FadeInSectionProps) {
  const { elementRef, isVisible } = useFadeInOnScroll(threshold, rootMargin);

  const getTransformClass = () => {
    switch (direction) {
      case 'up': return 'translate-y-8';
      case 'down': return '-translate-y-8';
      case 'left': return 'translate-x-8';
      case 'right': return '-translate-x-8';
      default: return 'translate-y-8';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
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
      
      {/* Main content container that scrolls OVER the hero */}
      <div className="relative z-10 bg-white">
        {/* Original grid container - this should fade in first */}
       
          <div className="relative grid lg:grid-cols-2 gap-0 min-h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />

            <div className="flex items-center justify-center p-4 lg:p-8">
              <div className="w-full max-w-4xl lg:-mr-20">
                <ProcessSection />
              </div>
            </div>
            <div
              id="contact-me"
              className="flex items-center justify-center p-4 lg:p-8"
            > 
              <div className="w-full max-w-xl lg:-ml-20">
                <SalesOverview />
              </div>
            </div>
          </div>
     

        {/* Quote Section */}

          <QuoteSection />
     
        
        <div className="py-6" />

        {/* Service Filter Component */}
        <FadeInSection delay={300} direction="up" threshold={0.2}>
          <ServiceFilter />
        </FadeInSection>

        {/* Separator */}
        <FadeInSection delay={100} threshold={0.4}>
          <Separator />
        </FadeInSection>

        {/* Contact Section */}
        <FadeInSection delay={200} threshold={0.2}>
          <div className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Centered Title */}
              <div className="text-center mb-12">
                <TypingAnimation
                  as="h2"
                  className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                  startOnView={true}
                  delay={200}
                  duration={50}
                >
                  Book Your Free Consultation
                </TypingAnimation>
              </div>

              {/* Flexible Layout for Contact and Calendly */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Calendly Widget Container */}
                <FadeInSection delay={400} direction="left" threshold={0.3}>
                  <div className="w-full">
                    <div className="max-w-xl mx-auto">
                      <CalendlyWidget />
                    </div>
                  </div>
                </FadeInSection>

                {/* Contact Me Container */}
                <FadeInSection delay={600} direction="right" threshold={0.3}>
                  <div className="w-full">
                    <div className="max-w-xl mx-auto">
                      <Contactme />
                 
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>

      <ChatbotWidget />
    </div>
  );
}
