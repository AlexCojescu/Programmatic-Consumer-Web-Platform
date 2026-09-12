"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EnterpriseHeroShell } from "@/features/home/components/enterprise-hero-shell";
import {
  EnterpriseServiceTab,
  type EnterpriseServiceOption,
} from "@/features/home/components/enterprise-service-tab";
import styles from "../styles/enterprise-services-hub.module.css";

interface EnterpriseServicesHubProps {
  className?: string;
}

const ServicePanels = {
  inbound: dynamic(() => import("./scs-01")),
  process: dynamic(() => import("./scs-03")),
  onboarding: dynamic(() => import("./scs-04")),
} as const;

const SERVICE_OPTIONS: EnterpriseServiceOption[] = [
  {
    id: "inbound",
    label: "Inbound Revenue & Intake Systems",
    shortLabel: "Inbound",
    description:
      "Align your inbound channels, routing rules, and handoffs into a clear, trackable intake process.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "process",
    label: "Process Management & Fulfillment Systems",
    shortLabel: "Fulfillment",
    description:
      "Turn delivery into a repeatable system instead of a series of one-off projects.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19V5m0 0l3 3M4 5L1 8M20 5v14m0 0l3-3m-3 3l-3-3M9 11l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "onboarding",
    label: "Client Onboarding Architecture",
    shortLabel: "Onboarding",
    description:
      "Design onboarding experiences that are simple for clients and straightforward for your team to run.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7h16M4 12h10M4 17h7M17 16l3-3-3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const EnterpriseServicesHub: React.FC<EnterpriseServicesHubProps> = ({
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState("inbound");
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === activeService) return;
    setActiveService(serviceId);
    setContentKey((prev) => prev + 1);
  };

  const handleTabsKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = SERVICE_OPTIONS.findIndex(
      (option) => option.id === activeService
    );
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % SERVICE_OPTIONS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex =
        (currentIndex - 1 + SERVICE_OPTIONS.length) % SERVICE_OPTIONS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = SERVICE_OPTIONS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextId = SERVICE_OPTIONS[nextIndex].id;
    handleServiceSelect(nextId);
    requestAnimationFrame(() => {
      document.getElementById(`service-tab-${nextId}`)?.focus();
    });
  };

  const ActiveComponent =
    ServicePanels[activeService as keyof typeof ServicePanels] ??
    ServicePanels.inbound;

  return (
    <div className={`${styles.enterpriseServicesHub} ${className}`}>
      {/* Hero Section */}
      <EnterpriseHeroShell isVisible={isVisible}>
        <div className={styles.titleSection}>
          <h1 className={styles.mainTitle}>
            Our Systems Integration Offerings
          </h1>
          <div className={styles.titleUnderline}></div>
        </div>

        <p className={styles.heroDescription}>
          Programmatic partners with service providers to design and run
          end-to-end operating systems across inbound sales, client
          onboarding, and fulfillment. We focus on tightening handoffs,
          reducing friction, and making day-to-day execution easier to
          manage and measure, regardless of your specific tools or KPIs.
        </p>

        {/* Service Navigation */}
        <div className={styles.serviceNavigation}>
          <div
            className={styles.serviceTabs}
            role="tablist"
            aria-label="Systems integration offerings"
            onKeyDown={handleTabsKeyDown}
          >
            {SERVICE_OPTIONS.map((option, index) => (
              <EnterpriseServiceTab
                key={option.id}
                option={option}
                index={index}
                isActive={activeService === option.id}
                onSelect={() => handleServiceSelect(option.id)}
              />
            ))}
          </div>
        </div>
      </EnterpriseHeroShell>

      {/* Service Content */}
      <section
        className={styles.serviceContent}
        role="tabpanel"
        id={`service-panel-${activeService}`}
        aria-labelledby={`service-tab-${activeService}`}
      >
        <div key={contentKey} className={styles.contentContainer}>
          <ActiveComponent />
        </div>
      </section>
    </div>
  );
};

export default EnterpriseServicesHub;
