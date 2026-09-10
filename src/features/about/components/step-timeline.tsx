import React from "react";

interface TimelineStep {
  step: string;
  label: string;
}

interface StepTimelineProps {
  steps: TimelineStep[];
}

/**
 * Vertical timeline of numbered circles joined by connector lines.
 */
export const StepTimeline: React.FC<StepTimelineProps> = ({ steps }) => {
  return (
    <div className="space-y-0">
      {steps.map(({ step, label }, i, arr) => (
        <div key={i} className="flex gap-4 sm:gap-5 items-start">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 flex items-center justify-center bg-white z-10">
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-900 tracking-wide">
                {step}
              </span>
            </div>
            {i < arr.length - 1 && (
              <div className="w-px flex-1 min-h-[20px] sm:min-h-[24px] bg-slate-200 my-1" />
            )}
          </div>
          <p className="text-[13px] sm:text-[15px] text-slate-700 leading-relaxed pt-1 pb-4 sm:pb-6">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};
