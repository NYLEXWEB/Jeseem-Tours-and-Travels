"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const DESKTOP_SLIDES = [
    {
        src: "/hero_section/1.png",
        alt: "Jeseem Tours & Travels - Best Travel Agency in Alappuzha Kerala since 1985",
    },
    {
        src: "/hero_section/2.png",
        alt: "Customized International Tour Packages and Group Flight Bookings from Kerala by Jeseem Travels",
    },
    {
        src: "/hero_section/3.png",
        alt: "Global Visa Assistance, Document Attestation, and Luxury Holiday Tours in Alappuzha Kerala",
    },
];

const MOBILE_SLIDES = [
    {
        src: "/hero_section_mobile/1.jpg",
        alt: "Best Travel Agency in Alappuzha Kerala - Jeseem Tours & Travels",
    },
    {
        src: "/hero_section_mobile/mobile2.jpg",
        alt: "Munnar tea gardens and misty mountain lake vacation in Kerala - Jeseem Tours",
    },
    {
        src: "/hero_section_mobile/mobile3.jpg",
        alt: "Tropical paradise beach and turquoise ocean coastline tour packages - Jeseem Travels",
    },
];

// Display duration per image (5 seconds)
const DISPLAY_DURATION_MS = 5000;
// Cross-fade animation duration (1.5 seconds)
const FADE_DURATION_SEC = 1.5;

interface HeroBackgroundCarouselProps {
    onSlideChange?: (index: number) => void;
}

export default function HeroBackgroundCarousel({ onSlideChange }: HeroBackgroundCarouselProps) {
    const prefersReducedMotion = useReducedMotion();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Preload hero images immediately on mount based on screen width
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const slidesToPreload = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;
        slidesToPreload.forEach((slide) => {
            const img = new window.Image();
            img.src = slide.src;
        });
    }, []);

    // Main carousel interval logic (Cross-fade cycle)
    useEffect(() => {
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % DESKTOP_SLIDES.length);
        }, DISPLAY_DURATION_MS);

        return () => clearInterval(interval);
    }, [prefersReducedMotion]);

    // Notify parent component on slide change after render
    useEffect(() => {
        onSlideChange?.(currentIndex);
    }, [currentIndex, onSlideChange]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-white" aria-hidden="true">
            {/* Desktop Hero Carousel Layer (md and above) */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={`desktop-${currentIndex}`}
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
                            src={DESKTOP_SLIDES[currentIndex].src}
                            alt={DESKTOP_SLIDES[currentIndex].alt}
                            fill
                            className="object-cover object-center"
                            priority={currentIndex === 0}
                            sizes="(min-width: 768px) 100vw, 1px"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile Hero Carousel Layer (below md) */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={`mobile-${currentIndex}`}
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
                            src={MOBILE_SLIDES[currentIndex].src}
                            alt={MOBILE_SLIDES[currentIndex].alt}
                            fill
                            className="object-cover object-center"
                            priority={currentIndex === 0}
                            sizes="(max-width: 767px) 100vw, 1px"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
