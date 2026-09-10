import React from 'react';
import { GlassPricingFrame } from '@/features/pricing/components/glass-pricing-frame';
import { PricingSectionHeader } from '@/features/pricing/components/pricing-section-header';
import { PricingFeatureItem } from '@/features/pricing/components/pricing-feature-list';
import {
  RetainerPlanCard,
  type RetainerPlanCardProps,
} from '@/features/pricing/components/retainer-plan-card';
import { PricingCtaPanel } from '@/features/pricing/components/pricing-cta-panel';

const PROJECT_FEATURES = [
  'Custom website development',
  'Mobile-responsive design',
  'SEO optimization',
  'Performance optimization',
  'Content management system',
  'Analytics integration',
];

const RETAINER_PLANS: RetainerPlanCardProps[] = [
  {
    name: 'Peace of Mind & Support',
    price: (
      <>
        $500<span className="text-lg">/mo</span>
      </>
    ),
    features: [
      'Website maintenance & updates',
      'Security monitoring',
      'Backup & recovery',
      'Technical support',
      'Monthly performance reports',
    ],
  },
  {
    name: 'Proactive Content & Leads',
    price: (
      <>
        $1,800<span className="text-lg">/mo</span>
      </>
    ),
    features: [
      'Everything in basic support',
      'Content creation & publishing',
      'SEO optimization',
      'Lead generation setup',
      'Email marketing automation',
      'Monthly strategy calls',
    ],
    popularBadgeClassName:
      'inline-flex items-center rounded-full bg-blue-100/50 px-3 py-1 text-xs font-semibold text-blue-800 mb-4',
  },
  {
    name: 'Aggressive Market Leadership',
    price: (
      <>
        $4,500<span className="text-lg">/mo</span>
      </>
    ),
    features: [
      'Everything in content & leads',
      'Advanced automation systems',
      'Multi-channel campaigns',
      'A/B testing & optimization',
      'Custom integrations',
      'Weekly performance reviews',
      'Priority support & updates',
    ],
  },
];

const WebDevPricingSection = () => {
  return (
    <GlassPricingFrame>
      {/* Header Section */}
      <PricingSectionHeader
        badgeClassName="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm mb-6"
        dotClassName="mr-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse"
        badgeLabel="Web Development"
        headingPrefix="Premium"
        gradientClassName="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
        gradientText="Web Development"
        description="We combine a one-time project with an ongoing partnership to build your foundation and scale your growth."
      />

      {/* Project Investment Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-12 border border-white/30 mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">One-Time Project Investment</h3>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            This is the initial, intensive build where we construct your entire digital architecture and deploy your core brand assets. 
            50% is due at the start, with the remainder upon successful completion.
          </p>
        </div>

        <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-8 border border-white/40">
          <div className="mb-6">
            <div className="text-lg font-semibold text-gray-900 mb-2">Starting at a One-Time Investment of</div>
            <div className="text-6xl font-bold text-blue-600 mb-2">$7,500+</div>
            <div className="text-gray-500">Final quote provided after our discovery call.</div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {PROJECT_FEATURES.map((feature, index) => (
              <PricingFeatureItem key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Retainer Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Monthly Retainer</h3>
          <p className="text-gray-600 text-lg">Choose the level of ongoing support that fits your growth goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {RETAINER_PLANS.map((plan, index) => (
            <RetainerPlanCard key={index} {...plan} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <PricingCtaPanel
        title="Ready to Get Started?"
        bodyClassName="text-gray-600 text-lg mb-8"
        body="Every great partnership starts with a single conversation."
        buttonClassName="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
        buttonLabel="Schedule a Free Discovery Call"
      />
    </GlassPricingFrame>
  );
};

export default WebDevPricingSection;
