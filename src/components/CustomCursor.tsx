"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  /** Rotation angle in degrees to align arrow pointer direction (Default: -90) */
  rotationAngle?: number;
}

export default function CustomCursor({ rotationAngle = -90 }: CustomCursorProps) {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setHidden(false);

    const moveCursor = (e: MouseEvent) => {
      // Hotspot calibrated to exact top-left tip of custom cursor.png
      cursorX.set(e.clientX - 2);
      cursorY.set(e.clientY - 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea");
      const hasExplore = target.closest("[data-cursor='explore']");
      const hasView = target.closest("[data-cursor='view']");

      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }

      if (hasExplore) {
        setCursorText("EXPLORE");
        setHovered(true);
      } else if (hasView) {
        setCursorText("VIEW");
        setHovered(true);
      } else {
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-start gap-2 select-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* 3D Arrow Image from public/custom cursor.png with Code Rotation Option */}
      <motion.div
        animate={{
          scale: hovered ? (cursorText ? 1.35 : 1.2) : 1,
          rotate: hovered ? rotationAngle - 8 : rotationAngle,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 350 }}
        className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 drop-shadow-[0_4px_12px_rgba(217,47,96,0.65)]"
      >
        <Image
          src="/custom cursor.png"
          alt="Custom Cursor"
          width={36}
          height={36}
          className="w-full h-full object-contain pointer-events-none"
          priority
        />
      </motion.div>

      {/* Hover Text Badge (EXPLORE / VIEW) */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -4 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="mt-1 px-2.5 py-1 rounded-full bg-[linear-gradient(99deg,#912D6B_0%,#A12E69_25%,#B32E65_50%,#C72F62_75%,#D92F60_100%)] text-white text-[9px] font-extrabold uppercase tracking-widest shadow-xl border border-white/20"
        >
          {cursorText}
        </motion.div>
      )}
    </motion.div>
  );
}
