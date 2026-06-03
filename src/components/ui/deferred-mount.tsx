"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface DeferredMountProps {
  children: ReactNode;
  fallback: ReactNode;
  /** Preload when within this distance of the viewport. */
  rootMargin?: string;
}

/** Renders children only when the placeholder nears the viewport. */
export function DeferredMount({
  children,
  fallback,
  rootMargin = "320px",
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return <div ref={ref}>{mounted ? children : fallback}</div>;
}
