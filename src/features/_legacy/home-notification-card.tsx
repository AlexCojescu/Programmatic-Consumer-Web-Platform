import React from "react";
import { cn } from "@/shared/lib/utils";

export interface HomeNotificationItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

/**
 * Notification-style card row used in the homepage animated list demo.
 */
export const HomeNotificationCard: React.FC<HomeNotificationItem> = ({
  name,
  description,
  icon,
  color,
  time,
}) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles with visible border and shadow
        "bg-white border border-gray-200 shadow-lg",
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.08),0_2px_8px_rgba(0,0,0,.1),0_8px_16px_rgba(0,0,0,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg" aria-hidden="true">
            {icon}
          </span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-gray-900">
            <span className="text-sm sm:text-lg text-gray-900">{name}</span>
            <span className="mx-1 text-gray-400">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};
