import React from "react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface PricingProcessStepsProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  /** Full verbatim class string for the numbered circle (accent color varies). */
  stepCircleClassName: string;
}

/**
 * Glass process panel: centered title/subtitle over a four-up grid of
 * numbered step circles with titles and descriptions.
 */
export const PricingProcessSteps: React.FC<PricingProcessStepsProps> = ({
  title,
  subtitle,
  steps,
  stepCircleClassName,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 text-lg">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item, index) => (
          <div key={index} className="text-center">
            <div className={stepCircleClassName}>
              {item.step}
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
