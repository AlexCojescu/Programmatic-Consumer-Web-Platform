// This can be a client component if it has other client-side logic,
// or a server component if only rendering static AccordionItems.
// For simplicity, let's keep it a client component here if it's bundled
// with other interactive elements. If just a static list, remove "use client".
"use client";

import { AccordionItem } from './AccordianItem'; // Adjust path as necessary

export const ServicesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Our Data Solutions
      </h2>
      <div className="space-y-4"> {/* Adds spacing between accordion items */}
        <AccordionItem title="Firmographic info">
          <p>Research companies using custom AI industry definitions, basic firmographics, tech stack, funding, and more.</p>
        </AccordionItem>
        <AccordionItem title="Contact data">
          <p>Increase coverage rates of critical contact information across all regions and markets, from APAC to EMEA.</p>
        </AccordionItem>
        <AccordionItem title="Normalize data">
          <p>Format and clean data to fit standard parameters at scale.</p>
        </AccordionItem>
        <AccordionItem title="AI research">
          <p>Use an AI research agent to search the web to do any manual task, from summarizing 10ks to categorizing companies as PLG or sales-led.</p>
        </AccordionItem>
      </div>
    </section>
  );
};