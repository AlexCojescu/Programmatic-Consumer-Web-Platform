import React from 'react';
import {
  PricingPlanCard,
  type PricingPlanCardProps,
} from '@/features/pricing/components/pricing-plan-card';

const PLANS: PricingPlanCardProps[] = [
  {
    title: 'Digital Presence & Architecture',
    description: 'Build a powerful, scalable foundation for your business.',
    priceBlock: (
      <>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          Custom Quote
        </p>
        <p className="text-sm sm:text-base text-gray-500 font-medium">One-Time Project</p>
      </>
    ),
    features: [
      'Core Asset Construction',
      'Scalable Website Foundation',
      'Responsive Cross-Platform Design',
      'Optimized for Conversion',
    ],
    ctaHref: '#contact-me',
    ctaLabel: 'Schedule a Free Discovery Call',
  },
  {
    title: 'Intent-Driven Lead Generation',
    description: 'Engage active buyers and shorten your sales cycle.',
    priceBlock: (
      <>
        <p className="text-sm sm:text-base text-gray-500 font-medium mb-1">Monthly Retainer</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          Starting at $1,500<span className="text-base sm:text-lg lg:text-xl font-medium text-gray-500">/mo</span>
        </p>
      </>
    ),
    features: [
      'Active Buyer Identification',
      'High-Intent Contact Lists',
      'Reduced Sales Cycles',
      'Actionable Search Intelligence',
    ],
    ctaHref: '#contact-me',
    ctaLabel: 'Schedule a Free Discovery Call',
  },
  {
    title: 'Marketing & Systems Automation',
    description: 'Systematize operations to expand capacity and accuracy.',
    priceBlock: (
      <>
        <p className="text-sm sm:text-base text-gray-500 font-medium mb-1">Monthly Retainer</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          Starting at $1,200<span className="text-base sm:text-lg lg:text-xl font-medium text-gray-500">/mo</span>
        </p>
      </>
    ),
    features: [
      'Systematic Campaign Execution',
      'Unified Data Systems (CRM, etc.)',
      'Manual Process Eradication',
      'Resource & Accuracy Gains',
    ],
    ctaHref: '#contact-me',
    ctaLabel: 'Schedule a Free Discovery Call',
  },
  {
    title: 'Strategic Content Deployment',
    description: 'Command authority with content that converts.',
    priceBlock: (
      <>
        <p className="text-sm sm:text-base text-gray-500 font-medium mb-1">Monthly Retainer</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          Starting at $1,800<span className="text-base sm:text-lg lg:text-xl font-medium text-gray-500">/mo</span>
        </p>
      </>
    ),
    features: [
      'Calculated Content Strategy',
      'Search-Intent Focused Articles',
      'Establish Market Leadership',
      'Full-Funnel Content Structure',
    ],
    ctaHref: '#contact-me',
    ctaLabel: 'Schedule a Free Discovery Call',
  },
];

const PricingSection = () => {
  return (
    <div className="my-6 sm:my-8 lg:my-16">
      <section className="bg-white py-6 sm:py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Main Heading and Subheading */}
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">
              Custom Solutions to Grow Your Business
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2 sm:px-0">
              Let&apos;s work together to build the perfect AI-powered solution for your needs.
            </p>
          </div>

          {/* NEW: Early Adopter / Portfolio-Building Section */}
          <div className="max-w-3xl mx-auto bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center mb-8 sm:mb-12 lg:mb-16">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 leading-tight">
              Now Accepting New Portfolio Clients!
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              As I build my portfolio, I&apos;m offering my first few clients foundational pricing. This is a unique opportunity to get dedicated service and cutting-edge solutions at an exceptional value. Let&apos;s connect!
            </p>
          </div>

          {/* Pricing Grid - 1 column on mobile, 2 columns on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {PLANS.map((plan, index) => (
              <PricingPlanCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;
