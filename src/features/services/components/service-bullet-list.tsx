import React from "react";

interface ServiceBulletListProps {
  items: string[];
}

/**
 * Bullet list where each row leads with a small slate dot.
 */
export const ServiceBulletList: React.FC<ServiceBulletListProps> = ({
  items,
}) => {
  return (
    <ul className="space-y-1.5 sm:space-y-2 text-slate-700 leading-relaxed text-xs sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
