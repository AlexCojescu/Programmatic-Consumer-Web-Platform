import React from 'react';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/image-sizes';

const LeadGenPricingSection = () => {
  // A reusable checkmark icon
  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="relative py-20">
      {/* Subtle background pattern - made transparent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-green-700 shadow-sm mb-6">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Lead Generation
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            Precision{' '}
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Lead Generation
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We bypass the guesswork by building hyper-targeted lists of verified decision-makers, ready for you to engage.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-16">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 inline-block">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Tech Stack</h3>
            <div className="flex items-center justify-center space-x-8">
              <Image src="/apollo-logo.png" alt="Apollo" width={80} height={40} sizes={IMAGE_SIZES.pricingLogo} className="opacity-70" />
              <Image src="/clay-logo.png" alt="Clay" width={80} height={40} sizes={IMAGE_SIZES.pricingLogo} className="opacity-70" />
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Custom List */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom List</h3>
              <p className="text-gray-600 mb-6">A one-time, custom-built list of ideal clients.</p>
              <div className="text-4xl font-bold text-green-600 mb-2">$1,500+</div>
              <p className="text-sm text-gray-500">One-time fee. Based on list size & complexity.</p>
            </div>
            
            <div className="space-y-4">
              {[
                'ICP development & targeting',
                'Data sourcing & verification',
                'Contact information enrichment',
                'Deliverability optimization',
                'CSV export & documentation'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Generation System */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:bg-white/25 transition-all duration-300 transform scale-105">
            <div className="text-center mb-8">
              <div className="inline-flex items-center rounded-full bg-green-100/50 px-3 py-1 text-xs font-semibold text-green-800 mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete System</h3>
              <p className="text-gray-600 mb-6">Your complete lead generation & outreach setup.</p>
              <div className="text-4xl font-bold text-green-600 mb-2">$3,500<span className="text-lg">/mo</span></div>
              <p className="text-sm text-gray-500">Monthly retainer for leads and campaign management.</p>
            </div>
            
            <div className="space-y-4">
              {[
                'Everything in Custom List',
                'Email sequence development',
                'Campaign setup & management',
                'A/B testing & optimization',
                'Performance tracking & reporting',
                'Monthly strategy calls'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Solution */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Pipeline</h3>
              <p className="text-gray-600 mb-6">A fully managed, data-driven sales pipeline.</p>
              <div className="text-4xl font-bold text-green-600 mb-2">Custom<span className="text-lg">/mo</span></div>
              <p className="text-sm text-gray-500">For teams focused on aggressive, predictable growth.</p>
            </div>
            
            <div className="space-y-4">
              {[
                'Multi-channel outreach',
                'Advanced segmentation',
                'Sales team integration',
                'Custom CRM setup',
                'Dedicated account manager',
                'Weekly optimization'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Lead Generation Process</h3>
            <p className="text-gray-600 text-lg">From targeting to delivery in four strategic steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenPricingSection;
