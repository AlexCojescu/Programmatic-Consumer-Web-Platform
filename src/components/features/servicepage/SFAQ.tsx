"use client";

import React from "react";
import FadedGridBackground from "@/components/ui/FadedGridBackground";

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "We work best with growing ISPs that have real operational complexity and want consistent, measurable workflows across teams.",
  },
  {
    question: "What problems do you actually solve?",
    answer:
      "We fix slow onboarding, inconsistent activations, handoff gaps between tools, and lack of visibility from operations to revenue and retention.",
  },
  {
    question: "How do engagements typically start?",
    answer:
      "We begin with a short mapping and discovery phase to document your current workflows, tools, and bottlenecks before proposing changes.",
  },
  {
    question: "Do you replace our existing tools?",
    answer:
      "Not by default. We design around the stack you already use, then only recommend new tools when they materially improve reliability or scale.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most initial builds run over a few weeks, moving from discovery to design, implementation, and handoff in clearly scoped stages.",
  },
  {
    question: "Can you stay on as an ongoing partner?",
    answer:
      "Yes. After handoff, many teams keep us on as a fractional ops and systems partner to monitor KPIs and iterate on workflows.",
  },
];

const SFAQ: React.FC = () => {
  return (
    <section className="relative border-slate-200 overflow-hidden">
      <FadedGridBackground />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Still deciding?
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Short answers to common questions
          </h2>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            A quick SFAQ for ISPs considering whether to bring us in as an operations partner.
          </p>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
              <dt className="text-sm font-semibold text-slate-900 sm:text-[0.95rem]">
                {item.question}
              </dt>
              <dd className="text-xs text-slate-600 sm:text-sm leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default SFAQ;
