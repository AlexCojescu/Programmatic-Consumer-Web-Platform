'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScsPanelShell } from '@/components/layouts/scs-panel-shell';
import { ScsPanelImage } from '@/components/ui/scs-panel-image';
import { ScsPanelIntro } from '@/components/ui/scs-panel-intro';
import { ScsLearnMoreButton } from '@/components/ui/scs-learn-more-button';
import {
  ScsContentBlock,
  type ScsContentBlockData,
} from '@/components/ui/scs-content-block';

const MAIN_TITLE = "Operational Flow & Delivery Systems";

const SUBTITLE =
  "Turn Day‑to‑Day Work Into a Predictable, Trackable Delivery Engine.";

const DESCRIPTION = (
  <>
    We design and standardize the workflows that sit behind your services <br /> so work moves
    through clear stages with defined ownership. Instead of relying on individual
    heroics, your team runs from shared playbooks, simple queues, and consistent views
    of what’s in progress, what’s blocked, and what’s done.
  </>
);

const CONTENT_BLOCKS: ScsContentBlockData[] = [
  {
    title: "1. End‑to‑End Process Mapping & Design",
    items: [
      "Outline how client work actually flows today—from intake through delivery and follow‑up.",
      "Simplify and re‑order steps so responsibilities are clear and work doesn't bounce between people or tools.",
      "Create practical checklists and stages that anyone on the team can follow.",
    ],
  },
  {
    title: "2. Execution Systems & Capacity Management",
    items: [
      "Implement task and ticket flows that match your real‑world processes, not the other way around.",
      "Give operators visibility into workload, bottlenecks, and handoffs without needing complex reports.",
      "Support ongoing refinement so your workflows can evolve as volume, team size, and offerings change.",
    ],
  },
];

interface DigitalSEOSolutionsProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const DigitalSEOSolutions: React.FC<DigitalSEOSolutionsProps> = ({
  imageSource = "/agent03.webp",
  imageAlt = "Operational flow and delivery systems illustration",
  className = ""
}) => {
  const router = useRouter();

  const handleLearnMoreClick = () => {
    router.push('/services');
  };

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
            action={<ScsLearnMoreButton onClick={handleLearnMoreClick} />}
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

export default DigitalSEOSolutions;
