"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const HERO_IMAGES = [
    "/hero section/1.png",
    "/hero section/2.png",
    "/hero section/3.png",
    "/hero section/4.png",
    "/hero section/5.png",
];

// Display duration per image (5 seconds)
const DISPLAY_DURATION_MS = 5000;
// Cross-fade animation duration (1.5 seconds)
const FADE_DURATION_SEC = 1.5;

export default function HeroBackgroundCarousel() {
    const prefersReducedMotion = useReducedMotion();
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Preload all 5 hero images immediately on mount
    useEffect(() => {
        HERO_IMAGES.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, []);

    // Main carousel interval logic (Cross-fade cycle)
    useEffect(() => {
        if (prefersReducedMotion) return;

        timerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, DISPLAY_DURATION_MS);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentIndex, prefersReducedMotion]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-white">
            {/* Smooth Cross-Fade Image Layer */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: FADE_DURATION_SEC, ease: [0.4, 0, 0.2, 1] },
                        scale: { duration: 6, ease: "easeOut" },
                    }}
                    className="absolute inset-0 z-0 w-full h-full"
                >
                    <Image
                        src={HERO_IMAGES[currentIndex]}
                        alt={`Hero Background ${currentIndex + 1}`}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Minimal Left-to-Right Fade Gradient Overlay */}
            <div className="absolute inset-0 z-15 bg-gradient-to-r from-white/80 via-white/45 to-transparent pointer-events-none" />

            {/* Soft foggy blend transition to the white section below */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
        </div>
    );
}
