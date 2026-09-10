import React from 'react';
import { GlassPricingFrame } from '@/features/pricing/components/glass-pricing-frame';
import { PricingSectionHeader } from '@/features/pricing/components/pricing-section-header';
import { PricingTechStack } from '@/features/pricing/components/pricing-tech-stack';
import {
  PricingTierCard,
  type PricingTierCardProps,
} from '@/features/pricing/components/pricing-tier-card';
import { PricingCtaPanel } from '@/features/pricing/components/pricing-cta-panel';

const TECH_LOGOS = [
  { src: '/zapier.webp', alt: 'Zapier' },
  { src: '/make.webp', alt: 'Make' },
];

const PRICING_TIERS: PricingTierCardProps[] = [
  {
    name: 'Single Workflow',
    description: 'For specific, high-impact tasks.',
    price: '$950',
    priceNote: 'One-time fee per automated workflow.',
    priceClassName: 'text-4xl font-bold text-orange-600 mb-2',
    features: [
      'Custom workflow design',
      'Implementation & testing',
      'Documentation & training',
      '30-day support included',
      'One revision cycle',
    ],
  },
  {
    name: 'System Integration',
    description: 'Connect your entire sales or marketing stack.',
    price: '$2,500+',
    priceNote: 'One-time project fee. Varies by complexity.',
    priceClassName: 'text-4xl font-bold text-orange-600 mb-2',
    features: [
      'Multi-platform integration',
      'Data synchronization',
      'Advanced workflow logic',
      'Error handling & monitoring',
      '90-day support included',
      'Unlimited revisions',
    ],
    popularBadgeClassName:
      'inline-flex items-center rounded-full bg-orange-100/50 px-3 py-1 text-xs font-semibold text-orange-800 mb-4',
  },
  {
    name: 'Ongoing Support',
    description: 'Ongoing support and new automations.',
    price: 'Custom',
    priceNote: 'Monthly retainer for continuous improvement.',
    priceClassName: 'text-4xl font-bold text-orange-600 mb-2',
    features: [
      'Monthly optimization',
      'New workflow development',
      'Performance monitoring',
      'Priority support access',
      'Quarterly strategy calls',
      'Custom reporting',
    ],
  },
];

const AutomationPricingSection = () => {
  return (
    <GlassPricingFrame>
      {/* Header Section */}
      <PricingSectionHeader
        badgeClassName="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm mb-6"
        dotClassName="mr-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse"
        badgeLabel="Business Automation"
        headingPrefix="Intelligent"
        gradientClassName="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        gradientText="Automation Systems"
        description="We eradicate manual, error-prone tasks by building robust automation systems, allowing your team to focus on what matters most."
      />

      {/* Tech Stack */}
      <PricingTechStack title="Powered By" logos={TECH_LOGOS} />

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {PRICING_TIERS.map((tier, index) => (
          <PricingTierCard key={index} {...tier} />
        ))}
      </div>

      {/* CTA Section */}
      <PricingCtaPanel
        title="Web Development + Automation"
        bodyClassName="text-gray-600 text-lg mb-8 max-w-3xl mx-auto"
        body="Our core strength lies in combining high-performance web development with intelligent automation. We can build your website and its underlying operational systems as one cohesive project."
        buttonClassName="bg-orange-800 hover:bg-orange-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
        buttonLabel="Schedule a Unified Strategy Call"
      />
    </GlassPricingFrame>
  );
};

export default AutomationPricingSection;
