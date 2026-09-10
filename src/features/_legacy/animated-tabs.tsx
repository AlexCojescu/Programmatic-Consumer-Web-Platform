// src/components/magicui/animated-tabs.tsx

"use client";
import React, { useState } from "react";

// You can add more imports here if you use libraries (e.g., shadcn tabs, radix-ui, headlessui, etc.)

export type Tab = {
  title: string;
  value: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.value);

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-4 py-2 font-semibold rounded ${
              active === tab.value ? "bg-violet-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        {tabs.map(
          (tab) =>
            tab.value === active && (
              <div key={tab.value} className="transition-all animate-fadeIn">
                {tab.content}
              </div>
            ),
        )}
      </div>
    </div>
  );
}
