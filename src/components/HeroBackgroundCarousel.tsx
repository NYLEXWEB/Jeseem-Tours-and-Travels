"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const DESKTOP_SLIDES = [
    {
        src: "/hero_section/best-travel-agency-alappuzha-kerala-flights-holidays.png",
        alt: "Jeseem Tours & Travels - Best Travel Agency in Alappuzha Kerala since 1985",
    },
    {
        src: "/hero_section/customized-international-holiday-packages-from-kerala.png",
        alt: "Customized International Tour Packages and Group Flight Bookings from Kerala by Jeseem Travels",
    },
    {
        src: "/hero_section/global-visa-assistance-certificate-attestation-alappuzha.png",
        alt: "Global Visa Assistance, Document Attestation, and Luxury Holiday Tours in Alappuzha Kerala",
    },
];

const MOBILE_SLIDES = [
    {
        src: "/hero_section_mobile/mobile-best-travel-agency-alappuzha-kerala.jpg",
        alt: "Best Travel Agency in Alappuzha Kerala - Jeseem Tours & Travels",
        objectPosition: "35% 65%",
    },
    {
        src: "/hero_section_mobile/mobile-munnar-kerala-holiday-packages.jpg",
        alt: "Munnar tea gardens and misty mountain lake vacation in Kerala - Jeseem Tours",
        objectPosition: "35% 60%",
    },
    {
        src: "/hero_section_mobile/mobile-tropical-beach-international-tour-packages.jpg",
        alt: "Tropical paradise beach and turquoise ocean coastline tour packages - Jeseem Travels",
        objectPosition: "35% 60%",
    },
];

const DISPLAY_DURATION_MS = 5000;
const FADE_DURATION_SEC = 0.8;

interface HeroBackgroundCarouselProps {
    onSlideChange?: (index: number) => void;
    activeSlideIndex?: number;
}

export default function HeroBackgroundCarousel({ onSlideChange, activeSlideIndex }: HeroBackgroundCarouselProps) {
    const prefersReducedMotion = useReducedMotion();
    const [internalIndex, setInternalIndex] = useState(0);

    const isControlled = activeSlideIndex !== undefined;
    const currentIndex = isControlled ? activeSlideIndex : internalIndex;

    const onSlideChangeRef = useRef(onSlideChange);
    useEffect(() => {
        onSlideChangeRef.current = onSlideChange;
    }, [onSlideChange]);

    const currentIndexRef = useRef(currentIndex);
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const slidesToPreload = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;
        slidesToPreload.forEach((slide) => {
            const img = new window.Image();
            img.src = slide.src;
        });
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            const nextIndex = (currentIndexRef.current + 1) % DESKTOP_SLIDES.length;
            if (!isControlled) {
                setInternalIndex(nextIndex);
            }
            onSlideChangeRef.current?.(nextIndex);
        }, DISPLAY_DURATION_MS);

        return () => clearInterval(interval);
    }, [prefersReducedMotion, isControlled]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black" aria-hidden="true">
            
            <div className="hidden md:block absolute inset-0 w-full h-full z-0">
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

            <div className="block md:hidden absolute inset-0 w-full h-full z-0">
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
                            className="object-cover"
                            style={{ objectPosition: MOBILE_SLIDES[currentIndex].objectPosition || "35% 65%" }}
                            priority={currentIndex === 0}
                            sizes="(max-width: 767px) 100vw, 1px"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-white/80 via-white/30 to-white/20" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white/65 via-white/25 to-transparent max-w-4xl" />
            
            <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-56 md:h-72 pointer-events-none z-20 bg-gradient-to-b from-transparent via-white/60 to-white" />
        </div>
    );
}
