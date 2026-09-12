"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `onOutside` when a click lands outside the returned element ref.
 * Pass a stable callback (useCallback) so the listener is not re-bound every render.
 */
export function useOutsideClick<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onOutside]);

  return ref;
}
