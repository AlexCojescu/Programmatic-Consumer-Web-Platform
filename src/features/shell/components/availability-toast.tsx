// components/AvailabilityToast.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { AvailabilityToastShell } from '@/components/layouts/availability-toast-shell';
import { AvailabilityLiveDot } from '@/components/ui/availability-live-dot';

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
    <AvailabilityToastShell isVisible={isVisible}>
      {/* Enhanced live indicator with glow effect */}
      <AvailabilityLiveDot />

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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all duration-200 active:translate-y-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Inquire About a Slot
          </a>
          
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="text-xs text-gray-600 hover:text-gray-800 font-medium transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Maybe later
          </button>
        </div>
      </div>

      {/* Enhanced close button with better hover states[140] */}
      <div className="flex-shrink-0 -mt-1 -mr-1">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-gray-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-1 transition-all duration-200 group"
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
    </AvailabilityToastShell>
  );
};

export default AvailabilityToast;
