"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications: Item[] = [
  {
    name: "New client onboarded",
    description: "Automated intake to onboarding handoff",
    time: "15m ago",
    icon: "🧩",
    color: "#00C9A7",
  },
  {
    name: "Project marked complete",
    description: "Standardized fulfillment pipeline",
    time: "10m ago",
    icon: "✅",
    color: "#FFB800",
  },
  {
    name: "Client task completed",
    description: "Proactive reminders and status tracking",
    time: "5m ago",
    icon: "📌",
    color: "#FF3D71",
  },
  {
    name: "At-risk client flagged",
    description: "Early warning from low engagement signals",
    time: "2m ago",
    icon: "⚠️",
    color: "#1E86FF",
  },
];


notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
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

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
