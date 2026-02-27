"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import CalendlyWidget from "@/components/features/homepage/CalendlyWidget";
import HeroSection from "@/components/features/homepage/HeroSection";
import Navbar from "@/components/features/Navbar";
import QuoteSection from "@/components/features/homepage/QuoteSection";
import ServiceFilter from "@/components/features/homepage/Service-filter";
import ChatbotWidget from "../components/chatbotui/chat-widget/page";
import Header from "@/components/features/homepage/ProcessSection"; // path to the section above
import FadedGridBackground from "@/components/ui/FadedGridBackground";
import ContactHeader from "@/components/features/ContactHeader";
import ContactFormMain from "@/components/features/contactmemain";
import ContactFooter from "@/components/features/ContactFooter";


// Custom hook for fade-in animation on scroll
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
{
threshold,
rootMargin,
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

{/* Quote Section */}
<QuoteSection />


      {/* Main content container that scrolls OVER the hero */}
      <div className="relative z-10 overflow-hidden bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]">
      <FadedGridBackground />
      {/* Systems Integration & Operations Engineering section */}
      <section className="relative py-16 lg:py-24">
      {/* Full-width gradient background, just like hero */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
      
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <Header />
      </div>
      </section>
      
      {/* Service Filter Component */}
      <FadeInSection delay={300} direction="up" threshold={0.2}>
      <ServiceFilter />
      </FadeInSection>

<ContactHeader />

{/* Main content container */}
<div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-0 px-16 lg:px-32 xl:px-48 2xl:px-64">
  {/* Contact Form */}
  {/* To adjust vertical alignment: Change items-center to items-start (top) or items-end (bottom) */}
  {/* To adjust vertical padding: Change py-4 lg:py-6 (e.g., py-6 lg:py-8 for more, py-2 lg:py-4 for less) */}
  <div className="flex items-center justify-center py-4 lg:py-6 lg:pr-1">
    <div className="w-full max-w-none">
      <ContactFormMain />
    </div>
  </div>
  {/* Calendar Widget */}
  {/* To adjust vertical alignment: Change items-center to items-start (top) or items-end (bottom) */}
  {/* To adjust vertical padding: Change py-4 lg:py-6 (e.g., py-6 lg:py-8 for more, py-2 lg:py-4 for less) */}
  {/* To adjust Calendly height: Edit h-[850px] in CalendlyWidget.tsx component */}
  <div
    id="contact-me"
    className="flex items-center justify-center py-4 lg:py-6 lg:pl-1"
  >
    <div className="w-full">
      <CalendlyWidget />
      </div>
        
        </div>
      
    </div>
    <ContactFooter />
     </div>
     <ChatbotWidget />
     </div>
     
);
}