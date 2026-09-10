import React from 'react';
import { GlassPricingFrame } from '@/components/layouts/glass-pricing-frame';
import { PricingSectionHeader } from '@/components/ui/pricing-section-header';
import {
  PricingTierCard,
  type PricingTierCardProps,
} from '@/components/ui/pricing-tier-card';
import { PricingProcessSteps } from '@/components/ui/pricing-process-steps';

const PRICING_TIERS: PricingTierCardProps[] = [
  {
    name: 'Brand Foundations',
    description: 'The foundational assets for any new venture.',
    price: '$1,500+',
    priceNote: 'One-time project fee.',
    priceClassName: 'text-4xl font-bold text-purple-600 mb-2',
    features: [
      'Logo design & brand identity',
      'Color palette & typography',
      'Brand guidelines document',
      'Basic marketing materials',
      '2 rounds of revisions',
    ],
  },
  {
    name: 'Campaign Launch',
    description: 'A complete asset package for a product launch or marketing push.',
    price: '$4,000+',
    priceNote: 'One-time project fee.',
    priceClassName: 'text-4xl font-bold text-purple-600 mb-2',
    features: [
      'Everything in Brand Foundations',
      'Social media content suite',
      'Email marketing templates',
      'Website graphics & banners',
      'Video/motion graphics',
      'Content calendar template',
    ],
    popularBadgeClassName:
      'inline-flex items-center rounded-full bg-purple-100/50 px-3 py-1 text-xs font-semibold text-purple-800 mb-4',
  },
  {
    name: 'Content Scaling',
    description: 'A continuous flow of content for scaling brands.',
    price: 'Custom/mo',
    priceNote: 'Monthly retainer for ongoing creative work.',
    priceClassName: 'text-4xl font-bold text-purple-600 mb-2',
    features: [
      'Ongoing content production',
      'Multi-platform optimization',
      'A/B testing & optimization',
      'Performance analytics',
      'Priority support',
      'Custom workflows',
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Brand Discovery",
    description: "We start by deeply understanding your brand, audience, and campaign goals."
  },
  {
    step: "2",
    title: "AI Instruction",
    description: "We translate your vision into precise, expert-level instructions for generative AI models."
  },
  {
    step: "3",
    title: "Generate & Refine",
    description: "We generate a wealth of options, then select and refine the very best to match your vision."
  },
  {
    step: "4",
    title: "Deliver Assets",
    description: "You receive a complete, cohesive package of brand assets, ready for deployment."
  }
];

const AiContentPricingSection = () => {
  return (
    <GlassPricingFrame>
      {/* Header Section */}
      <PricingSectionHeader
        badgeClassName="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm mb-6"
        dotClassName="mr-2 h-2 w-2 rounded-full bg-purple-500 animate-pulse"
        badgeLabel="AI Content Creation"
        headingPrefix="AI-Powered"
        gradientClassName="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        gradientText="Content Creation"
        description="We leverage a suite of advanced generative AI tools to produce a complete, cohesive package of brand assets at unparalleled speed and quality."
      />

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {PRICING_TIERS.map((tier, index) => (
          <PricingTierCard key={index} {...tier} />
        ))}
      </div>

      {/* Process Section */}
      <PricingProcessSteps
        title="Our AI Content Process"
        subtitle="From concept to creation in four strategic steps"
        steps={PROCESS_STEPS}
        stepCircleClassName="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
      />
    </GlassPricingFrame>
  );
};

export default AiContentPricingSection;
