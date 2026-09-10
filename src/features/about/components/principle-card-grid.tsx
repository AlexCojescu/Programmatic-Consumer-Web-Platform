import React from "react";

interface PrincipleCard {
  title: string;
  body: string;
}

interface PrincipleCardGridProps {
  cards: PrincipleCard[];
}

/**
 * Three-up card grid separated by hairline gaps, each card with a title,
 * short underline bar, and body copy.
 */
export const PrincipleCardGrid: React.FC<PrincipleCardGridProps> = ({
  cards,
}) => {
  return (
    <div className="grid gap-px sm:grid-cols-3 bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
            {card.title}
          </h4>
          <div className="w-5 sm:w-6 h-0.5 bg-slate-900" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
};
