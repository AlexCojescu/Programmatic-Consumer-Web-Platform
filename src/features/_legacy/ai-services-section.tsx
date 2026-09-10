import React from 'react';
import { ServiceOfferCard } from '@/features/services/components/service-offer-card';

const SERVICES = [
  {
    title: "Digital Presence & Architecture",
    body: "Construct your core digital asset with logic and purpose. Engineer a website that serves as a stable, scalable foundation for all commercial activity. Ensure responsive design for flawless function across all platforms. Build a platform optimized for clear communication and efficient conversion.",
    href: "/digital-architecture",
  },
  {
    title: "Intent-Driven Lead Generation",
    body: "Engage active buyers, not passive prospects. Bypass guesswork by identifying prospects actively searching for your solution. Focus resources exclusively on in-market buyers to shorten sales cycles and increase conversion. Receive a structured list of high-intent contacts, transforming raw search data into actionable intelligence.",
    href: "/lead-generation",
  },
  {
    title: "Marketing & Systems Automation",
    body: "Systematize operations for maximum efficiency. Execute marketing campaigns with systematic precision to expand operational capacity. Unify disparate data systems into a single, reliable source of truth. Eradicate manual, error-prone processes to reclaim resources and improve accuracy.",
    href: "/automations",
  },
  {
    title: "Strategic Content Deployment",
    body: "Command authority through calculated content. Develop and deploy content that directly addresses the search intent of your target market. Establish market leadership by providing clear, valuable information that solves specific problems. Structure content to systematically guide prospects from awareness to decision.",
    href: "/content-strategy",
  },
];

const ServicesSection = () => {
  return (
    // Centered section container
    <section className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Main Heading and Subheading */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Deploying Logic to Achieve Decisive Outcomes.
        </h1>
        <p className="text-lg text-gray-700">
          Growth is a function of output, not complexity. We provide a suite of services designed to build core assets and install intelligent systems. Each capability is a direct, controllable path to a specific, measurable result. We replace ambiguity with action.
        </p>
      </div>

      {/* Grid container for the services */}
      <div className="grid md:grid-cols-2 gap-8">
        {SERVICES.map((service) => (
          <ServiceOfferCard
            key={service.href}
            title={service.title}
            body={service.body}
            href={service.href}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
