"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import FadedGridBackground from "@/components/ui/FadedGridBackground";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative w-full">
        {/* Animated vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-[1.1rem] lg:left-0 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-slate-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-indigo-500 via-sky-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>

        {/* We only use the animated line; the actual entries are rendered by parent */}
        {data.map((entry, index) => (
          <div key={index}>{entry.content}</div>
        ))}
      </div>
    </div>
  );
};

const stages = [
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
  const timelineData: TimelineEntry[] = stages.map((stage, index) => ({
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

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
                quarter on a new area (like fulfillment) under a longer
                contract, or we stay inside your Slack as a fractional systems
                team monitoring KPIs and keeping workflows healthy.
              </p>
            </div>
          )}
        </div>
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
              <Timeline data={timelineData} />
            </div>

            {/* Mobile / tablet: simple stacked cards (no animated rail) */}
            <div className="lg:hidden">
              <ol className="space-y-8">
                {stages.map((stage) => (
                  <li key={stage.id}>
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
                          <p className="font-medium text-slate-900">
                            {stage.timeframe}
                          </p>
                          <p>{stage.type}</p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-slate-700 sm:text-[0.95rem] leading-relaxed">
                        {stage.summary}
                      </p>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

                      {stage.id === 4 && (
                        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-3 text-xs text-slate-700 sm:text-[0.8rem] leading-relaxed">
                          <p className="font-semibold text-slate-900">
                            After handoff: ascension or ops retainer.
                          </p>
                          <p className="mt-1">
                            Once the system is running independently, we either focus next quarter on
                            a new area (like fulfillment) under a longer contract, or we stay inside
                            your Slack as a fractional systems team monitoring KPIs and keeping
                            workflows healthy.
                          </p>
                        </div>
                      )}
                    </div>
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
