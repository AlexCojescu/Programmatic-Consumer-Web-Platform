"use client";

import React from "react";
import Link from "next/link";

const InvestmentPaths: React.FC = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Section header */}
        <div className="mb-8 mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Transparent investment paths
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Two ways to fund your operating build.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
            Most ISP partners choose one of two paths, depending on how fast they want the system
            live and how they prefer to manage cash flow.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Option A – Accelerated Path (Best Value) */}
          <div
            className={[
              "group relative flex h-full flex-col rounded-3xl border border-neutral-900 bg-white p-6 sm:p-8",
              "shadow-[0_26px_80px_rgba(15,23,42,0.25)]",
              "transition-all duration-200 ease-out",
              "hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.30)]",
              "focus-within:-translate-y-1 focus-within:shadow-[0_28px_90px_rgba(15,23,42,0.30)]",
            ].join(" ")}
          >
            {/* Badge */}
            <div className="absolute -top-4 left-8">
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                Best value
              </span>
            </div>

            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Option A · Accelerated Path
            </p>

            <p className="mt-4 text-2xl font-semibold text-neutral-900 sm:text-[1.7rem]">
              $10,000 upfront
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              Best for high‑growth operators who need the backbone built yesterday.
            </p>

            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              <li>• Full 4‑Stage Build (Discover, Design, Build, Handoff).</li>
              <li>• Priority scheduling in our implementation queue.</li>
              <li>• Single‑payment discount — total savings: $2,000.</li>
            </ul>

            <div className="mt-6 pt-2">
              <Link
                href="/contact?type=accelerated-path"
                className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-[0_18px_55px_rgba(15,23,42,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                Choose the Accelerated Path
              </Link>
            </div>
          </div>

          {/* Option B – Milestone Path */}
          <div
            className={[
              "group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8",
              "shadow-[0_20px_70px_rgba(15,23,42,0.12)]",
              "transition-all duration-200 ease-out",
              "hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.18)]",
              "focus-within:-translate-y-1 focus-within:border-neutral-300 focus-within:shadow-[0_24px_80px_rgba(15,23,42,0.18)]",
            ].join(" ")}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Option B · Milestone Path
            </p>

            <p className="mt-4 text-2xl font-semibold text-neutral-900 sm:text-[1.7rem]">
              $12,000 total · $3,000/mo × 4
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              Best for operators who want to align the build with a 120‑day transformation window.
            </p>

            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              <li>• $3,000/month over 4 months.</li>
              <li>• Payments tied to stage deliverables, not hours.</li>
              <li>• Same high‑touch integration, spread across your fiscal quarter.</li>
            </ul>

            <div className="mt-6 pt-2">
              <Link
                href="/contact?type=milestone-path"
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-[0_16px_45px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                Choose the Milestone Path
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPaths;
