'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation, Variants } from "motion/react";
import { IMAGE_SIZES } from '@/lib/image-sizes';

interface CalmImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

const CalmImageSection: React.FC<CalmImageProps> = ({
  src,
  alt,
  width = 1200,
  height = 900,
  priority = false,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentEffect, setCurrentEffect] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-10%' });
  const controls = useAnimation();

  // ✅ FIXED: Memoize the effects array so its reference doesn't change on every render
  const effects = useMemo(() => ['breathe', 'float', 'glow', 'pulse'], []);

  useEffect(() => {
    const effectCycle = setInterval(() => {
      setCurrentEffect((prev) => (prev + 1) % effects.length);
    }, 8000);

    return () => clearInterval(effectCycle);
  }, [effects]); // ✅ Now effects is a stable reference

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Properly typed variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants: Variants = {
    breathe: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    glow: {
      filter: [
        'brightness(1) saturate(1)',
        'brightness(1.1) saturate(1.2)',
        'brightness(1) saturate(1)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className={`calm-image-section ${className}`}>
      <motion.div
        ref={containerRef}
        className="image-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          className="image-wrapper"
          animate={effects[currentEffect]}
          variants={imageVariants}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={IMAGE_SIZES.calmHero}
            priority={priority}
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.div>
      </motion.div>
      
      <style jsx>{`
        .calm-image-section {
          padding: 4rem 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          background: transparent;
        }
        
        .image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .image-wrapper {
          position: relative;
        }
        
        @media (max-width: 768px) {
          .calm-image-section {
            padding: 2rem 1rem;
            min-height: 40vh;
          }
        }
      `}</style>
    </section>
  );
};

export default CalmImageSection;
