"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

export interface VideoTextProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
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
        requestAnimationFrame(updateSvgMask);
        return;
      }
  
      const container = containerRef.current;
      const width = container.offsetWidth || container.clientWidth || 800;
      const height = container.offsetHeight || container.clientHeight || 200;
  
      if (width === 0 || height === 0) {
        requestAnimationFrame(updateSvgMask);
        return;
      }
  
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
  
      // Increased padding to prevent text cutoff at edges
      const paddingX = width * 0.50;   // 50% left + right
      const paddingY = height * 0.35;  // 35% top + bottom
  
      const viewBoxWidth = width + paddingX * 2;
      const viewBoxHeight = height + paddingY * 2;
  
      const x = viewBoxWidth / 2;
      const y = viewBoxHeight / 2;
  
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg'
        width='${viewBoxWidth}'
        height='${viewBoxHeight}'
        viewBox='0 0 ${viewBoxWidth} ${viewBoxHeight}'>
        <text
          x='${x}'
          y='${y}'
          font-size='${responsiveFontSize}'
          font-weight='${fontWeight}'
          text-anchor='middle'
          dominant-baseline='${dominantBaseline}'
          font-family='${fontFamily}'
          letter-spacing='-0.02em'
          fill='white'
        >${content}</text>
      </svg>`;
  
      setSvgMask(newSvgMask);
    };
  
    const t1 = setTimeout(updateSvgMask, 0);
    const t2 = setTimeout(updateSvgMask, 100);
    const t3 = setTimeout(updateSvgMask, 300);
  
    window.addEventListener("resize", updateSvgMask);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", updateSvgMask);
    };
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);
  

  const dataUrlMask = svgMask
    ? `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`
    : "none";

  const justifyClass =
    textAnchor === "start"
      ? "justify-start"
      : textAnchor === "end"
      ? "justify-end"
      : "justify-center";

  const maskPosition =
    textAnchor === "start"
      ? "left"
      : textAnchor === "end"
      ? "right"
      : "center";

  return (
    <div
      ref={containerRef}
      className={cn(
        `relative w-full h-full flex items-center ${justifyClass}`,
        className
      )}
    >
      {/* Fallback text when mask isn't ready */}
      {!svgMask && (
        <div
          className={`absolute inset-0 flex items-center ${justifyClass} pointer-events-none z-10`}
        >
          <span
            className="text-gray-900 font-bold"
            style={{
              fontSize:
                typeof fontSize === "number" ? `${fontSize}vw` : fontSize,
              fontWeight: fontWeight,
              fontFamily: fontFamily,
              letterSpacing: '-0.02em',
            }}
          >
            {content}
          </span>
        </div>
      )}

      {/* Masked video text with conventional black shadow */}
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
          filter: "drop-shadow(0.18em 0.18em 0.35em rgba(0,0,0,0.9))",
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


      <span className="sr-only">{content}</span>
    </div>
  );
}
