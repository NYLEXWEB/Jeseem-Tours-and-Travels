"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = "fade-up" | "blur-in" | "mask-reveal";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const getVariants = () => {
    switch (variant) {
      case "blur-in":
        return {
          hidden: { opacity: 0, filter: "blur(12px)", y: 15 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 },
        };
      case "mask-reveal":
        return {
          hidden: { y: "100%" },
          visible: { y: 0 },
        };
      case "fade-up":
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const animVariants = getVariants();

  if (variant === "mask-reveal") {
    return (
      <div className={`overflow-hidden relative ${className}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount: threshold }}
          variants={animVariants}
          transition={{
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={animVariants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: ReactNode;
  delayStep?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollStagger({
  children,
  delayStep = 0.1,
  threshold = 0.1,
  once = true,
  className = "",
}: ScrollStaggerProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delayStep,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
