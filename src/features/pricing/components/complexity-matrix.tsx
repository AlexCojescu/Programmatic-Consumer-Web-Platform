"use client";

import React from "react";
import { PricingSectionBand } from "@/features/pricing/components/pricing-section-band";
import { PricingEyebrow } from "@/features/pricing/components/pricing-eyebrow";
import {
  ComplexityLeverGrid,
  type ComplexityLever,
} from "@/features/pricing/components/complexity-lever-grid";
import { OperationalGuaranteeBanner } from "@/features/pricing/components/operational-guarantee-banner";

const LEVERS: ComplexityLever[] = [
  {
    label: "Lever 1",
    title: "Node Density (Tool Stack)",
    intro:
      "Every “node” is a point of failure or a point of automation. We audit how many systems currently hold subscriber and network data.",
    primary: (
      <>
        <span className="font-semibold">Standard Stack:</span> 3–5 tools (e.g., NMS +
        billing/provisioning + CRM).
      </>
    ),
    secondary: (
      <>
        <span className="font-semibold">Complex Stack:</span> 6+ tools (e.g., legacy NMS,
        custom CRM, billing, ticketing, field apps, internal dashboards).
      </>
    ),
    outro:
      "The more nodes you have, the more wiring we build to keep NMS, billing, and provisioning in alignment.",
  },
  {
    label: "Lever 2",
    title: "Data Stream Velocity",
    intro: "We measure how quickly work moves from signed contract to activated service.",
    primary: (
      <>
        <span className="font-semibold">Lower Velocity:</span> Longer sign‑to‑activation
        cycle times, standard truck rolls.
      </>
    ),
    secondary: (
      <>
        <span className="font-semibold">High Velocity:</span> Multi‑region builds, dense
        fiber deployments, or high truck‑roll environments where install and repair
        efficiency drives margin.
      </>
    ),
    outro:
      "Higher velocity demands stronger error‑handling and “stuck ticket” detection so revenue doesn’t leak between NMS and billing.",
  },
  {
    label: "Lever 3",
    title: "Legacy Data Debt",
    intro:
      "Before we can automate, we have to clean the pipes. We assess how much of your subscriber and network history is trapped in silos.",
    primary: (
      <>
        <span className="font-semibold">Clean Start:</span> Basic SOPs and reasonably
        aligned subscriber data across systems.
      </>
    ),
    secondary: (
      <>
        <span className="font-semibold">Deep Cleanup:</span> Siloed subscriber data, manual
        provisioning loops, and history scattered across email, shared drives, and
        “veteran” memory.
      </>
    ),
    outro: "The messier the data, the more Surgical Discovery is required in Stage 1.",
  },
  {
    label: "Lever 4",
    title: "Team Distribution",
    intro:
      "A system is only as good as the people running it. We scope based on who needs to operate the playbook.",
    primary: (
      <>
        <span className="font-semibold">Single Team:</span> One operations manager and a
        centralized field crew.
      </>
    ),
    secondary: (
      <>
        <span className="font-semibold">Distributed/Regional:</span> Multiple regional
        managers, partner installers, and outsourced field techs who all need consistent
        workflows.
      </>
    ),
  },
];

const ComplexityMatrix: React.FC = () => {
  return (
    <PricingSectionBand>
      {/* Centered intro */}
      <div className="mx-auto max-w-3xl text-center">
        <PricingEyebrow>The Complexity Matrix</PricingEyebrow>
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
      <ComplexityLeverGrid levers={LEVERS} />

      {/* Guarantee below */}
      <OperationalGuaranteeBanner
        eyebrow="Operational guarantee"
        title="We stay until your team can run it."
      >
        We don’t just hand over a PDF. We hand over a system that is tested with your team.
        If your team doesn’t know how to run the workflow by the end of Stage 4, we stay in
        your Slack until they do—and we don’t consider the project “live” until your first 10
        customers have moved through the new system error‑free.
      </OperationalGuaranteeBanner>
    </PricingSectionBand>
  );
};

export default ComplexityMatrix;
