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

const MAIN_TITLE = "Intent-Driven Lead Generation";

const SUBTITLE =
  "Pinpoint Your Ideal Customer, Identify & Research Decision-Makers, Receive Custom-Crafted Icebreakers";

const DESCRIPTION =
  "We deliver a steady stream of high-intent leads, complete with personalized icebreakers, so you can focus on one thing: closing deals.";

const CONTENT_BLOCKS: ScsContentBlockData[] = [
  {
    title: "1. Precision Prospect Acquisition",
    items: [
      <><strong>Identify</strong> high-value prospects and decision-makers through robust intent signal analysis.</>,
      <><strong>Qualify</strong> leads efficiently by leveraging data-driven propensity scoring.</>,
      <><strong>Strategically</strong> segment target accounts to maximize resource allocation and return on investment.</>,
    ],
  },
  {
    title: "2. Automated Engagement & Conversion",
    items: [
      <><strong>Automate</strong> context-specific initial outreach for accelerated prospect engagement.</>,
      <><strong>Deploy</strong> multi-channel campaigns for consistent lead nurturing and pipeline progression.</>,
      <><strong>Integrate</strong> seamlessly with CRM and sales platforms to enhance operational efficiency.</>,
    ],
  },
];

interface IntentDrivenLeadGenerationProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const IntentDrivenLeadGeneration: React.FC<IntentDrivenLeadGenerationProps> = ({
  imageSource = "/agent02.webp",
  imageAlt = "Intent-Driven Lead Generation illustration",
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
            width={290}
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
            <ScsContentBlock
              key={i}
              title={block.title}
              items={block.items}
              showBulletDot
            />
          ))}
        </>
      }
    />
  );
};

export default IntentDrivenLeadGeneration;
