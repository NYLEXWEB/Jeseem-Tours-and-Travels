"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Tag, Compass, Sparkles } from "lucide-react";

const PACKAGES = [
  {
    id: "horizon-jet",
    title: "The Horizon Expedition",
    subtitle: "Private Jet World Tour",
    price: "$145,000 / guest",
    duration: "24 Days",
    category: "Signature",
    desc: "An ultra-exclusive journey encompassing 8 global wonders, flying by privately chartered Boeing 757, staying at Aman & One&Only properties.",
    image: "/horizon_expedition.jpg",
    highlights: ["Boeing 757 executive cabin seating", "Private villa bookings at 6 stops", "Personal private guides & chefs", "Access to forbidden palaces & ruins"],
  },
  {
    id: "kyoto-zen",
    title: "Kyoto Zen Retreat",
    subtitle: "Cultural Heritage Tour",
    price: "$12,500 / guest",
    duration: "10 Days",
    category: "Culture",
    desc: "Experience the profound spirituality and exquisite culinary traditions of Japan's ancient capital with an elite guide.",
    image: "/kyoto.jpg",
    highlights: ["Ryokan stays with private hot springs", "Kyoto Imperial Palace private tour", "Michelin kaiseki dining pairings", "Zen garden design masterclass"],
  },
  {
    id: "amalfi-escape",
    title: "Amalfi Coastal Escape",
    subtitle: "Luxury Mediterranean Yachting",
    price: "$14,000 / guest",
    duration: "8 Days",
    category: "Relaxation",
    desc: "Cruise along the high cliffs of Positano, Ravello, and Capri on a private chartered yacht with dedicated crew.",
    image: "/amalfi.jpg",
    highlights: ["75ft yacht charter with captain & cook", "Cliffside hotel suite bookings", "Helicopter transfers from Naples", "Private beach club VIP passes"],
  },
  {
    id: "serengeti-safari",
    title: "Serengeti Migration Lodge Safari",
    subtitle: "Luxury African Wildlife",
    price: "$18,500 / guest",
    duration: "12 Days",
    category: "Nature",
    desc: "Immerse yourself in the classic African savannah during the Great Migration, staying in award-winning safari villas.",
    image: "/serengeti.jpg",
    highlights: ["Sunrise hot air balloon safaris", "Singita tented villa stay", "4x4 private game drives", "Savannah dining under stars"],
  },
  {
    id: "alpine-sanctuary",
    title: "Swiss Alpine Sanctuary",
    subtitle: "Glacier Skiing & Spa Care",
    price: "$11,000 / guest",
    duration: "7 Days",
    category: "Nature",
    desc: "Rejuvenate in Zermatt's mineral springs and ski pristine glacial powder with Olympic ski guides.",
    image: "/swiss_alps.jpg",
    highlights: ["Ski-in ski-out chalet suites", "Vals mineral spring luxury spa pass", "Glacier heli-skiing tour", "Private fondue culinary cabin"],
  }
];

const CATEGORIES = ["All", "Signature", "Culture", "Nature", "Relaxation"];

export default function Packages() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPackages = activeCategory === "All"
    ? PACKAGES
    : PACKAGES.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#080808] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">EXPEDITIONS</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6"
          >
            Bespoke Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#86868B] text-lg max-w-xl font-light leading-relaxed"
          >
            Custom travel formulas crafted by our senior travel designers, complete with luxury lodgings, transport, and hand-selected outings.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-white/10 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-white text-black font-bold scale-105"
                  : "bg-transparent text-[#86868B] border border-white/10 hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative bg-[#121212] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Header */}
                <div className="relative h-[180px] sm:h-[350px] w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />
                  <span className="absolute top-6 left-6 text-[10px] uppercase tracking-widest bg-amber-500 text-black px-3 py-1 font-extrabold rounded-full">
                    {pkg.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold mb-1 block">
                      {pkg.subtitle}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
                      {pkg.title}
                    </h2>
                    <p className="text-[#86868B] text-sm leading-relaxed mb-6 font-light">
                      {pkg.desc}
                    </p>

                    {/* Metadata details */}
                    <div className="flex gap-6 mb-6 text-xs text-[#86868B] border-t border-b border-white/5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-amber-500" />
                        <span>{pkg.price}</span>
                      </div>
                    </div>

                    {/* Highlights Outings */}
                    <div className="mb-8">
                      <h3 className="text-[10px] uppercase tracking-wider text-white font-bold mb-3">Highlights Included</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#86868B]">
                        {pkg.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/contact?package=${pkg.title}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full border border-white/15 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Request Consultation
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
