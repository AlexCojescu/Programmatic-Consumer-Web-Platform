"use client";

import React from "react";
import Link from "next/link";

const OperationalAudit: React.FC = () => {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:py-20">
        {/* Left: Step copy */}
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Step 1 · Operational Audit
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl lg:text-[2rem]">
            A fixed‑fee Operational Audit that de‑risks the build.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
            Before any system build, we run a structured discovery phase to map your tools, data
            streams, and bottlenecks. The audit is a fixed‑fee engagement that applies toward your
            final build, so you can scope complexity before committing to a full $10k+ project.
          </p>

          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
            <li>• Inventory of your current tool stack, data flows, and handoffs.</li>
            <li>• Identification of failure points, rework loops, and “stuck ticket” patterns.</li>
            <li>• Draft system map for your sign‑to‑activation lifecycle.</li>
            <li>• Clear recommendation on which tier (Foundation, Growth, Enterprise) fits.</li>
          </ul>

          <p className="mt-5 text-sm font-medium text-neutral-900 sm:text-[0.95rem]">
            Investment: Fixed‑fee Operational Audit, credited toward your selected build tier.
          </p>
        </div>

        {/* Right: Deliverable card */}
        <aside className="w-full max-w-md">
          <div className="h-full rounded-2xl border border-dashed border-neutral-400/70 p-5 shadow-sm sm:p-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              What you walk away with
            </p>

            <h3 className="mt-3 text-lg font-semibold text-neutral-900 sm:text-xl">
              A Systems Gap Report you can keep.
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              Every audit produces a Red / Yellow / Green Infrastructure Report: a clear view of
              what’s stable, what’s fragile, and what’s currently blocking scale across your NMS,
              billing, CRM, and field workflows.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
              Even if you don’t move forward with a full build, you keep the report as a
              decision‑making asset for your team and board.
            </p>

            <div className="mt-6">
              <Link
                href="/contact?type=operational-audit"
                className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                Book an Operational Audit
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default OperationalAudit;
