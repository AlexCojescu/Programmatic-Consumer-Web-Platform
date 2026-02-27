'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SCS.module.css';

interface IntentDrivenLeadGenerationProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const IntentDrivenLeadGeneration: React.FC<IntentDrivenLeadGenerationProps> = ({
  imageSource = "/agent02.png",
  imageAlt = "Intent-Driven Lead Generation illustration",
  className = ""
}) => {
  const router = useRouter();

  const handleLearnMoreClick = () => {
    router.push('/services');
  };

  return (
    <section className={`${styles.strategyConsultingContainer} ${className}`}>
      <div className={styles.strategyConsultingCard}>
        {/* Left Side */}
        <div className={styles.leftSection}>
          {/* Image with shadow */}
          <div className={styles.imageContainer}>
            <div className={styles.imageWithShadow}>
              <Image
                src={imageSource}
                alt={imageAlt}
                width={290}
                height={130}
                className={styles.topImage}
              />
              <div className={styles.saucerShadow}></div>
            </div>
          </div>

          <div className={styles.leftContent}>
            <h2 className={styles.mainTitle}>Intent-Driven Lead Generation</h2>
            <h3 className={styles.subtitle}>
              Pinpoint Your Ideal Customer, Identify & Research Decision-Makers, Receive Custom-Crafted Icebreakers
            </h3>
            <p className={styles.description}>
              We deliver a steady stream of high-intent leads, complete with personalized icebreakers, so you can focus on one thing: closing deals.
            </p>
            <button className={styles.learnMoreBtn} onClick={handleLearnMoreClick}>
              <span>Learn More</span>
              <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.dividerLine}></div>

        {/* Right Side */}
        <div className={styles.rightSection}>
          <div className={styles.rightContent}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>1. Precision Prospect Acquisition</h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span>
                  <span><strong>Identify</strong> high-value prospects and decision-makers through robust intent signal analysis.</span>
                </div>
                <div className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span>
                  <span><strong>Qualify</strong> leads efficiently by leveraging data-driven propensity scoring.</span>
                </div>
                <div className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span>
                  <span><strong>Strategically</strong> segment target accounts to maximize resource allocation and return on investment.</span>
                </div>
              </div>
            </div>

            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>2. Automated Engagement & Conversion</h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span>
                  <span><strong>Automate</strong> context-specific initial outreach for accelerated prospect engagement.</span>
                </div>
                <div className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span>
                  <span><strong>Deploy</strong> multi-channel campaigns for consistent lead nurturing and pipeline progression.</span>
                </div>
                <div className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span>
                  <span><strong>Integrate</strong> seamlessly with CRM and sales platforms to enhance operational efficiency.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntentDrivenLeadGeneration;
