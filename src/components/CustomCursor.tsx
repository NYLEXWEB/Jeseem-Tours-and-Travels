"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setHidden(false);

    const moveCursor = (e: MouseEvent) => {
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: hovered ? (cursorText ? 2.5 : 1.5) : 1,
        backgroundColor: hovered && !cursorText ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      {cursorText && (
        <span className="text-[6px] tracking-widest text-black font-extrabold font-sans">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
