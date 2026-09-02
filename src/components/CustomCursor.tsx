"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 380, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setHidden(false);

    const moveCursor = (e: MouseEvent) => {
      // Center 32px ring on cursor coordinates
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-black/60 flex items-center justify-center select-none shadow-sm"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        width: hovered ? (cursorText ? 82 : 44) : 32,
        height: hovered ? (cursorText ? 34 : 44) : 32,
        backgroundColor: hovered ? (cursorText ? "rgba(23, 23, 23, 0.95)" : "rgba(23, 23, 23, 0.12)") : "rgba(23, 23, 23, 0.04)",
        borderColor: hovered ? (cursorText ? "rgba(23, 23, 23, 0.95)" : "rgba(23, 23, 23, 0.8)") : "rgba(23, 23, 23, 0.4)",
        scale: hovered ? 1.12 : 1,
      }}
      transition={{ type: "spring", damping: 24, stiffness: 360, mass: 0.3 }}
    >
      {/* Center Dot or Hover Text */}
      {cursorText ? (
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-white px-2.5">
          {cursorText}
        </span>
      ) : (
        <motion.div
          animate={{ scale: hovered ? 1.5 : 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-2 h-2 rounded-full bg-[#171717]"
        />
      )}
    </motion.div>
  );
}
