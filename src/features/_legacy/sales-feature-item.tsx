import React from "react";

interface SalesFeatureItemProps {
  title: string;
  body: string;
}

/** Sales section feature row: blue check bullet with title and body copy. */
export const SalesFeatureItem: React.FC<SalesFeatureItemProps> = ({
  title,
  body,
}) => {
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 md:mt-1">
        <svg 
          className="w-4 h-4 md:w-5 md:h-5 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
};
