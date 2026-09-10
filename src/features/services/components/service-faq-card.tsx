import React from "react";

interface ServiceFaqCardProps {
  question: string;
  answer: string;
}

/**
 * Single FAQ definition card (dt/dd pair) used inside the SFAQ grid.
 */
export const ServiceFaqCard: React.FC<ServiceFaqCardProps> = ({
  question,
  answer,
}) => {
  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
      <dt className="text-sm font-semibold text-slate-900 sm:text-[0.95rem]">
        {question}
      </dt>
      <dd className="text-xs text-slate-600 sm:text-sm leading-relaxed">
        {answer}
      </dd>
    </div>
  );
};
