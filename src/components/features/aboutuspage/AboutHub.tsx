"use client";

import React from "react";
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam";

const AboutHub: React.FC = () => {
  return (
    <section className="relative">
      {/* Subtle grid background for technical texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-20 lg:py-28">
        {/* ── Intro block ─────────────────────────────────────── */}
        <div className="border-l-2 border-slate-900 pl-4 sm:pl-6 mb-12 sm:mb-20">
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-2 sm:mb-3">
            About Programmatic
          </p>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-semibold text-slate-900 leading-relaxed sm:leading-snug max-w-5xl">
            We are systems integrators dedicated to fiber and wireless ISPs. We
            don't just implament automations. We architect a scalable operating
            system that lives within your existing tools, workflows, and SOPs to
            turn operational chaos into a predictable, high-performance engine.
          </h2>
        </div>

        {/* ── This is BizOps, not an AI grift ─────────────────── */}
        <div className="mb-16 sm:mb-20 grid lg:grid-cols-[1fr_2px_1fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-4 text-[13px] sm:text-[15px] text-slate-600 leading-relaxed">
            <p>
              Most businesses don't have a technology problem, they have a
              systems problem. You're drowning in tools, but your team is still
              manually doing work that could run on autopilot. The result?
              Projects take 3x longer than they should, clients drop off
              mid-process, and your team spends more time managing chaos than
              delivering value
            </p>
            <p>
              Imagine saving 10,000 tasks per month. A minute per task - 1 min
              task - 10,000 minutes saved - &#36;100 per minute - &#36;100,000
              saved per month
            </p>
          </div>
          <div className="hidden lg:block w-px bg-slate-200 self-stretch" />
          <p className="text-[13px] sm:text-[15px] text-slate-600 leading-relaxed">
            Unlike agencies that push flashy new platforms or generic AI bots,
            we are technology-agnostic. We take the tools you already pay for
            and connect them. Our goal is to optimize your operations and task
            efficiency.
          </p>
        </div>

        {/* ── What we really do + Animated Beam ──────────────── */}
        <div className="mb-16 sm:mb-20 grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-6 items-center">
          {/* Left col: What we really do */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-semibold text-slate-900">
                What we really do
              </h3>
            </div>

            <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-3 sm:mb-4">
              We sit at the intersection of process, software, and execution.
              Clients bring us messy realities: SOPs in random docs,
              half‑finished automations, tools no one fully understands, and a
              team doing its best to keep up.
            </p>
            <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-4 sm:mb-6">
              Our job is to organize that chaos into a clear, documented
              operating system:
            </p>

            <div className="space-y-0 divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {[
                "Your processes are mapped and visible end‑to‑end.",
                "Your tools talk to each other instead of fighting each other.",
                "Your team knows what to do, when to do it, and where to find the work.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 bg-slate-50/50"
                >
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center">
                    <svg
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10 3L5 8.5 2 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[13px] sm:text-[15px] text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mt-4 sm:mt-6">
              The result is fewer dropped balls, faster delivery, and a client
              experience that feels predictable instead of reactive.
            </p>
          </div>

          {/* Right col: Animated Beam */}
          <div className="mt-6 lg:mt-0 flex items-center justify-center w-full">
            <AnimatedBeamDemo />
          </div>
        </div>

        {/* ── How we think about systems ───────────────────────── */}
        <div className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-semibold text-slate-900">
              How we think about systems
            </h3>
          </div>

          <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-6 sm:mb-8">
            We're tool‑agnostic and context‑first. We don't force you into a
            secret framework or trendy app. We work with the tools, workflows,
            and constraints you already have, then design a smarter way for them
            to work together.
          </p>

          {/* Principles grid */}
          <div className="grid gap-px sm:grid-cols-3 bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            {[
              {
                title: "Reality over theory",
                body: "We design around what your team actually does today — not what a playbook says they should do.",
              },
              {
                title: "Documentation as a product",
                body: "Looms, docs, and maps are treated as assets your business can keep, train on, and reuse.",
              },
              {
                title: "Replace chaos, not people",
                body: "Systems should make your team more effective — not less relevant.",
              },
            ].map((card, i) => (
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
        </div>

        {/* ── Engagement arc ───────────────────────────────────── */}
        <div className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-semibold text-slate-900">
              A structured, complication free engagement
            </h3>
          </div>

          <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-6 sm:mb-8">
            Behind the scenes, our work runs through a clear arc: we document
            how things work today, research the best way to support those
            workflows, build and wire up the new system, then test and train
            your team so it sticks.
          </p>

          <div className="space-y-0">
            {[
              {
                step: "01",
                label:
                  "An integrated workflow layer built on your existing tools.",
              },
              {
                step: "02",
                label: "Centralized documentation and training assets.",
              },
              {
                step: "03",
                label:
                  "A system that can be handed off, scaled, or productized into its own offer.",
              },
            ].map(({ step, label }, i, arr) => (
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

          <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px]">
            From there, you can keep it in‑house — or keep us on to monitor and
            manage the system with you.
          </p>
        </div>

        {/* ── Who we're for + CTA ──────────────────────────────── */}
        <div className="border-t border-slate-200 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-semibold text-slate-900">
              Who we're for
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px]">
              We work best with operators who run done‑for‑you or high‑touch
              service businesses, are tired of duct‑taped tools and "ask X, they
              know where that is," and want a system they can train people into
              instead of one that only lives in their head.
            </p>
            <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px]">
              If that's you, we're not here to sell you another AI trick. We're
              here to help you build an operating system your business can grow
              on.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.25)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.35)] hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Talk about your systems
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <span className="text-[11px] sm:text-[13px] text-slate-400">
              No pitch deck. Just a straightforward conversation.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHub;
