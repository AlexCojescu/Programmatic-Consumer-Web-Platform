'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SCS.module.css';

interface StrategyConsultingSectionProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const StrategyConsultingSection: React.FC<StrategyConsultingSectionProps> = ({
  imageSource = "/agent01.png",
  imageAlt = "Revenue-grade data infrastructure illustration",
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
                width={250}
                height={130}
                className={styles.topImage}
              />
              <div className={styles.saucerShadow}></div>
            </div>
          </div>

          <div className={styles.leftContent}>
            <h2 className={styles.mainTitle}>Revenue‑Grade Data Infrastructure</h2>
            <h3 className={styles.subtitle}>
              Turn Disconnected Operational Data Into Clear Pipelines, Better Capacity Decisions, and Healthier Accounts.
            </h3>
            <p className={styles.description}>
              We connect the data behind your inbound revenue, onboarding, and fulfillment workflows
              into a single, usable view of your operation. With synchronized information across
              stages, teams can see where work is piling up, where clients are stalling, and where
              accounts are ready for expansion.
            </p>
            <button className={styles.learnMoreBtn} onClick={handleLearnMoreClick}>
              <span>Learn More</span>
              <svg
                className={styles.arrowIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M1 8h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              <h3 className={styles.blockTitle}>
                1. Inbound &amp; Intake Performance Visibility
              </h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span>
                    Map how inquiries, leads, and requests move from first touch through your intake
                    and qualification steps.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Highlight where response times, routing rules, or ownership gaps are slowing
                    things down.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Provide simple views so operators can balance volume, follow‑up, and handoffs
                    without digging through multiple tools.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>
                2. Onboarding &amp; Fulfillment Flow Analytics
              </h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span>
                    Trace client work from "yes" through onboarding and delivery, regardless of the
                    specific tools or KPIs you use.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Surface stages where tasks linger, information is missing, or responsibilities
                    are unclear.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Support recurring reviews so teams can adjust process, staffing, or expectations
                    before issues turn into churn.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
};

export default StrategyConsultingSection;
