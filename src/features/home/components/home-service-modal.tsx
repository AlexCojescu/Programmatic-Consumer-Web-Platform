"use client";

import React from "react";
import { motion } from "motion/react";
import type { Transition } from "motion/react";
import type { HomeServiceData } from "@/features/home/components/home-service-spotlight-card";

interface HomeServiceModalProps {
  service: HomeServiceData;
  isMobile: boolean;
  titleStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  transition: Transition;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

/**
 * Expanded homepage service card modal. Shares layout ids with
 * HomeServiceSpotlightCard for the shared-layout expand animation.
 */
export const HomeServiceModal: React.FC<HomeServiceModalProps> = ({
  service,
  isMobile,
  titleStyle,
  descriptionStyle,
  transition,
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
        layoutId={`service-card-${service.id}`}
        layout
        ref={containerRef}
        initial={false}
        animate={{ borderRadius: 16 }}
        exit={{ borderRadius: 16 }}
        transition={transition}
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
        onClick={onClose}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "0.3rem" : "0.4rem",
          }}
        >
          <motion.h3
            layoutId={`service-title-${service.id}`}
            transition={transition}
            style={{
              ...titleStyle,
              fontSize: isMobile ? "0.85rem" : titleStyle.fontSize,
            }}
          >
            {service.title}
          </motion.h3>
          <motion.p
            layoutId={`service-desc-${service.id}`}
            transition={transition}
            style={{
              ...descriptionStyle,
              fontSize: isMobile ? "0.7rem" : descriptionStyle.fontSize,
            }}
          >
            {service.description}
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
            {service.details}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isMobile ? "0.25rem" : "0.35rem",
            }}
          >
            {service.metadata.split(" · ").map((tag, i) => (
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
  );
};
