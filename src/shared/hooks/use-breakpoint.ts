"use client";

import { useEffect, useState } from "react";

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
}

/**
 * Subscribe to viewport buckets via matchMedia instead of unthrottled resize.
 */
export function useBreakpoint(
  mobileQuery = "(max-width: 480px)",
  tabletQuery = "(min-width: 481px) and (max-width: 768px)"
): BreakpointState {
  const [state, setState] = useState<BreakpointState>({
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const mobile = window.matchMedia(mobileQuery);
    const tablet = window.matchMedia(tabletQuery);

    const update = () => {
      setState((prev) => {
        const next = { isMobile: mobile.matches, isTablet: tablet.matches };
        if (prev.isMobile === next.isMobile && prev.isTablet === next.isTablet) {
          return prev;
        }
        return next;
      });
    };

    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, [mobileQuery, tabletQuery]);

  return state;
}
