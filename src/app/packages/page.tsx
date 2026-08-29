"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Tag, Compass, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

const PACKAGES = [
  {
    id: "flight-ticketing",
    title: "Worldwide Flight Bookings",
    subtitle: "Group & Special Series Fares",
    price: "Best Rates",
    duration: "Flexible",
    category: "Flights",
    desc: "Seamless group flight ticketing and specialized series fares on premium airlines. Ideal for family tour delegations, pilgrim groups, and corporate travel.",
    image: "/horizon_expedition.jpg",
    highlights: ["Group bookings up to 100+ guests", "Special and Series airline fares", "Instant confirmation & seat blocks", "Emigration & terminal transfer support"],
  },
  {
    id: "domestic-kerala",
    title: "Kerala Backwater & Houseboat Holiday",
    subtitle: "God's Own Country Custom Tour",
    price: "Custom Quotes",
    duration: "6 Days",
    category: "Holidays",
    desc: "Explore Kerala's backwaters in Alappuzha, hill stations in Munnar, and pristine beaches with local private guides and premium stays.",
    image: "/about_intro.jpg",
    highlights: ["Premium houseboat cruise with dining", "Munnar tea plantation guided walks", "Chauffeur-driven private luxury car", "Traditional spa & beach resort stays"],
  },
  {
    id: "international-dubai",
    title: "Dubai & Desert Safari Package",
    subtitle: "Modern Middle East Expedition",
    price: "Custom Quotes",
    duration: "5 Days",
    category: "Holidays",
    desc: "Discover the spectacular skyline, luxury malls, cultural landmarks, and thrilling desert safaris of Dubai with a custom itinerary.",
    image: "/amalfi.jpg",
    highlights: ["Burj Khalifa VIP entry tickets", "Desert safari & traditional BBQ camp", "Private city transfers and guides", "Fast-tracked tourist visa processing"],
  },
  {
    id: "visa-assistance",
    title: "Global Visa & Document Attestation",
    subtitle: "Hassle-Free Processing Desk",
    price: "Service Fee Only",
    duration: "Varies",
    category: "Visa Desk",
    desc: "Speedy tourist and business visa processing alongside certified attestation services for educational, commercial, and personal documents.",
    image: "/kyoto.jpg",
    highlights: ["Document collection & secure returns", "Certificate Attestation support", "Emigration Clearance Coordination", "All major countries globally serviced"],
  },
  {
    id: "umrah-pilgrimage",
    title: "Hajj & Umrah Pilgrimage Tour",
    subtitle: "Dedicated Coordinates & Holy Stays",
    price: "Custom Packages",
    duration: "14 Days",
    category: "Pilgrimage",
    desc: "Deeply peaceful, highly coordinated pilgrimage journeys to Makkah and Madinah with hotels close to the holy mosques and premium ground transport.",
    image: "/serengeti.jpg",
    highlights: ["Makkah & Madinah close hotel stays", "Guided Ziyarat tour with experts", "Flight tickets & pilgrimage visa desk", "24/7 localized support team coordination"],
  }
];

const CATEGORIES = ["All", "Flights", "Holidays", "Visa Desk", "Pilgrimage"];

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
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">EXPEDITIONS</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.15}>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6">
              Bespoke Packages
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={0.8} delay={0.3}>
            <p className="text-[#86868B] text-lg max-w-xl font-light leading-relaxed">
              Custom travel formulas crafted by our senior travel designers, complete with luxury lodgings, transport, and hand-selected outings.
            </p>
          </ScrollReveal>
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
                <TiltCard maxRotation={4} className="flex flex-col h-full w-full">
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

                    <div className="w-full">
                      <Magnetic range={30} strength={0.3} className="w-full">
                        <Link
                          href={`/contact?package=${pkg.title}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full border border-white/15 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        >
                          Request Consultation
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
