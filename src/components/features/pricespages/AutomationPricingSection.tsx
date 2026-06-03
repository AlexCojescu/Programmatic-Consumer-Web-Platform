import React from 'react';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/image-sizes';

const AutomationPricingSection = () => {
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
          <div className="inline-flex items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm mb-6">
            <div className="mr-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Business Automation
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            Intelligent{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Automation Systems
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We eradicate manual, error-prone tasks by building robust automation systems, allowing your team to focus on what matters most.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-16">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 inline-block">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Powered By</h3>
            <div className="flex items-center justify-center space-x-8">
              <Image src="/zapier-logo.png" alt="Zapier" width={80} height={40} sizes={IMAGE_SIZES.pricingLogo} className="opacity-70" />
              <Image src="/make-logo.png" alt="Make" width={80} height={40} sizes={IMAGE_SIZES.pricingLogo} className="opacity-70" />
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Single Workflow */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Single Workflow</h3>
              <p className="text-gray-600 mb-6">For specific, high-impact tasks.</p>
              <div className="text-4xl font-bold text-orange-600 mb-2">$950</div>
              <p className="text-sm text-gray-500">One-time fee per automated workflow.</p>
            </div>
            
            <div className="space-y-4">
              {[
                'Custom workflow design',
                'Implementation & testing',
                'Documentation & training',
                '30-day support included',
                'One revision cycle'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Integration */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:bg-white/25 transition-all duration-300 transform scale-105">
            <div className="text-center mb-8">
              <div className="inline-flex items-center rounded-full bg-orange-100/50 px-3 py-1 text-xs font-semibold text-orange-800 mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">System Integration</h3>
              <p className="text-gray-600 mb-6">Connect your entire sales or marketing stack.</p>
              <div className="text-4xl font-bold text-orange-600 mb-2">$2,500+</div>
              <p className="text-sm text-gray-500">One-time project fee. Varies by complexity.</p>
            </div>
            
            <div className="space-y-4">
              {[
                'Multi-platform integration',
                'Data synchronization',
                'Advanced workflow logic',
                'Error handling & monitoring',
                '90-day support included',
                'Unlimited revisions'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Support */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Support</h3>
              <p className="text-gray-600 mb-6">Ongoing support and new automations.</p>
              <div className="text-4xl font-bold text-orange-600 mb-2">Custom</div>
              <p className="text-sm text-gray-500">Monthly retainer for continuous improvement.</p>
            </div>
            
            <div className="space-y-4">
              {[
                'Monthly optimization',
                'New workflow development',
                'Performance monitoring',
                'Priority support access',
                'Quarterly strategy calls',
                'Custom reporting'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/30 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Web Development + Automation</h3>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Our core strength lies in combining high-performance web development with intelligent automation. 
            We can build your website and its underlying operational systems as one cohesive project.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
            Schedule a Unified Strategy Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationPricingSection;
