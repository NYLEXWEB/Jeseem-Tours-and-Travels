"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-[linear-gradient(90deg,#912D6B_0%,#A12E69_25%,#B32E65_50%,#C72F62_75%,#D92F60_100%)] shadow-[0_0_12px_rgba(217,47,96,0.85)] pointer-events-none"
            style={{ scaleX }}
        />
    );
}
