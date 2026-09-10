'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScsPanelShell } from '@/features/home/components/scs-panel-shell';
import { ScsPanelImage } from '@/features/home/components/scs-panel-image';
import { ScsPanelIntro } from '@/features/home/components/scs-panel-intro';
import { ScsLearnMoreButton } from '@/features/home/components/scs-learn-more-button';
import {
  ScsContentBlock,
  type ScsContentBlockData,
} from '@/features/home/components/scs-content-block';

const MAIN_TITLE = "Revenue‑Grade Data Infrastructure";

const SUBTITLE =
  "Turn Disconnected Operational Data Into Clear Pipelines, Better Capacity Decisions, and Healthier Accounts.";

const DESCRIPTION =
  "We connect the data behind your inbound revenue, onboarding, and fulfillment workflows into a single, usable view of your operation. With synchronized information across stages, teams can see where work is piling up, where clients are stalling, and where accounts are ready for expansion.";

const CONTENT_BLOCKS: ScsContentBlockData[] = [
  {
    title: "1. Inbound & Intake Performance Visibility",
    items: [
      "Map how inquiries, leads, and requests move from first touch through your intake and qualification steps.",
      "Highlight where response times, routing rules, or ownership gaps are slowing things down.",
      "Provide simple views so operators can balance volume, follow‑up, and handoffs without digging through multiple tools.",
    ],
  },
  {
    title: "2. Onboarding & Fulfillment Flow Analytics",
    items: [
      'Trace client work from "yes" through onboarding and delivery, regardless of the specific tools or KPIs you use.',
      "Surface stages where tasks linger, information is missing, or responsibilities are unclear.",
      "Support recurring reviews so teams can adjust process, staffing, or expectations before issues turn into churn.",
    ],
  },
];

interface StrategyConsultingSectionProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const StrategyConsultingSection: React.FC<StrategyConsultingSectionProps> = ({
  imageSource = "/agent01.webp",
  imageAlt = "Revenue-grade data infrastructure illustration",
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

export default StrategyConsultingSection;
