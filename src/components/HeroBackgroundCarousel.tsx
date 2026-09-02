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
// Slide transition animation duration (1.3 seconds)
const TRANSITION_DURATION_SEC = 1.3;

export default function HeroBackgroundCarousel() {
    const prefersReducedMotion = useReducedMotion();

    // Current base image index (0..4)
    const [baseIndex, setBaseIndex] = useState(0);

    // Active incoming layer state during transition
    const [incoming, setIncoming] = useState<{
        index: number;
        direction: "right-to-left" | "left-to-right";
    } | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Preload all 5 hero images immediately on mount
    useEffect(() => {
        HERO_IMAGES.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, []);

    // Main carousel interval logic
    useEffect(() => {
        // If reduced motion is requested, do not run slide sequence
        if (prefersReducedMotion) return;

        // Start 5-second timer for the next slide transition
        timerRef.current = setTimeout(() => {
            const nextIdx = (baseIndex + 1) % HERO_IMAGES.length;

            // Determine alternating direction:
            // Transition 0->1 (1->2): FROM RIGHT TO LEFT
            // Transition 1->2 (2->3): FROM LEFT TO RIGHT
            // Transition 2->3 (3->4): FROM RIGHT TO LEFT
            // Transition 3->4 (4->5): FROM LEFT TO RIGHT
            // Transition 4->0 (5->1): FROM RIGHT TO LEFT
            const isRightToLeft = baseIndex % 2 === 0;
            const direction = isRightToLeft ? "right-to-left" : "left-to-right";

            setIncoming({ index: nextIdx, direction });
        }, DISPLAY_DURATION_MS);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [baseIndex, prefersReducedMotion]);

    // Handle completion of slide animation
    const handleAnimationComplete = () => {
        if (incoming !== null) {
            setBaseIndex(incoming.index);
            setIncoming(null);
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-white">
            {/* 1. Underlying Base Image Layer (Remains visible underneath incoming slide) */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                    src={HERO_IMAGES[baseIndex]}
                    alt={`Hero Background ${baseIndex + 1}`}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* 2. Top Incoming Image Layer (Slides physically over base image) */}
            <AnimatePresence>
                {incoming !== null && (
                    <motion.div
                        key={`incoming-${incoming.index}`}
                        initial={{
                            x: incoming.direction === "right-to-left" ? "100%" : "-100%",
                        }}
                        animate={{ x: "0%" }}
                        exit={{ opacity: 1 }}
                        transition={{
                            duration: TRANSITION_DURATION_SEC,
                            ease: [0.25, 1, 0.5, 1], // Smooth cinematic curve
                        }}
                        onAnimationComplete={handleAnimationComplete}
                        className="absolute inset-0 z-10 w-full h-full shadow-2xl"
                    >
                        <Image
                            src={HERO_IMAGES[incoming.index]}
                            alt={`Hero Background ${incoming.index + 1}`}
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="100vw"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Soft foggy blend transition to the white section below */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
        </div>
    );
}
