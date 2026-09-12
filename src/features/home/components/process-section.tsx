"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import FadedGridBackground from "@/shared/ui/faded-grid-background";
import { HomeProcessColumns } from "@/features/home/components/home-process-columns";
import { HomeProcessHeading } from "@/features/home/components/home-process-heading";
import { HomeProcessCtaButton } from "@/features/home/components/home-process-cta-button";
import { HomeServiceBackdrop } from "@/features/home/components/home-service-backdrop";
import { HomeServiceModal } from "@/features/home/components/home-service-modal";
import {
  HomeServiceSpotlightCard,
  type HomeServiceData,
} from "@/features/home/components/home-service-spotlight-card";

const SalesOverview = dynamic(() => import("@/shared/ui/line-chart"), {
  loading: () => (
    <div className="flex min-h-[560px] w-full items-center justify-center">
      <div className="h-[420px] w-full max-w-xl rounded-lg bg-white/30 animate-pulse" />
    </div>
  ),
  ssr: false,
});

const SERVICES: HomeServiceData[] = [
  {
    id: "intake",
    icon: "🧭",
    title: "Unified Client Onboarding",
    description:
      "Design standardized intake and sales pipelines so every opportunity is captured, qualified, and handed off cleanly to onboarding and delivery.",
    details:
      "We engineer automated stage-gates between your CRM and provisioning stack to ensure no install is scheduled without a signed agreement, valid site survey, and verified lead data. By codifying these handoff checklists, we eliminate manual back-and-forth between sales and field ops",
    metadata: "Strategy · CRM · Process Design",
  },
  {
    id: "web",
    icon: "🌐",
    title: "Service Fulfillment & Dispatch",
    description:
      "Connect your NMS to your workflow layer. We automate work-order creation and SLA tracking to eliminate stuck tickets and missed install dates.",
    details:
      "We integrate your Network Management System (NMS) and Billing platform directly with your field dispatch tools. When a network alert triggers or a payment clears, our systems automatically generate work orders, route them to the correct regional technician, and update the customer’s activation status in real-time",
    metadata: "Next.js · Webflow · API Integration",
  },
  {
    id: "automation",
    icon: "⚙️",
    title: "Integrated Tool Architecture",
    description:
      "Implement automated handoffs, reminders, and task routing across your core tools to reduce drop-off and shrink project completion times.",
    details:
      "We replace shadow systems and manual CSV exports with a production-grade integration layer. Using custom scripts or orchestration tools, we ensure that data flows bi-directionally between your subscriber database, ticketing system, and communication tools, creating a single source of truth for your entire operation",
    metadata: "Make · Zapier · n8n · Custom Scripts",
  },
  {
    id: "analytics",
    icon: "📊",
    title: "Analytics & KPI Dashboards",
    description:
      "Implement reporting for time-to-onboard, show rate, task completion, and client satisfaction so operators can manage with real numbers.",
    details:
      "We build unified operational dashboards that aggregate data from your field logs, support tickets, and billing cycles. This gives leadership a single pane of glass to monitor regional performance, track the true cost-to-acquire, and identify bottlenecks in the fulfillment cycle before they impact churn",
    metadata: "Looker Studio · Retool · Custom Dashboards",
  },
];

const HEADING_GRADIENT_TEXT = "Scaling an ISP is a Systems Problem";
const HEADING_PLAIN_TEXT = "not a Headcount Problem";

const INTRO_TEXT =
  "Integrate your tools, standardize your workflows, and engineer systems that make onboarding, fulfillment, and support predictable and measurable.";

const CTA_LABEL = "Learn more about our process";

const layoutTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 36,
  mass: 0.6,
};

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [callback]);

  return ref;
};

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [current, setCurrent] = useState<HomeServiceData | null>(null);

  const ref = useOutsideClick(() => setCurrent(null));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 480);
      setIsTablet(width <= 768 && width > 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrent(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const commonStyles: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const containerStyle: React.CSSProperties = {
    ...commonStyles,
    background: "transparent",
    padding: isMobile ? "2rem 0 2.5rem 0" : "4rem 0 4.5rem 0",
    margin: 0,
    maxWidth: "100%",
    width: "100%",
    overflow: "visible",
    position: "relative",
  };

  const introStyle: React.CSSProperties = {
    ...commonStyles,
    fontSize: isMobile ? "0.8rem" : isTablet ? "1.1rem" : "1.35rem",
    color: "#4b5563",
    lineHeight: isMobile ? 1.5 : 1.7,
    maxWidth: "42rem",
    marginBottom: isMobile ? "1.25rem" : "2.5rem",
    fontWeight: 400,
    textAlign: "left",
  };

  const servicesGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: isMobile ? "0.75rem" : "1.5rem",
    marginBottom: 0,
    maxWidth: "100%",
  };

  const serviceTitleStyle: React.CSSProperties = {
    ...commonStyles,
    fontWeight: 600,
    color: "#111827",
    fontSize: isMobile ? "0.85rem" : "1.05rem",
    marginBottom: "0.25rem",
  };

  const serviceDescriptionStyle: React.CSSProperties = {
    ...commonStyles,
    color: "#6b7280",
    fontSize: isMobile ? "0.7rem" : "0.9rem",
    lineHeight: isMobile ? 1.5 : 1.6,
  };

  const ctaWrapperStyle: React.CSSProperties = {
    ...commonStyles,
    marginTop: isMobile ? "1.25rem" : "2.5rem",
  };

  const ctaButtonStyle: React.CSSProperties = {
    ...commonStyles,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: isMobile ? "0.65rem 1.3rem" : "0.9rem 2.25rem",
    borderRadius: "14px",
    fontSize: isMobile ? "0.75rem" : "1rem",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
    textDecoration: "none",
    boxShadow: "0 26px 70px rgba(0,0,0,0.45), 0 8px 22px rgba(0,0,0,0.45)",
  };

  const handleLearnMoreClick = () => {
    window.location.href = "/services";
  };

  return (
    <header style={containerStyle}>
      <FadedGridBackground />

      {/* Backdrop */}
      <AnimatePresence>{current && <HomeServiceBackdrop />}</AnimatePresence>

      {/* Expanded modal */}
      <AnimatePresence>
        {current && (
          <HomeServiceModal
            service={current}
            isMobile={isMobile}
            titleStyle={serviceTitleStyle}
            descriptionStyle={serviceDescriptionStyle}
            transition={layoutTransition}
            containerRef={ref}
            onClose={() => setCurrent(null)}
          />
        )}
      </AnimatePresence>

      {/* Heading */}
      <HomeProcessHeading
        isMobile={isMobile}
        isTablet={isTablet}
        gradientText={HEADING_GRADIENT_TEXT}
        plainText={HEADING_PLAIN_TEXT}
      />

      {/* Main row */}
      <HomeProcessColumns
        isMobile={isMobile}
        isTablet={isTablet}
        left={
          <>
            <p style={introStyle}>{INTRO_TEXT}</p>

            <div style={servicesGridStyle}>
              {SERVICES.map((service) => (
                <HomeServiceSpotlightCard
                  key={service.id}
                  service={service}
                  isMobile={isMobile}
                  isHoverEnabled={!current}
                  titleStyle={serviceTitleStyle}
                  descriptionStyle={serviceDescriptionStyle}
                  transition={layoutTransition}
                  onSelect={() => setCurrent(service)}
                />
              ))}
            </div>

            <div style={ctaWrapperStyle}>
              <HomeProcessCtaButton
                style={ctaButtonStyle}
                onClick={handleLearnMoreClick}
              >
                <span>{CTA_LABEL}</span>
              </HomeProcessCtaButton>
            </div>
          </>
        }
        right={<SalesOverview />}
      />
    </header>
  );
};

export default Header;
