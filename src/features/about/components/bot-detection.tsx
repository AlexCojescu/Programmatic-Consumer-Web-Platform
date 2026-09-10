"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type BotDetectionProps = {
  cardTitle?: string;
  cardDescription?: string;
};

const positions = [
  { top: "80px", left: "34px" },
  { top: "161px", left: "90px" },
  { top: "120px", left: "230px" },
  { top: "203px", left: "165px" },
  { top: "100px", left: "120px" },
  { top: "164px", left: "15px" },
  { top: "238px", left: "61px" },
  { top: "180px", left: "237px" },
  { top: "53px", left: "204px" },
];

const BotDetection = ({
  cardTitle = "This is how we see your ops layer",
  cardDescription = "We turn the invisible parts of your business SOPs, tools, and handoffs into a single, documented system your team can actually run.",
}: BotDetectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(1);
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % positions.length),
      3000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "h-[30rem] w-full max-w-[350px]",
        "rounded-md bg-transparent",
      )}
    >
      <div className="absolute left-1/2 h-full min-w-[300px] max-w-[300px] -translate-x-1/2">
        <div className="relative h-[80%] w-full">
          {/* glow only outside the main circle */}
          <motion.div
            className="pointer-events-none absolute bottom-[20px] left-[148px] h-[250px] w-[250px] origin-bottom-left"
            style={{
              background:
                "radial-gradient(circle at 0% 100%, transparent 0, transparent 48px, rgba(15,23,42,0.35) 70px, transparent 65%)",
            }}
            initial={{ opacity: 0.8, rotate: -55 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              rotate: [-55, -40, -50, -45, -55, -50, -45, -50, -45, -55],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <ContainerMask />

          <svg
            width="100%"
            height="100%"
            className="pointer-events-none absolute left-0 top-0"
          >
            {positions.map((pos, i) => (
              <g key={i}>
                <rect
                  x={pos.left}
                  y={pos.top}
                  width={5}
                  height={5}
                  rx={1}
                  ry={1}
                  className="fill-slate-500"
                />
              </g>
            ))}
          </svg>

          <motion.div
            layoutId="highlight-dot"
            className="absolute flex h-[6.5px] w-[6.5px] -translate-x-[0.5px] -translate-y-[0.5px] items-center justify-center rounded-[1px] border-t border-emerald-400 bg-emerald-500 shadow-[0_0_10px_4px_rgba(16,185,129,0.7)]"
            style={positions[currentIndex]}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 70,
            }}
          >
            <motion.div
              key={`pulse-${currentIndex}`}
              className="absolute -left-1.5 -top-1.5 h-[300%] w-[270%] rounded-full border border-emerald-400"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.7, opacity: [0.7, 1, 0] }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 1.3,
              }}
            />
            <motion.div
              key={currentIndex}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 1.3,
              }}
              className="absolute -left-1.5 -top-1.5 h-[300%] w-[270%] scale-[1.3] rounded-full border border-emerald-500 shadow-[0_0_20px_4px_rgba(16,185,129,0.6)]"
            />
          </motion.div>

          {/* central node – uses same gradient as page background */}
          <div
            className="absolute bottom-2 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border border-slate-500/90 shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            style={{
              background:
                "linear-gradient(90deg, white 0%, white 1%, #EFF6FF 2%, #DBEAFE 100%)",
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-2 left-0 w-full px-3 translate-y-2">
  <h3 className="text-sm font-semibold text-slate-900">{cardTitle}</h3>
  <p className="mt-1 text-xs text-slate-700 leading-relaxed">
    {cardDescription}
  </p>
</div>

    </div>
  );
};

export default BotDetection;

const ContainerMask = () => {
  return (
    <>
      <div className="absolute left-1/2 top-[48px] h-full w-[130%] -translate-x-1/2 rounded-full border-t border-dashed border-slate-500/90" />
      <div className="absolute left-1/2 top-[100px] h-full w-[110%] -translate-x-1/2 rounded-full border-t border-dashed border-slate-500/90" />
      <div className="absolute left-1/2 top-[152px] h-full w-[100%] -translate-x-1/2 rounded-full border-t border-dashed border-slate-500/90" />
      <div className="absolute left-1/2 top-[204px] h-full w-[80%] -translate-x-1/2 rounded-full border-t border-dashed border-slate-500/90" />
    </>
  );
};
