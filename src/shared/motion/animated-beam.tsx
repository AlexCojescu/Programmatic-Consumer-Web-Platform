"use client"

import { RefObject, useEffect, useId, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/shared/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    let lastSignature = ""
    let frame = 0

    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()
      const signature = [
        containerRect.width,
        containerRect.height,
        fromRect.left,
        fromRect.top,
        toRect.left,
        toRect.top,
      ].join(":")

      if (signature === lastSignature) return
      lastSignature = signature

      const fromLeft = fromRect.left - containerRect.left
      const fromTop = fromRect.top - containerRect.top
      const toLeft = toRect.left - containerRect.left
      const toTop = toRect.top - containerRect.top

      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      })

      const startX = fromLeft + fromRect.width / 2 + startXOffset
      const startY = fromTop + fromRect.height / 2 + startYOffset
      const endX = toLeft + toRect.width / 2 + endXOffset
      const endY = toTop + toRect.height / 2 + endYOffset
      const controlY = startY - curvature

      setPathD(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
      )
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updatePath)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)

    if (containerRef.current) resizeObserver.observe(containerRef.current)
    if (fromRef.current) resizeObserver.observe(fromRef.current)
    if (toRef.current) resizeObserver.observe(toRef.current)

    const rafId = requestAnimationFrame(updatePath)
    const timeoutId = setTimeout(updatePath, 100)

    return () => {
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(frame)
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={prefersReducedMotion ? gradientStartColor : `url(#${id})`}
        strokeOpacity={prefersReducedMotion ? 0.55 : 1}
        strokeLinecap="round"
      />
      {!prefersReducedMotion ? (
        <defs>
          <motion.linearGradient
            className="transform-gpu"
            id={id}
            gradientUnits={"userSpaceOnUse"}
            initial={{
              x1: "0%",
              x2: "0%",
              y1: "0%",
              y2: "0%",
            }}
            animate={{
              x1: gradientCoordinates.x1,
              x2: gradientCoordinates.x2,
              y1: gradientCoordinates.y1,
              y2: gradientCoordinates.y2,
            }}
            transition={{
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
            <stop stopColor={gradientStartColor}></stop>
            <stop offset="32.5%" stopColor={gradientStopColor}></stop>
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            ></stop>
          </motion.linearGradient>
        </defs>
      ) : null}
    </svg>
  )
}
