"use client";

import React from "react";

const ComplexityMatrix: React.FC = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Centered intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            The Complexity Matrix
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            How we scope your system.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]">
            We don’t believe in “one‑size‑fits‑all” pricing because no two ISPs run on the exact
            same infrastructure. Your investment is calculated based on the technical weight and
            data velocity of your current operation.
          </p>
          <p className="mt-3 text-sm font-medium text-neutral-900 sm:text-[0.95rem]">
            We look at four primary levers to determine scope:
          </p>
        </div>

        {/* Four columns: dashed, lighter, touching edges */}
        <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl border border-dashed border-neutral-400/70">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y divide-dashed divide-neutral-400/60 md:divide-y-0 md:divide-x">
            {/* 1. Node Density */}
            <div className="flex h-full flex-col px-4 py-6 text-left sm:px-5 sm:py-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Lever 1
              </p>
              <h3 className="mt-2 text-sm font-semibold text-neutral-900 sm:text-base">
                Node Density (Tool Stack)
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                Every “node” is a point of failure or a point of automation. We audit how many
                systems currently hold subscriber and network data.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Standard Stack:</span> 3–5 tools (e.g., NMS +
                billing/provisioning + CRM).
              </p>
              <p className="text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Complex Stack:</span> 6+ tools (e.g., legacy NMS,
                custom CRM, billing, ticketing, field apps, internal dashboards).
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                The more nodes you have, the more wiring we build to keep NMS, billing, and
                provisioning in alignment.
              </p>
            </div>

            {/* 2. Data Stream Velocity */}
            <div className="flex h-full flex-col px-4 py-6 text-left sm:px-5 sm:py-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Lever 2
              </p>
              <h3 className="mt-2 text-sm font-semibold text-neutral-900 sm:text-base">
                Data Stream Velocity
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                We measure how quickly work moves from signed contract to activated service.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Lower Velocity:</span> Longer sign‑to‑activation
                cycle times, standard truck rolls.
              </p>
              <p className="text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">High Velocity:</span> Multi‑region builds, dense
                fiber deployments, or high truck‑roll environments where install and repair
                efficiency drives margin.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                Higher velocity demands stronger error‑handling and “stuck ticket” detection so
                revenue doesn’t leak between NMS and billing.
              </p>
            </div>

            {/* 3. Legacy Data Debt */}
            <div className="flex h-full flex-col px-4 py-6 text-left sm:px-5 sm:py-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Lever 3
              </p>
              <h3 className="mt-2 text-sm font-semibold text-neutral-900 sm:text-base">
                Legacy Data Debt
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                Before we can automate, we have to clean the pipes. We assess how much of your
                subscriber and network history is trapped in silos.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Clean Start:</span> Basic SOPs and reasonably
                aligned subscriber data across systems.
              </p>
              <p className="text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Deep Cleanup:</span> Siloed subscriber data, manual
                provisioning loops, and history scattered across email, shared drives, and
                “veteran” memory.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                The messier the data, the more Surgical Discovery is required in Stage 1.
              </p>
            </div>

            {/* 4. Team Distribution */}
            <div className="flex h-full flex-col px-4 py-6 text-left sm:px-5 sm:py-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Lever 4
              </p>
              <h3 className="mt-2 text-sm font-semibold text-neutral-900 sm:text-base">
                Team Distribution
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                A system is only as good as the people running it. We scope based on who needs to
                operate the playbook.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Single Team:</span> One operations manager and a
                centralized field crew.
              </p>
              <p className="text-xs leading-relaxed text-neutral-700 sm:text-[0.85rem]">
                <span className="font-semibold">Distributed/Regional:</span> Multiple regional
                managers, partner installers, and outsourced field techs who all need consistent
                workflows.
              </p>
            </div>
          </div>
        </div>

                 {/* Guarantee below */}
        <div className="mt-10 flex flex-col items-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Operational guarantee
          </p>

          <div className="mt-3 w-full max-w-3xl rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 text-center shadow-[0_16px_50px_rgba(16,185,129,0.25)] sm:p-7">
            <h3 className="text-base font-semibold text-emerald-900 sm:text-lg">
              We stay until your team can run it.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-emerald-900/90 sm:text-[0.95rem]">
              We don’t just hand over a PDF. We hand over a system that is tested with your team.
              If your team doesn’t know how to run the workflow by the end of Stage 4, we stay in
              your Slack until they do—and we don’t consider the project “live” until your first 10
              customers have moved through the new system error‑free.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ComplexityMatrix;
