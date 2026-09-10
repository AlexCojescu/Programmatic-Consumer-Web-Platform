"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * Fixed blurred white backdrop shown behind the expanded homepage
 * service modal.
 */
export const HomeServiceBackdrop: React.FC = () => {
  return (
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
  );
};
