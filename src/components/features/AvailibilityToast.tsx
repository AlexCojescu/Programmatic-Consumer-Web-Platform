// components/AvailabilityToast.tsx
'use client';

import React, { useState, useEffect } from 'react';

const AvailabilityToast = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Delayed appearance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, []);

  // Dynamic quarter calculation
  const getCurrentQuarter = () => {
    const month = new Date().getMonth();
    if (month < 3) return 'Q2';
    if (month < 6) return 'Q3';
    if (month < 9) return 'Q4';
    return 'Q1';
  };

  const nextQuarter = getCurrentQuarter();

  if (!isVisible) {
    return null;
  }

  return (
    // Bottom-left toast placement
    <div
      className={`fixed bottom-5 left-5 z-40 w-full max-w-sm transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'
      }`}
      role="alert"
      aria-live="polite"
      aria-label="Project availability notification"
    >
      {/* Premium white theme with enhanced shadows and gradients[140][155] */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/[0.08] backdrop-blur-sm border border-gray-100/80">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-gray-50/30 pointer-events-none"></div>
        
        {/* Main content container with proper spacing[147][152] */}
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            
            {/* Enhanced live indicator with glow effect */}
            <div className="flex-shrink-0 pt-0.5">
              <div className="relative">
                <span className="flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-sm ring-2 ring-white"></span>
                </span>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm scale-150 animate-pulse"></div>
              </div>
            </div>

            {/* Content section with refined typography */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Project Slot Availability
                </h3>
                <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/60">
                  Limited
                </div>
              </div>
              
              <p className="text-sm leading-relaxed text-gray-700 mb-4">
                Project planning for <span className="font-semibold text-gray-900">{nextQuarter}</span> is closing soon. 
                To maintain quality, we are accepting <span className="inline-flex items-center px-1.5 py-0.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded border border-blue-200/60">2</span> more clients for this period.
              </p>

              {/* Enhanced action button with hover effects[155] */}
              <div className="flex items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-900/20 focus:ring-offset-2 transition-all duration-200 active:translate-y-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Inquire About a Slot
                </a>
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors duration-150"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* Enhanced close button with better hover states[140] */}
            <div className="flex-shrink-0 -mt-1 -mr-1">
              <button
                onClick={() => setIsVisible(false)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:ring-offset-1 transition-all duration-200 group"
                aria-label="Dismiss notification"
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-150"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle bottom accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default AvailabilityToast;
