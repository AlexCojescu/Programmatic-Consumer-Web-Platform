"use client";

import React from "react";
import { motion } from "motion/react";
import type { Transition } from "motion/react";
import type { ServiceImpactItem } from "./service-impact-card";

interface ServiceImpactModalProps {
  service: ServiceImpactItem;
  isMobile: boolean;
  layoutTransition: Transition;
  containerRef: React.RefObject<HTMLDivElement | null>;
  iconContainerStyle: React.CSSProperties;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  onClose: () => void;
}

/**
 * Expanded modal for a selected service impact area: full description,
 * bottlenecks/improvements lists, and metadata tags. Shares layoutIds with
 * the grid card so framer-motion morphs between them.
 */
export const ServiceImpactModal: React.FC<ServiceImpactModalProps> = ({
  service,
  isMobile,
  layoutTransition,
  containerRef,
  iconContainerStyle,
  titleStyle,
  descriptionStyle,
  onClose,
}) => {
  return (
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
        layoutId={`service-card-${service.id}`}
        layout
        ref={containerRef}
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
        onClick={onClose}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: isMobile ? "0.9rem" : "1.1rem",
          }}
        >
          <motion.div
            layoutId={`service-icon-${service.id}`}
            transition={layoutTransition}
            style={iconContainerStyle}
          >
            {service.icon}
          </motion.div>
          <div style={{ flex: 1 }}>
            <motion.h3
              layoutId={`service-title-${service.id}`}
              transition={layoutTransition}
              style={titleStyle}
            >
              {service.title}
            </motion.h3>
            <motion.p
              layoutId={`service-desc-${service.id}`}
              transition={layoutTransition}
              style={descriptionStyle}
            >
              {service.description}
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
                {service.bottlenecks.map((b, idx) => (
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
                {service.outcomes.map((o, idx) => (
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
            {service.metadata.split(" · ").map((tag, i) => (
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
  );
};
