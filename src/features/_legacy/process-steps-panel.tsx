import React from "react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessStepsPanelProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  /** Background class for the numbered circles (e.g. "bg-green-600"). */
  stepColorClassName: string;
}

/**
 * Glass panel with a centered header and a four-up grid of numbered steps.
 */
export const ProcessStepsPanel: React.FC<ProcessStepsPanelProps> = ({
  title,
  subtitle,
  steps,
  stepColorClassName,
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
            <div
              className={`w-12 h-12 ${stepColorClassName} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}
            >
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
