'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SCS.module.css';

interface DigitalSEOSolutionsProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const DigitalSEOSolutions: React.FC<DigitalSEOSolutionsProps> = ({
  imageSource = "/agent03.png",
  imageAlt = "Operational flow and delivery systems illustration",
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
            <h2 className={styles.mainTitle}>Operational Flow &amp; Delivery Systems</h2>
            <h3 className={styles.subtitle}>
              Turn Day‑to‑Day Work Into a Predictable, Trackable Delivery Engine.
            </h3>
            <p className={styles.description}>
              We design and standardize the workflows that sit behind your services <br /> so work moves
              through clear stages with defined ownership. Instead of relying on individual
              heroics, your team runs from shared playbooks, simple queues, and consistent views
              of what’s in progress, what’s blocked, and what’s done.
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
                1. End‑to‑End Process Mapping &amp; Design
              </h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span>
                    Outline how client work actually flows today—from intake through delivery and follow‑up.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Simplify and re‑order steps so responsibilities are clear and work doesn't bounce between people or tools.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Create practical checklists and stages that anyone on the team can follow.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>
                2. Execution Systems &amp; Capacity Management
              </h3>
              <div className={styles.bulletPoints}>
                <div className={styles.bulletItem}>
                  <span>
                    Implement task and ticket flows that match your real‑world processes, not the other way around.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Give operators visibility into workload, bottlenecks, and handoffs without needing complex reports.
                  </span>
                </div>
                <div className={styles.bulletItem}>
                  <span>
                    Support ongoing refinement so your workflows can evolve as volume, team size, and offerings change.
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

export default DigitalSEOSolutions;
