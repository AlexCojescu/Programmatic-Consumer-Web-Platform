"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
}: VideoTextProps) {
  const content = React.Children.toArray(children).join("");
  const [svgMask, setSvgMask] = useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSvgMask = () => {
      if (!containerRef.current) {
        // Retry if container not ready
        requestAnimationFrame(updateSvgMask);
        return;
      }
      
      const container = containerRef.current;
      const width = container.offsetWidth || container.clientWidth || 800;
      const height = container.offsetHeight || container.clientHeight || 200;
      
      // Don't create mask if dimensions are invalid
      if (width === 0 || height === 0) {
        requestAnimationFrame(updateSvgMask);
        return;
      }
      
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
      
      // Use explicit dimensions for better browser compatibility
      // Align text to left by using text-anchor='start' and x position
      const xPosition = textAnchor === "start" ? "0%" : textAnchor === "end" ? "95%" : "50%";
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'><text x='${xPosition}' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}' fill='white'>${content}</text></svg>`;
      setSvgMask(newSvgMask);
    };

    // Initial update with multiple attempts to ensure container is ready
    const timer1 = setTimeout(updateSvgMask, 0);
    const timer2 = setTimeout(updateSvgMask, 100);
    const timer3 = setTimeout(updateSvgMask, 300);
    
    window.addEventListener("resize", updateSvgMask);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", updateSvgMask);
    };
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  const dataUrlMask = svgMask ? `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")` : "none";
  const justifyClass = textAnchor === "start" ? "justify-start" : textAnchor === "end" ? "justify-end" : "justify-center";
  const maskPosition = textAnchor === "start" ? "left" : textAnchor === "end" ? "right" : "center";

  // FIX: Changed the dynamic <Component> to a standard <div> to resolve the build error.
  // The 'as' prop has been removed as it was causing type conflicts in the Vercel build environment.
  return (
    <div ref={containerRef} className={cn(`relative w-full h-full flex items-center ${justifyClass}`, className)}>
      {/* Fallback text that's always visible when mask isn't ready */}
      {!svgMask && (
        <div className={`absolute inset-0 flex items-center ${justifyClass} pointer-events-none z-10`}>
          <span 
            className="text-gray-900 font-bold"
            style={{
              fontSize: typeof fontSize === "number" ? `${fontSize}vw` : fontSize,
              fontWeight: fontWeight,
              fontFamily: fontFamily,
            }}
          >
            {content}
          </span>
        </div>
      )}

      {/* Create a container that masks the video to only show within text */}
      <div
        className={`absolute inset-0 flex items-center ${justifyClass}`}
        style={{
          maskImage: svgMask ? dataUrlMask : "none",
          WebkitMaskImage: svgMask ? dataUrlMask : "none",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: maskPosition,
          WebkitMaskPosition: maskPosition,
          opacity: svgMask ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          visibility: svgMask ? "visible" : "hidden",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </div>
  );
}