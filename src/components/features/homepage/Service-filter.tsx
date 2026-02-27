"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SCS01 from "./SCS01";
import SCS03 from "./SCS03";
import SCS04 from "./SCS04";
import FadedGridBackground from "@/components/ui/FadedGridBackground";
import styles from "./EnterpriseServicesHub.module.css";

interface ServiceOption {
  id: string;
  label: string;
  shortLabel?: string;
  component: React.ComponentType;
  description: string;
  icon: React.ReactNode;
}

interface EnterpriseServicesHubProps {
  className?: string;
}

const EnterpriseServicesHub: React.FC<EnterpriseServicesHubProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeService, setActiveService] = useState("inbound");
  const [contentKey, setContentKey] = useState(0);

  const serviceOptions: ServiceOption[] = [
    {
      id: "inbound",
      label: "Inbound Revenue & Intake Systems",
      shortLabel: "Inbound",
      component: SCS01,
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
      component: SCS03,
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
      component: SCS04,
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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTalkToExpertClick = () => {
    router.push("/contact");
  };

  const handleServiceHover = (serviceId: string) => {
    if (serviceId === activeService) return;
    setActiveService(serviceId);
    setContentKey((prev) => prev + 1);
  };

  const ActiveComponent =
    serviceOptions.find((option) => option.id === activeService)?.component ||
    SCS01;
  const activeServiceData = serviceOptions.find(
    (option) => option.id === activeService
  );

  return (
    <div className={`${styles.enterpriseServicesHub} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <FadedGridBackground />
        <div className={styles.heroWrapper}>
          <div
            className={`${styles.heroContent} ${
              isVisible ? styles.visible : ""
            }`}
          >
            {/* Main Content */}
            <div className={styles.contentWrapper}>
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
                <div className={styles.serviceTabs}>
                  {serviceOptions.map((option, index) => (
                    <button
                      key={option.id}
                      onMouseEnter={() => handleServiceHover(option.id)}
                      className={`${styles.serviceTab} ${
                        activeService === option.id ? styles.active : ""
                      }`}
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      <div className={styles.tabIcon}>{option.icon}</div>
                      <div className={styles.tabContent}>
                        <span className={styles.tabLabelFull}>
                          {option.label}
                        </span>
                        <span className={styles.tabLabelShort}>
                          {option.shortLabel}
                        </span>
                        <span className={styles.tabDescription}>
                          {option.id === "inbound" &&
                            "We make it easier for teams to respond quickly, qualify opportunities consistently, and move the right work into onboarding and delivery without confusion."}
                          {option.id === "process" &&
                            "We help define stages, responsibilities, and supporting tools so work moves forward predictably, progress is visible, and teams can manage capacity without constant firefighting."}
                          {option.id === "onboarding" &&
                            "We streamline steps, clarify expectations, and connect the necessary systems so new clients move from “yes” to “fully active” with fewer delays and much less manual follow-up."}
                        </span>
                      </div>
                      <div className={styles.tabIndicator}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className={styles.serviceContent}>
        <div key={contentKey} className={styles.contentContainer}>
          <ActiveComponent />
        </div>
      </section>
    </div>
  );
};

export default EnterpriseServicesHub;
