import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface ServiceStage {
  id: number;
  label: string;
  title: string;
  timeframe: string;
  summary: string;
  description: string[];
  outputs: string[];
  type: string;
}

interface ServiceStageCardProps {
  stage: ServiceStage;
  /**
   * Class string for the details grid — the column breakpoint differs between
   * the desktop timeline (lg) and the mobile stacked list (sm).
   */
  detailGridClassName: string;
}

/**
 * White stage card used in the four-stage engagement timeline: label/title
 * header, timeframe, summary, "what happens" + "outputs" lists, and the
 * handoff note on the final stage.
 */
export const ServiceStageCard: React.FC<ServiceStageCardProps> = ({
  stage,
  detailGridClassName,
}) => {
  return (
    <div className="flex-1 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {stage.label}
          </p>
          <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
            {stage.title}
          </h3>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p className="font-medium text-slate-900">{stage.timeframe}</p>
          <p>{stage.type}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-700 sm:text-[0.95rem] leading-relaxed">
        {stage.summary}
      </p>

      <div className={detailGridClassName}>
        {/* What happens */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            What happens here
          </p>
          <ul className="space-y-1.5 text-sm text-slate-700 leading-relaxed">
            {stage.description.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outputs */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Tangible outputs
          </p>
          <ul className="space-y-1.5 text-sm text-slate-700 leading-relaxed">
            {stage.outputs.map((output) => (
              <li key={output} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ascension / next step note on last stage */}
      {stage.id === 4 && (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-3 text-xs text-slate-700 sm:text-[0.8rem] leading-relaxed">
          <p className="font-semibold text-slate-900">
            After handoff: ascension or ops retainer.
          </p>
          <p className="mt-1">
            Once the system is running independently, we either focus next
            quarter on a new area (like fulfillment) under a longer contract,
            or we stay inside your Slack as a fractional systems team
            monitoring KPIs and keeping workflows healthy.
          </p>
        </div>
      )}
    </div>
  );
};
