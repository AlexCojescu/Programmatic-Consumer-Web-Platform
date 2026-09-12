"use client";

import React from "react";
import { motion } from "motion/react";
import type { HomeServiceData } from "@/features/home/components/home-service-spotlight-card";

interface HomeServiceModalProps {
  service: HomeServiceData;
  isMobile: boolean;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

/**
 * Expanded homepage service card modal with a lightweight fade/scale entrance.
 */
export const HomeServiceModal: React.FC<HomeServiceModalProps> = ({
  service,
  isMobile,
  titleStyle,
  descriptionStyle,
  containerRef,
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
        aria-labelledby={`home-service-title-${service.id}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: isMobile ? "20rem" : "32rem",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          boxShadow: "0 25px 80px rgba(15, 23, 42, 0.18)",
          padding: isMobile ? "0.9rem" : "1.5rem",
          cursor: "pointer",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        onClick={onClose}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "0.3rem" : "0.4rem",
          }}
        >
          <h3
            id={`home-service-title-${service.id}`}
            style={{
              ...titleStyle,
              fontSize: isMobile ? "0.85rem" : titleStyle.fontSize,
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              ...descriptionStyle,
              fontSize: isMobile ? "0.7rem" : descriptionStyle.fontSize,
            }}
          >
            {service.description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
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
            {service.details}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isMobile ? "0.25rem" : "0.35rem",
            }}
          >
            {service.metadata.split(" · ").map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-block",
                  backgroundColor: "#f3f4f6",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.65rem" : "0.75rem",
                  fontWeight: 500,
                  padding: isMobile ? "0.15rem 0.45rem" : "0.2rem 0.55rem",
                  borderRadius: "999px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
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
