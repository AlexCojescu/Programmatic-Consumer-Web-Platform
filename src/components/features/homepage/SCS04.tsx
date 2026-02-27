'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SCS.module.css';

interface IntelligentRAGInfrastructureProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const IntelligentRAGInfrastructure: React.FC<IntelligentRAGInfrastructureProps> = ({
  imageSource = "/agent04.png",
  imageAlt = "Client onboarding systems and experience illustration",
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
            <h2 className={styles.mainTitle}>Client Onboarding Systems &amp; Experience</h2>
            <h3 className={styles.subtitle}>
              Move New Clients From “Yes” to “Running” With Less Friction for Everyone.
            </h3>
            <p className={styles.description}>
              We build onboarding systems that are easy for clients to complete and straightforward
              for your team to manage. Every step, touchpoint, and handoff is mapped out, so
              expectations are clear, information arrives where it should, and new accounts become
              fully operational without dragging on for weeks.
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
                1. Onboarding Journey &amp; Playbook Design
              </h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span>
                    Define the ideal sequence of steps for new clients, from welcome through first meaningful outcome.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Clarify who does what on both sides, and what information or approvals are needed at each point.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Package this into simple guides, templates, and communications your team can reuse across accounts.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>
                2. System‑Backed Handoffs &amp; Tracking
              </h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span>
                    Connect forms, portals, communication tools, and internal systems so onboarding is managed in one flow.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Make it easy to see which clients are on track, which are stuck, and where your team needs to intervene.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Enable consistent follow‑through without depending on memory, spreadsheets, or ad‑hoc follow‑ups.
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

export default IntelligentRAGInfrastructure;
