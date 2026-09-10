"use client";

import { cn } from "@/shared/lib/utils";
import { AnimatedList } from "@/shared/motion/animated-list";
import {
  HomeNotificationCard,
  type HomeNotificationItem,
} from "@/features/_legacy/home-notification-card";

let notifications: HomeNotificationItem[] = [
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
          <HomeNotificationCard {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
