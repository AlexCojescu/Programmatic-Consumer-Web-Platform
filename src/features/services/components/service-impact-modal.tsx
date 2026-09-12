"use client";

import React from "react";
import { motion } from "motion/react";
import type { ServiceImpactItem } from "./service-impact-card";

interface ServiceImpactModalProps {
  service: ServiceImpactItem;
  isMobile: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  iconContainerStyle: React.CSSProperties;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  onClose: () => void;
}

/**
 * Expanded modal for a selected service impact area. Fade/scale only — no layout projection.
 */
export const ServiceImpactModal: React.FC<ServiceImpactModalProps> = ({
  service,
  isMobile,
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
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-impact-title-${service.id}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "40rem",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
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
          <div style={iconContainerStyle}>{service.icon}</div>
          <div style={{ flex: 1 }}>
            <h3 id={`service-impact-title-${service.id}`} style={titleStyle}>
              {service.title}
            </h3>
            <p style={descriptionStyle}>{service.description}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
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
                {service.bottlenecks.map((b) => (
                  <li key={b} style={{ listStyleType: "disc" }}>
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
                {service.outcomes.map((o) => (
                  <li key={o} style={{ listStyleType: "disc" }}>
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
            {service.metadata.split(" · ").map((tag) => (
              <span
                key={tag}
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
