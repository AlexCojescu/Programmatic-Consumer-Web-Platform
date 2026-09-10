import React from 'react';
import { GlassPricingFrame } from '@/features/pricing/components/glass-pricing-frame';
import { PricingSectionHeader } from '@/features/pricing/components/pricing-section-header';
import { PricingTechStack } from '@/features/pricing/components/pricing-tech-stack';
import {
  PricingTierCard,
  type PricingTierCardProps,
} from '@/features/pricing/components/pricing-tier-card';
import { PricingProcessSteps } from '@/features/pricing/components/pricing-process-steps';

const TECH_LOGOS = [
  { src: '/Apollo.webp', alt: 'Apollo' },
];

const PRICING_TIERS: PricingTierCardProps[] = [
  {
    name: 'Custom List',
    description: 'A one-time, custom-built list of ideal clients.',
    price: '$1,500+',
    priceNote: 'One-time fee. Based on list size & complexity.',
    priceClassName: 'text-4xl font-bold text-green-600 mb-2',
    features: [
      'ICP development & targeting',
      'Data sourcing & verification',
      'Contact information enrichment',
      'Deliverability optimization',
      'CSV export & documentation',
    ],
  },
  {
    name: 'Complete System',
    description: 'Your complete lead generation & outreach setup.',
    price: (
      <>
        $3,500<span className="text-lg">/mo</span>
      </>
    ),
    priceNote: 'Monthly retainer for leads and campaign management.',
    priceClassName: 'text-4xl font-bold text-green-600 mb-2',
    features: [
      'Everything in Custom List',
      'Email sequence development',
      'Campaign setup & management',
      'A/B testing & optimization',
      'Performance tracking & reporting',
      'Monthly strategy calls',
    ],
    popularBadgeClassName:
      'inline-flex items-center rounded-full bg-green-100/50 px-3 py-1 text-xs font-semibold text-green-800 mb-4',
  },
  {
    name: 'Enterprise Pipeline',
    description: 'A fully managed, data-driven sales pipeline.',
    price: (
      <>
        Custom<span className="text-lg">/mo</span>
      </>
    ),
    priceNote: 'For teams focused on aggressive, predictable growth.',
    priceClassName: 'text-4xl font-bold text-green-600 mb-2',
    features: [
      'Multi-channel outreach',
      'Advanced segmentation',
      'Sales team integration',
      'Custom CRM setup',
      'Dedicated account manager',
      'Weekly optimization',
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Target Identification",
    description: "We pinpoint your Ideal Customer Profile and key value proposition."
  },
  {
    step: "2",
    title: "Data Collection",
    description: "We use our tech stack to find and enrich data on decision-makers."
  },
  {
    step: "3",
    title: "Verification",
    description: "Every single email is verified to ensure maximum deliverability."
  },
  {
    step: "4",
    title: "Delivery & Launch",
    description: "We deliver the list or launch the outreach campaign to start conversations."
  }
];

const LeadGenPricingSection = () => {
  return (
    <GlassPricingFrame>
      {/* Header Section */}
      <PricingSectionHeader
        badgeClassName="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-green-700 shadow-sm mb-6"
        dotClassName="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"
        badgeLabel="Lead Generation"
        headingPrefix="Precision"
        gradientClassName="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
        gradientText="Lead Generation"
        description="We bypass the guesswork by building hyper-targeted lists of verified decision-makers, ready for you to engage."
      />

      {/* Tech Stack */}
      <PricingTechStack title="Our Tech Stack" logos={TECH_LOGOS} />

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {PRICING_TIERS.map((tier, index) => (
          <PricingTierCard key={index} {...tier} />
        ))}
      </div>

      {/* Process Section */}
      <PricingProcessSteps
        title="Our Lead Generation Process"
        subtitle="From targeting to delivery in four strategic steps"
        steps={PROCESS_STEPS}
        stepCircleClassName="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
      />
    </GlassPricingFrame>
  );
};

export default LeadGenPricingSection;
