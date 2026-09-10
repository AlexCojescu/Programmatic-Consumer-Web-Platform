import React from "react";
import Link from "next/link";

interface ServiceOfferCardProps {
  title: string;
  body: string;
  href: string;
}

/** Bordered service card with title, description and a "Learn More" link. */
export const ServiceOfferCard: React.FC<ServiceOfferCardProps> = ({
  title,
  body,
  href,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {title}
      </h3>
      <p className="text-gray-700 mb-6">
        {body}
      </p>
      <Link
        href={href}
        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-700 group"
      >
        Learn More
        <svg className="ml-2 -mr-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};
