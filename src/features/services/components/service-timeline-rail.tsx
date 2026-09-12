"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export interface ServiceTimelineRailEntry {
  title: string;
  content: React.ReactNode;
}

interface ServiceTimelineRailProps {
  data: ServiceTimelineRailEntry[];
}

/**
 * Scroll-animated vertical timeline rail. Falls back to a static filled rail
 * when the user prefers reduced motion.
 */
export const ServiceTimelineRail: React.FC<ServiceTimelineRailProps> = ({
  data,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      const next = element.getBoundingClientRect().height;
      setHeight((prev) => (Math.abs(prev - next) < 1 ? prev : next));
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-transparent font-sans" ref={containerRef}>
      <div ref={ref} className="relative w-full">
        <div
          style={{ height: height + "px" }}
          className="absolute left-[1.1rem] lg:left-0 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-slate-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {prefersReducedMotion ? (
            <div className="absolute inset-x-0 top-0 h-full w-[2px] bg-gradient-to-t from-indigo-500 via-sky-500 to-transparent from-[0%] via-[10%] rounded-full opacity-80" />
          ) : (
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-indigo-500 via-sky-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          )}
        </div>

        {data.map((entry, index) => (
          <div key={index}>{entry.content}</div>
        ))}
      </div>
    </div>
  );
};
