"use client";

import React, { useState, useEffect } from "react";

const HERO_IMAGES = [
    "/hero_section/1.png",
    "/hero_section/2.png",
    "/hero_section/3.png",
    "/hero_section/4.png",
    "/hero_section/5.png",
];

export default function HeroBackgroundCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-white pointer-events-none">
            {HERO_IMAGES.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt={`Hero Background ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                    style={{
                        opacity: i === currentIndex ? 0.75 : 0,
                    }}
                />
            ))}
            {/* Minimal Left-to-Right Fade Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none" />

            {/* Soft foggy blend transition to the white section below */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </div>
    );
}
