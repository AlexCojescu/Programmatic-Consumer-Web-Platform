"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  bottlenecks: string[];
  outcomes: string[];
  previewOutcome: string;
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
      setIsTablet(width <= 1024 && width > 480);
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
      id: "onboarding-activations",
      icon: "🚀",
      title: "Onboarding & Activations",
      description:
        "Move from slow, inconsistent activations to a streamlined onboarding engine. We eliminate handoffs, missing forms, and scheduling chaos by connecting your sales, provisioning, and field ops into one reliable system. Every install becomes predictable faster sign‑to‑activation, unified visibility across teams, and a standardized playbook that scales smoothly across all regions.",
      bottlenecks: [
        "Multiple handoffs between sales, provisioning, field techs, and billing with no single source of truth.",
        "Manual chasing of missing forms, signatures, and info.",
        "Technicians showing up unprepared or to bad appointments due to poor data flow.",
        "Region‑to‑region inconsistency: some teams “wing it,” others follow local hacks.",
      ],
      outcomes: [
        "Shorter time from signed contract to install/activation (faster revenue recognition).",
        "Standardized onboarding playbook across regions and teams.",
        "Higher show rate for key appointments (intake, site survey, install).",
        "Higher completion rate of customer tasks (forms, agreements, prep steps).",
        "Predictable install calendar with fewer reschedules and “no access” visits.",
        "Clear visibility into onboarding status for sales, ops, and support in one place.",
      ],
      previewOutcome:
        "Faster revenue recognition (shorter time from signed contract to install/activation)...",
      metadata: "Onboarding · Activations · Revenue",
    },
    {
      id: "delivery-support-networkops",
      icon: "📡",
      title: "Delivery, Support & Network Ops",
      description:
        "Turn your delivery and support operations into a synchronized ecosystem. We make sure every alert becomes action, every ticket finds an owner, and every work order closes without duplication or delay. With integrated systems and automated SLA tracking, you’ll see fewer fire drills, cleaner data, and a higher first‑time fix rate across your footprint.",
      bottlenecks: [
        "Tickets bouncing between teams because ownership is unclear.",
        "Network alerts not translating into actionable work for ops/support.",
        "Mismatched records (service active in one system, cancelled in another).",
        "Relying on spreadsheets and side‑channels (Slack, email) to reconcile data.",
      ],
      outcomes: [
        "Faster project / work‑order completion across the footprint.",
        "Lower volume of “stuck” tickets and fire‑drill escalations.",
        "Reduced rework loops (duplicate dispatches, repeated site visits).",
        "Clear SLAs and automated routing/notifications when SLAs are at risk.",
        "Better first‑time fix rate for field work and support cases.",
        "Consistent data between NMS, CRM, billing, and support tools.",
      ],
      previewOutcome:
        "Faster project and work‑order completion across your footprint...",
      metadata: "Support · Network Ops · SLAs",
    },
    {
      id: "revenue-retention-cx",
      icon: "💰",
      title: "Revenue, Retention & Customer Experience",
      description:
        "We help you tie operational excellence directly to revenue growth. By fixing the friction points in onboarding and support, customers stay longer, adopt faster, and spend more. Our systems connect data across teams so you can launch new offers confidently, reduce churn, and deliver a faster, cleaner customer journey.",
      bottlenecks: [
        "Customers cancelling before install due to slow or confusing onboarding.",
        "Lost upgrade/cross‑sell opportunities because data is siloed.",
        "No reliable way to tie operational KPIs to revenue and retention metrics.",
      ],
      outcomes: [
        "Higher activation and retention rates per cohort or region.",
        "Reduced churn driven by onboarding friction or support frustration.",
        "Better NPS/CSAT through faster, cleaner customer journeys.",
        "Ability to launch new offers/plans without breaking existing workflows.",
      ],
      previewOutcome:
        "Higher activation and retention rates per cohort or region...",
      metadata: "Revenue · Retention · Customer Experience",
    },
    {
      id: "internal-efficiency-scale",
      icon: "🏗️",
      title: "Internal Efficiency & Scalability",
      description:
        "Scale your operations without scaling your headcount. We codify your best processes into clear, consistent SOPs and dashboards that track live KPIs across installs, tickets, and onboarding. Leadership gains visibility, new hires ramp faster, and your organization stops running on gut feel — it runs on data.",
      bottlenecks: [
        "Key processes living in veterans’ heads instead of documented SOPs.",
        "Every region/team “doing things their own way,” blocking scale.",
        "Ops leaders making decisions from gut feel instead of reliable operational data.",
      ],
      outcomes: [
        "Fewer manual touches per order, ticket, or install.",
        "Clear roles, responsibilities, and SOPs across operations.",
        "Faster ramp time for new hires with documented workflows and training.",
        "Leadership dashboards that show live operational KPIs (onboarding, tickets, installs).",
        "Ability to handle more customers without adding headcount linearly.",
      ],
      previewOutcome:
        "Ability to handle more customers without adding headcount linearly...",
      metadata: "SOPs · Scale · Leadership Dashboards",
    },
    {
      id: "tooling-systems-integration",
      icon: "🧩",
      title: "Tooling & Systems Integration",
      description:
        "We unify your fragmented stack into one connected workflow — linking CRM, billing, NMS, field tools, and communication systems. No more duplicated data, scattered automations, or silent system failures. You get a clean architecture where every integration is stable, owned, and built to last.",
      bottlenecks: [
        "API keys, webhooks, and automations scattered across people and tools.",
        "Shadow systems built by individual team members that break silently.",
        "Tool sprawl: overlapping platforms with no coherent architecture.",
      ],
      outcomes: [
        "One integrated workflow spanning NMS, CRM, billing, ticketing, field tools, and communication platforms.",
        "Clean, automated data flows instead of CSV exports and manual updates.",
        "Clear system ownership and change‑management processes.",
      ],
      previewOutcome:
        "One integrated workflow spanning NMS, CRM, billing, ticketing, and field tools...",
      metadata: "Integrations · Data Flows · Architecture",
    },
    {
      id: "strategic-compliance",
      icon: "📜",
      title: "Strategic & Compliance",
      description:
        "Build a foundation of trust and control across your operations. We document your key processes for audit readiness, benchmark your performance, and establish a roadmap for continuous improvement — from onboarding to fulfillment to support. You gain measurable progress, predictable outcomes, and proof of ROI quarter after quarter.",
      bottlenecks: [
        "Inability to demonstrate consistent processes during audits or due diligence.",
        "No ownership for continuous improvement of operations—only firefighting.",
      ],
      outcomes: [
        "Documented, auditable processes for key regulatory/compliance requirements.",
        "Operational benchmarks set at the start and tracked over time to prove ROI.",
        "Clear roadmap for the next quarters of operational improvement (onboarding → fulfillment → support, etc.).",
      ],
      previewOutcome:
        "Documented, auditable processes for key regulatory/compliance requirements...",
      metadata: "Compliance · Strategy · Roadmapping",
    },
  ];

  const commonStyles: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const containerStyle: React.CSSProperties = {
    ...commonStyles,
    background: "transparent",
    padding: isMobile ? "2.75rem 0 3.25rem 0" : "4rem 0 4.5rem 0",
    margin: 0,
    maxWidth: "100%",
    width: "100%",
    overflow: "visible",
    position: "relative",
  };

  const headerContentWrapperStyle: React.CSSProperties = {
    ...commonStyles,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: isMobile ? "0 1.1rem" : isTablet ? "0 1.25rem" : "0 2.5rem",
    boxSizing: "border-box",
    marginBottom: isMobile ? "1.75rem" : "2.5rem",
  };

  const textColumnStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "72rem",
  };

  const headingStyle: React.CSSProperties = {
    ...commonStyles,
    fontSize: isMobile ? "1.7rem" : isTablet ? "3.1rem" : "3.6rem",
    fontWeight: 800,
    color: "#111827",
    lineHeight: isMobile ? 1.1 : 1.05,
    letterSpacing: isMobile ? "-0.03em" : "-0.04em",
    marginBottom: isMobile ? "0.7rem" : "1.1rem",
  };

  const gradientTextStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, #111827, #1f2937, #4b5563)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const introStyle: React.CSSProperties = {
    ...commonStyles,
    fontSize: isMobile ? "0.95rem" : isTablet ? "1.05rem" : "1.2rem",
    color: "#4b5563",
    lineHeight: 1.7,
    maxWidth: "42rem",
    fontWeight: 500,
    marginBottom: isMobile ? "0.6rem" : "0.75rem",
  };

  const hintStyle: React.CSSProperties = {
    ...commonStyles,
    fontSize: isMobile ? "0.85rem" : "0.95rem",
    color: "#6b7280",
    lineHeight: 1.6,
  };

  const gridWrapperStyle: React.CSSProperties = {
    ...commonStyles,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: isMobile ? "0 1.1rem" : isTablet ? "0 1.5rem" : "0 2rem",
    boxSizing: "border-box",
  };

  const servicesGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(2, minmax(0, 1fr))"
      : "repeat(2, minmax(0, 1fr))",
    gap: isMobile ? "1.35rem" : "2rem",
    maxWidth: "72rem",
    width: "100%",
    alignItems: "stretch",
  };

  const cardBasePadding = isMobile ? "1.35rem" : "2.1rem";

  const iconContainerStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: isMobile ? "0.6rem" : "0.7rem",
    borderRadius: "0.85rem",
    backgroundColor: "#f9fafb",
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    width: isMobile ? "2.7rem" : "3rem",
    height: isMobile ? "2.7rem" : "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const serviceTitleStyle: React.CSSProperties = {
    ...commonStyles,
    fontWeight: 600,
    color: "#111827",
    fontSize: isMobile ? "1rem" : "1.15rem",
    marginBottom: "0.4rem",
  };

  const serviceDescriptionStyle: React.CSSProperties = {
    ...commonStyles,
    color: "#6b7280",
    fontSize: isMobile ? "0.85rem" : "0.95rem",
    lineHeight: 1.7,
  };

  const layoutTransition = {
    type: "spring" as const,
    stiffness: 380,
    damping: 36,
    mass: 0.6,
  };

  return (
    <header style={containerStyle}>
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
                maxWidth: "40rem",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 25px 80px rgba(15, 23, 42, 0.18)",
                padding: isMobile ? "1.4rem" : "1.75rem",
                cursor: "pointer",
                overflow: "hidden",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              onClick={() => setCurrent(null)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "0.9rem" : "1.1rem",
                }}
              >
                <motion.div
                  layoutId={`service-icon-${current.id}`}
                  transition={layoutTransition}
                  style={iconContainerStyle}
                >
                  {current.icon}
                </motion.div>
                <div style={{ flex: 1 }}>
                  <motion.h3
                    layoutId={`service-title-${current.id}`}
                    transition={layoutTransition}
                    style={serviceTitleStyle}
                  >
                    {current.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`service-desc-${current.id}`}
                    transition={layoutTransition}
                    style={serviceDescriptionStyle}
                  >
                    {current.description}
                  </motion.p>
                </div>
              </div>

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
                  marginTop: isMobile ? "1.1rem" : "1.4rem",
                  paddingTop: isMobile ? "1.1rem" : "1.4rem",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: isMobile ? "1rem" : "1.4rem",
                    gridTemplateColumns: isMobile
                      ? "minmax(0,1fr)"
                      : "minmax(0,1fr) minmax(0,1fr)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: isMobile ? "0.75rem" : "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#6b7280",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Bottlenecks you solve
                    </p>
                    <ul
                      style={{
                        paddingLeft: "1rem",
                        color: "#374151",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {current.bottlenecks.map((b, idx) => (
                        <li key={idx} style={{ listStyleType: "disc" }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: isMobile ? "0.75rem" : "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#6b7280",
                        marginBottom: "0.4rem",
                      }}
                    >
                      High‑value improvements
                    </p>
                    <ul
                      style={{
                        paddingLeft: "1rem",
                        color: "#374151",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {current.outcomes.map((o, idx) => (
                        <li key={idx} style={{ listStyleType: "disc" }}>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                  }}
                >
                  {current.metadata.split(" · ").map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#f3f4f6",
                        color: "#6b7280",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
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

      {/* Heading + intro + hint */}
      <div style={headerContentWrapperStyle}>
        <div style={textColumnStyle}>
          <h1 style={headingStyle}>
            <span style={gradientTextStyle}>
              Where We Drive The Most Impact
            </span>
          </h1>
          <p style={introStyle}>
            Integrate your tools, standardize your workflows, and engineer
            back office systems that make onboarding, fulfillment, and support
            predictable and measurable.
          </p>
          <p style={hintStyle}>
            Each box shows the bottlenecks we solve and one high‑impact
            improvement — tap a box to view the full set of outcomes and
            details.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div style={gridWrapperStyle}>
        <div style={servicesGridStyle}>
          {services.map((service) => (
            <motion.div
              key={service.id}
              layoutId={`service-card-${service.id}`}
              layout
              initial={false}
              animate={{ borderRadius: 18 }}
              transition={layoutTransition}
              style={{
                ...commonStyles,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: isMobile ? "1rem" : "1.25rem",
                padding: cardBasePadding,
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 22px 70px rgba(15, 23, 42, 0.10)",
                cursor: "pointer",
                minHeight: isMobile ? "min(230px, auto)" : "260px",
              }}
              whileHover={
                !current && !isMobile
                  ? {
                      y: -3,
                      borderColor: "#d1d5db",
                      boxShadow:
                        "0 16px 40px -10px rgba(15, 23, 42, 0.22)",
                    }
                  : {}
              }
              onClick={() => setCurrent(service)}
            >
              <motion.div
                layoutId={`service-icon-${service.id}`}
                transition={layoutTransition}
                style={iconContainerStyle}
              >
                {service.icon}
              </motion.div>

              <div>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
