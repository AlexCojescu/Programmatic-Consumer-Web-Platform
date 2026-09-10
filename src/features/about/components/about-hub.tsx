"use client";

import React from "react";
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam";
import { SectionShell } from "@/components/layouts/section-shell";
import { SplitColumns } from "@/components/layouts/split-columns";
import { ContentMediaColumns } from "@/components/layouts/content-media-columns";
import { GridBackground } from "@/components/ui/grid-background";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckList } from "@/components/ui/check-list";
import { PrincipleCardGrid } from "@/components/ui/principle-card-grid";
import { StepTimeline } from "@/components/ui/step-timeline";
import { CtaButton } from "@/components/ui/cta-button";

const WHAT_WE_DO_ITEMS = [
  "Your processes are mapped and visible end‑to‑end.",
  "Your tools talk to each other instead of fighting each other.",
  "Your team knows what to do, when to do it, and where to find the work.",
];

const PRINCIPLE_CARDS = [
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
];

const ENGAGEMENT_STEPS = [
  {
    step: "01",
    label: "An integrated workflow layer built on your existing tools.",
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
];

const AboutHub: React.FC = () => {
  return (
    <SectionShell background={<GridBackground />}>
      {/* ── Intro block ─────────────────────────────────────── */}
      <SectionIntro eyebrow="About Programmatic">
        We are systems integrators dedicated to Internet Service Providers. We
        don't just implement automations. We architect a scalable operating
        system that lives within your existing tools, workflows, and SOPs to
        turn operational chaos into a predictable, high-performance engine.
      </SectionIntro>

      {/* ── This is BizOps, not an AI grift ─────────────────── */}
      <SplitColumns
        left={
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
        }
        right={
          <p className="text-[13px] sm:text-[15px] text-slate-600 leading-relaxed">
            Unlike agencies that push flashy new platforms or generic AI bots,
            we are technology-agnostic. We take the tools you already pay for
            and connect them. Our goal is to optimize your operations and task
            efficiency.
          </p>
        }
      />

      {/* ── What we really do + Animated Beam ──────────────── */}
      <ContentMediaColumns media={<AnimatedBeamDemo />}>
        <SectionHeading title="What we really do" />

        <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-3 sm:mb-4">
          We sit at the intersection of process, software, and execution.
          Clients bring us messy realities: SOPs in random docs, half‑finished
          automations, tools no one fully understands, and a team doing its
          best to keep up.
        </p>
        <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-4 sm:mb-6">
          Our job is to organize that chaos into a clear, documented operating
          system:
        </p>

        <CheckList items={WHAT_WE_DO_ITEMS} />

        <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mt-4 sm:mt-6">
          The result is fewer dropped balls, faster delivery, and a client
          experience that feels predictable instead of reactive.
        </p>
      </ContentMediaColumns>

      {/* ── How we think about systems ───────────────────────── */}
      <div className="mb-16 sm:mb-20">
        <SectionHeading title="How we think about systems" />

        <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-6 sm:mb-8">
          We're tool‑agnostic and context‑first. We don't force you into a
          secret framework or trendy app. We work with the tools, workflows,
          and constraints you already have, then design a smarter way for them
          to work together.
        </p>

        <PrincipleCardGrid cards={PRINCIPLE_CARDS} />
      </div>

      {/* ── Engagement arc ───────────────────────────────────── */}
      <div className="mb-16 sm:mb-20">
        <SectionHeading title="A structured, complication free engagement" />

        <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px] mb-6 sm:mb-8">
          Behind the scenes, our work runs through a clear arc: we document how
          things work today, research the best way to support those workflows,
          build and wire up the new system, then test and train your team so it
          sticks.
        </p>

        <StepTimeline steps={ENGAGEMENT_STEPS} />

        <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[15px]">
          From there, you can keep it in‑house — or keep us on to monitor and
          manage the system with you.
        </p>
      </div>

      {/* ── Who we're for + CTA ──────────────────────────────── */}
      <div className="border-t border-slate-200 pt-8 sm:pt-12">
        <SectionHeading title="Who we're for" />

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
          <CtaButton>Talk about your systems</CtaButton>
          <span className="text-[11px] sm:text-[13px] text-slate-400">
            No pitch deck. Just a straightforward conversation.
          </span>
        </div>
      </div>
    </SectionShell>
  );
};

export default AboutHub;
