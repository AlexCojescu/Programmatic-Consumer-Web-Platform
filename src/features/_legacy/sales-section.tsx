import React from 'react';
import { SalesFeatureItem } from '@/features/_legacy/sales-feature-item';

const SALES_FEATURES = [
  {
    title: "Trailblazing AI:",
    body: "Leverage advanced machine learning models to transform businesses communication.",
  },
  {
    title: "Backed by Humans:",
    body: "Texts are constantly monitored by human concierges to ensure authenticity and train our advanced AI.",
  },
  {
    title: "Two-Way Texting:",
    body: "Engage in powerful conversations on the world's #1 communication channel.",
  },
];

const SalesSection: React.FC = () => {
  return (
    <section className="bg-transparent py-16 px-6">
      <div className="max-w-4xl text-left">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
          Drive 90% more sales-ready
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>opportunities to your team
        </h2>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 max-w-3xl leading-relaxed">
          Verse&apos;s human-backed AI automatically engages, qualifies, {/* CORRECTED LINE */}
          and books appointments with leads to help you turn more 
          prospects into customers.
        </p>
        
        {/* Features List */}
        <div className="space-y-4 md:space-y-6 max-w-2xl">
          {SALES_FEATURES.map((feature) => (
            <SalesFeatureItem
              key={feature.title}
              title={feature.title}
              body={feature.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesSection;
