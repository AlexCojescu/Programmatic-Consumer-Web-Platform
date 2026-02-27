"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import SalesOverview from "@/components/ui/line-chart";
import FadedGridBackground from "@/components/ui/FadedGridBackground";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string;
  metadata: string;
}

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
  const [current, setCurrent] = useState<Service | null>(null);

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

  const services: Service[] = [
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

  const headingWrapperStyle: React.CSSProperties = {
    ...commonStyles,
    width: "100%",
    display: "block",
    textAlign: "left",
    marginBottom: isMobile ? "0.75rem" : "1.5rem",
    padding: isMobile || isTablet ? "0 1rem" : "0 2rem",
  };

  const headingStyle: React.CSSProperties = {
    ...commonStyles,
    fontSize: isMobile ? "1.5rem" : isTablet ? "2.75rem" : "4.5rem",
    fontWeight: 700,
    color: "#111827",
    lineHeight: isMobile ? 1.2 : 1.1,
    letterSpacing: "-0.025em",
    marginBottom: 0,
    maxWidth: isMobile || isTablet ? "100%" : "72rem",
    wordBreak: "normal",
  };

  const gradientTextStyle: React.CSSProperties = {
    background: "linear-gradient(to right, #111827, #4b5563, #111827)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const rowStyle: React.CSSProperties = {
    ...commonStyles,
    display: "flex",
    flexDirection: isMobile || isTablet ? "column" : "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: isMobile ? "1.25rem" : isTablet ? "2rem" : "3rem",
    margin: 0,
    padding: isMobile || isTablet ? "0 1rem" : "0 2rem",
    boxSizing: "border-box",
  };

  const leftColumnStyle: React.CSSProperties = {
    ...commonStyles,
    flex: isMobile || isTablet ? "1 1 100%" : "1 1 55%",
    maxWidth: isMobile || isTablet ? "100%" : "48rem",
    margin: 0,
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

  const iconContainerStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: isMobile ? "0.3rem" : "0.5rem",
    borderRadius: "0.75rem",
    backgroundColor: "#f9fafb",
    fontSize: isMobile ? "0.9rem" : "1.25rem",
    width: isMobile ? "1.8rem" : "2.5rem",
    height: isMobile ? "1.8rem" : "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  const rightColumnStyle: React.CSSProperties = {
    ...commonStyles,
    flex: isMobile || isTablet ? "1 1 100%" : "1 1 45%",
    maxWidth: isMobile || isTablet ? "100%" : "32rem",
    margin: isMobile || isTablet ? "0.25rem 0 0 0" : "7.8rem 0 0 0",
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#111827";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 26px 70px rgba(0,0,0,0.5), 0 10px 26px rgba(0,0,0,0.5)";
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#000000";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 26px 70px rgba(0,0,0,0.45), 0 8px 22px rgba(0,0,0,0.45)";
  };

  const handleLearnMoreClick = () => {
    window.location.href = "/services";
  };

  const layoutTransition = {
    type: "spring" as const,
    stiffness: 380,
    damping: 36,
    mass: 0.6,
  };

  return (
    <header style={containerStyle}>
      <FadedGridBackground />

      {/* Backdrop */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              backgroundColor: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Expanded modal */}
      <AnimatePresence>
        {current && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "grid",
              placeItems: "center",
              padding: isMobile ? "0.75rem" : "1rem",
            }}
          >
            <motion.div
              layoutId={`service-card-${current.id}`}
              layout
              ref={ref}
              initial={false}
              animate={{ borderRadius: 16 }}
              exit={{ borderRadius: 16 }}
              transition={layoutTransition}
              style={{
                width: "100%",
                maxWidth: isMobile ? "20rem" : "32rem",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 25px 80px rgba(15, 23, 42, 0.18)",
                padding: isMobile ? "0.9rem" : "1.5rem",
                cursor: "pointer",
                overflow: "hidden",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              onClick={() => setCurrent(null)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "0.3rem" : "0.4rem",
                }}
              >
                <motion.h3
                  layoutId={`service-title-${current.id}`}
                  transition={layoutTransition}
                  style={{
                    ...serviceTitleStyle,
                    fontSize: isMobile ? "0.85rem" : serviceTitleStyle.fontSize,
                  }}
                >
                  {current.title}
                </motion.h3>
                <motion.p
                  layoutId={`service-desc-${current.id}`}
                  transition={layoutTransition}
                  style={{
                    ...serviceDescriptionStyle,
                    fontSize: isMobile ? "0.7rem" : serviceDescriptionStyle.fontSize,
                  }}
                >
                  {current.description}
                </motion.p>
              </div>

              {/* Details blur-in */}
              <motion.div
                layout
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  filter: "blur(3px)",
                  transition: { duration: 0.1 },
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{
                  marginTop: isMobile ? "0.75rem" : "1rem",
                  paddingTop: isMobile ? "0.75rem" : "1rem",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <p
                  style={{
                    color: "#374151",
                    fontSize: isMobile ? "0.7rem" : "0.925rem",
                    lineHeight: isMobile ? 1.5 : 1.6,
                    marginBottom: isMobile ? "0.65rem" : "0.85rem",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  {current.details}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: isMobile ? "0.25rem" : "0.35rem",
                  }}
                >
                  {current.metadata.split(" · ").map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#f3f4f6",
                        color: "#6b7280",
                        fontSize: isMobile ? "0.65rem" : "0.75rem",
                        fontWeight: 500,
                        padding: isMobile ? "0.15rem 0.45rem" : "0.2rem 0.55rem",
                        borderRadius: "999px",
                        fontFamily:
                          "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Heading */}
      <div style={headingWrapperStyle}>
        <h1 style={headingStyle}>
          <span style={gradientTextStyle}>
            Scaling an ISP is a Systems Problem
          </span>
          <span
            style={{
              display: isMobile || isTablet ? "inline" : "block",
            }}
          >
            {" "}
            not a Headcount Problem
          </span>
        </h1>
      </div>

      {/* Main row */}
      <div style={rowStyle}>
        <div style={leftColumnStyle}>
          <p style={introStyle}>
            Integrate your tools, standardize your workflows, and engineer
            systems that make onboarding, fulfillment, and support
            predictable and measurable.
          </p>

          <div style={servicesGridStyle}>
            {services.map((service) => (
              <motion.div
                key={service.id}
                layoutId={`service-card-${service.id}`}
                layout
                initial={false}
                animate={{ borderRadius: 16 }}
                transition={layoutTransition}
                style={{
                  ...commonStyles,
                  padding: isMobile ? "0.7rem" : "1.25rem",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)",
                  cursor: "pointer",
                }}
                whileHover={
                  !current
                    ? {
                        y: -2,
                        borderColor: "#d1d5db",
                        boxShadow:
                          "0 12px 30px -8px rgba(15, 23, 42, 0.18)",
                      }
                    : {}
                }
                onClick={() => setCurrent(service)}
              >
                {/* If you want to actually show the icon, you can place this just above the title:
                    <div style={iconContainerStyle}>{service.icon}</div>
                */}
                <motion.h3
                  layoutId={`service-title-${service.id}`}
                  transition={layoutTransition}
                  style={serviceTitleStyle}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  layoutId={`service-desc-${service.id}`}
                  transition={layoutTransition}
                  style={serviceDescriptionStyle}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <div style={ctaWrapperStyle}>
            <button
              style={ctaButtonStyle}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleLearnMoreClick}
            >
              <span>Learn more about our process</span>
            </button>
          </div>
        </div>

        <div style={rightColumnStyle}>
          <SalesOverview />
        </div>
      </div>
    </header>
  );
};

export default Header;
