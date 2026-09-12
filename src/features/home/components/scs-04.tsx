'use client';

import React from 'react';
import { ScsPanelShell } from '@/features/home/components/scs-panel-shell';
import { ScsPanelImage } from '@/features/home/components/scs-panel-image';
import { ScsPanelIntro } from '@/features/home/components/scs-panel-intro';
import { ScsLearnMoreButton } from '@/features/home/components/scs-learn-more-button';
import {
  ScsContentBlock,
  type ScsContentBlockData,
} from '@/features/home/components/scs-content-block';

const MAIN_TITLE = "Client Onboarding Systems & Experience";

const SUBTITLE =
  "Move New Clients From “Yes” to “Running” With Less Friction for Everyone.";

const DESCRIPTION =
  "We build onboarding systems that are easy for clients to complete and straightforward for your team to manage. Every step, touchpoint, and handoff is mapped out, so expectations are clear, information arrives where it should, and new accounts become fully operational without dragging on for weeks.";

const CONTENT_BLOCKS: ScsContentBlockData[] = [
  {
    title: "1. Onboarding Journey & Playbook Design",
    items: [
      "Define the ideal sequence of steps for new clients, from welcome through first meaningful outcome.",
      "Clarify who does what on both sides, and what information or approvals are needed at each point.",
      "Package this into simple guides, templates, and communications your team can reuse across accounts.",
    ],
  },
  {
    title: "2. System‑Backed Handoffs & Tracking",
    items: [
      "Connect forms, portals, communication tools, and internal systems so onboarding is managed in one flow.",
      "Make it easy to see which clients are on track, which are stuck, and where your team needs to intervene.",
      "Enable consistent follow‑through without depending on memory, spreadsheets, or ad‑hoc follow‑ups.",
    ],
  },
];

interface IntelligentRAGInfrastructureProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const IntelligentRAGInfrastructure: React.FC<IntelligentRAGInfrastructureProps> = ({
  imageSource = "/agent04.webp",
  imageAlt = "Client onboarding systems and experience illustration",
  className = ""
}) => {
  return (
    <ScsPanelShell
      className={className}
      left={
        <>
          <ScsPanelImage
            src={imageSource}
            alt={imageAlt}
            width={250}
            height={130}
          />
          <ScsPanelIntro
            title={MAIN_TITLE}
            subtitle={SUBTITLE}
            description={DESCRIPTION}
            action={<ScsLearnMoreButton />}
          />
        </>
      }
      right={
        <>
          {CONTENT_BLOCKS.map((block, i) => (
            <ScsContentBlock key={i} title={block.title} items={block.items} />
          ))}
        </>
      }
    />
  );
};

export default IntelligentRAGInfrastructure;
