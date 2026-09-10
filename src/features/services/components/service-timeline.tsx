"use client";

import React from "react";
import FadedGridBackground from "@/shared/ui/faded-grid-background";
import {
  ServiceTimelineRail,
  type ServiceTimelineRailEntry,
} from "@/features/services/components/service-timeline-rail";
import {
  ServiceStageCard,
  type ServiceStage,
} from "@/features/services/components/service-stage-card";

const stages: ServiceStage[] = [
  {
    id: 1,
    label: "Stage 1 · DIY",
    title: "Document & Discover",
    timeframe: "2–4 weeks",
    summary:
      "SOPs, tools, and assets mapped into one clear picture of how work gets done today.",
    description: [
      "Audit standard operating procedures, process maps, internal assets, and your current tool stack.",
      "Capture how onboarding, fulfillment, and support actually run today—step by step.",
      "Identify gaps where SOPs don’t exist and help your team define them.",
    ],
    outputs: [
      "Systems map of key workflows",
      "SOP library (or the starting point of one)",
      "Tools inventory (CRMs, forms, portals, automations)",
      "Asset map (dashboards, intake forms, calendars, databases)",
    ],
    type: "Do It Yourself",
  },
  {
    id: 2,
    label: "Stage 2 · DWY",
    title: "Research & Design",
    timeframe: "2–3 weeks",
    summary:
      "We design the best-fit system around your current stack, not a shiny new platform you don’t need.",
    description: [
      "Research how to streamline your existing workflows without ripping out tools that already work.",
      "Use Slack for tight feedback loops and stakeholder questions as we design your system.",
      "Leverage compliant, local LLM workflows to analyse patterns, edge cases, and opportunities.",
    ],
    outputs: [
      "Proposed systems architecture around your current tools",
      "Prioritized workflow backlog",
      "Implementation roadmap for automations, portals, and docs",
    ],
    type: "Done With You",
  },
  {
    id: 3,
    label: "Stage 3 · DFY",
    title: "Build & Document",
    timeframe: "≈4 weeks",
    summary:
      "We build the workflows, automations, and documentation your team will actually use.",
    description: [
      "Implement workflows and automations across your stack (intake, onboarding, fulfillment, support).",
      "Record Loom walkthroughs that show how each part of the system works in real scenarios.",
      "Create linked Google Docs and internal pages that centralize every asset and automation.",
    ],
    outputs: [
      "Live automations and workflow layer",
      "Loom library and system walkthroughs",
      "Playbooks and change-log for future iterations",
    ],
    type: "Done For You",
  },
  {
    id: 4,
    label: "Stage 4 · DWY",
    title: "Testing, Training & Handoff",
    timeframe: "2–3 weeks",
    summary:
      "We test everything with your team, train owners, and hand over a complete offboarding package.",
    description: [
      "Run live test cycles with your operators and stakeholders inside your actual workflows.",
      "Refine edge cases, ownership, and escalation paths based on real usage and feedback.",
      "Train internal owners so the system runs the same way every time, regardless of who’s executing.",
    ],
    outputs: [
      "Fully tested workflows and automations",
      "Owner assignments and RACI-style clarity",
      "Offboarding packet with docs, Looms, and recordings",
    ],
    type: "Done With You / DIY",
  },
];

const ServiceTimeline: React.FC = () => {
  // Build TimelineEntry data that wraps each stage row and lets the animated line
  // track the combined height.
  const timelineData: ServiceTimelineRailEntry[] = stages.map((stage) => ({
    title: stage.title,
    content: (
      <div
        key={stage.id}
        className="relative flex gap-4 lg:gap-6 pt-8 first:pt-0"
      >
        {/* Marker (desktop) – gray circle aligned with the vertical line and title row */}
        <div className="relative hidden lg:block">
          <div className="absolute top-[50px] -left-[0.95rem] flex w-8 justify-center">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-500 text-transparent">
              {stage.id}
            </span>
          </div>
        </div>

        {/* Card */}
        <ServiceStageCard
          stage={stage}
          detailGridClassName="mt-4 grid gap-4 lg:grid-cols-2"
        />
      </div>
    ),
  }));

  return (
    <section className="relative border-slate-200/70 overflow-hidden">
      <FadedGridBackground />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Intro */}
        <div className="w-full space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            This is BizOps, not AI theatre
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Our four-stage operating system build
          </h2>
          <p className="max-w-3xl text-base text-slate-700 sm:text-lg leading-relaxed">
            We treat your operations like a surgeon, not a salesman: map what&apos;s real, design
            around it, then build and hand off a system that runs the same way every time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative grid gap-10 lg:grid-cols-[0.35fr_minmax(0,1fr)]">
          {/* Left rail (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Service model
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Every stage has a clear fulfilment type – DIY, Done With You, or Done For You – so
                you always know who owns what and when.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">DIY</span> – your team executes
                  with our frameworks.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Done With You</span> – tight
                  collaboration and shared ownership.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Done For You</span> – we build the
                  system and hand it over.
                </li>
              </ul>
            </div>
          </div>

          {/* Timeline steps + animated line */}
          <div className="relative">
            {/* Desktop: animated timeline with cards */}
            <div className="hidden lg:block">
              <ServiceTimelineRail data={timelineData} />
            </div>

            {/* Mobile / tablet: simple stacked cards (no animated rail) */}
            <div className="lg:hidden">
              <ol className="space-y-8">
                {stages.map((stage) => (
                  <li key={stage.id}>
                    <ServiceStageCard
                      stage={stage}
                      detailGridClassName="mt-4 grid gap-4 sm:grid-cols-2"
                    />
                  </li>
                ))}
              </ol>
            </div>

            {/* Mobile service model note */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-700 leading-relaxed lg:hidden">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                How the engagement works
              </p>
              <p className="mt-1">
                Stage 1 is built to become a true DIY asset over time — a structured intake and
                mapping kit that lets clients document SOPs, tools, and assets before deeper work
                begins.
              </p>
              <p className="mt-2">
                From there, we shift between Done With You and Done For You so you get both leverage
                and ownership, without any AI theatre or tool-churn you don&apos;t need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTimeline;
