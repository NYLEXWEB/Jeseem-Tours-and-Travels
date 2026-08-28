"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxRotation = 10,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion Values for mouse positions
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const active = useMotionValue(0); // 0 = inactive, 1 = hovered

  // Spring animation configs
  const springConfig = { damping: 25, stiffness: 220, mass: 0.8 };
  const rotateXSpring = useSpring(x, springConfig);
  const rotateYSpring = useSpring(y, springConfig);
  const activeSpring = useSpring(active, springConfig);

  // Map position values to rotation degrees
  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Glare effect properties
  const glareOpacity = useTransform(activeSpring, [0, 1], [0, 0.15]);
  const glareX = useTransform(rotateYSpring, [-maxRotation, maxRotation], ["120%", "-20%"]);
  const glareY = useTransform(rotateXSpring, [-maxRotation, maxRotation], ["120%", "-20%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeY); // rotateX depends on vertical movement
    y.set(relativeX); // rotateY depends on horizontal movement
  };

  const handleMouseEnter = () => {
    active.set(1);
  };

  const handleMouseLeave = () => {
    active.set(0);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        perspective: `${perspective}px`,
      }}
    >
      <motion.div
        className="w-full h-full relative overflow-hidden rounded-3xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Child elements inside the card */}
        <div style={{ transform: "translateZ(0px)" }} className="w-full h-full">
          {children}
        </div>

        {/* Glossy radial glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
            // Set dynamic CSS custom properties for position mapping
            left: glareX,
            top: glareY,
            width: "150%",
            height: "150%",
            transform: "translate(-25%, -25%)",
          }}
        />
      </motion.div>
    </div>
  );
}
