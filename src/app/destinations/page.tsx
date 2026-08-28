"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CloudSun, Compass } from "lucide-react";

const DESTINATIONS = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: "/kyoto.jpg",
    coords: "35.0116° N, 135.7681° E",
    bestTime: "October – May",
    description: "Immerse yourself in Japan's cultural heart. Kyoto's ancient wooden temples, serene Zen rock gardens, and traditional teahouses offer an unparalleled voyage back in time.",
    highlights: ["Fushimi Inari-taisha Shrine at dawn", "Private bamboo forest walk in Arashiyama", "Geisha district custom dining in Gion", "Traditional tea ceremony guided by a master"],
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    image: "/amalfi.jpg",
    coords: "40.6340° N, 14.6027° E",
    bestTime: "May – September",
    description: "A vertical wonderland of pastel-colored towns clinging to rugged cliffs above the shimmering Tyrrhenian Sea. The Amalfi Coast represents the epitome of Mediterranean coastal luxury.",
    highlights: ["Sailing around Capri on a private yacht", "Secluded dining at cliffside Michelin restaurants", "Hiking the Path of the Gods with local guides", "Exploring historic lemon groves in Ravello"],
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    image: "/swiss_alps.jpg",
    coords: "46.8182° N, 8.2275° E",
    bestTime: "December – April (Ski), June – Sept (Hike)",
    description: "An alpine paradise offering world-class skiing, pristine glacial lakes, and ultra-exclusive mountain chalets. Perfect for high-altitude rejuvenation and adventure.",
    highlights: ["Helicopter ski touring in Zermatt", "Panoramic travel on the Glacier Express VIP Cabin", "Secluded thermal spa bath stays in Vals", "Private lakeside dining at Lake Lucerne"],
  },
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    image: "/serengeti.jpg",
    coords: "2.1540° S, 34.6857° E",
    bestTime: "January – March, June – October",
    description: "The classic theater of wild Africa. Witness the legendary Great Migration across sweeping golden savannahs, staying in absolute luxury inside remote safari lodges.",
    highlights: ["Private hot-air balloon flight at sunrise", "Sunset wildlife drives guided by veteran naturalists", "Ultra-luxury tented lodge stays at Singita", "Gourmet bush dinners under starfields"],
  }
];

export default function Destinations() {
  return (
    <div className="bg-[#080808] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">PORTFOLIO</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6"
          >
            The Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#86868B] text-lg max-w-xl font-light leading-relaxed"
          >
            Curated selection of our flagship regions. Each represents our standards of safety, exclusivity, and cinematic landscape beauty.
          </motion.p>
        </div>

        {/* Destination List */}
        <div className="flex flex-col gap-28">
          {DESTINATIONS.map((dest, idx) => (
            <motion.section
              key={dest.id}
              id={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Destination Image Showcase */}
              <div className="w-full lg:w-1/2 relative h-[200px] sm:h-[450px] rounded-3xl overflow-hidden border border-white/10 group">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-6 left-6 text-xs font-mono text-white/70 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                  {dest.coords}
                </span>
              </div>

              {/* Destination Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2">
                  {dest.country}
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                  {dest.name}
                </h2>
                <p className="text-[#86868B] text-base leading-relaxed mb-6 font-light">
                  {dest.description}
                </p>

                {/* Best Season */}
                <div className="flex items-center gap-2 mb-6 text-xs text-white/80 bg-white/5 px-4 py-2.5 rounded-full border border-white/10">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <span>Best Season: <b>{dest.bestTime}</b></span>
                </div>

                {/* Key Highlights */}
                <div className="w-full border-t border-white/10 pt-6 mb-8">
                  <h3 className="text-xs uppercase tracking-widest text-white font-bold mb-4">Sample Curated Outings</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#86868B]">
                    {dest.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?destination=${dest.name}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
                >
                  Consult Custom Route
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.section>
          ))}
        </div>

      </div>
    </div>
  );
}
