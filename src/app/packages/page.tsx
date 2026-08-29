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
    image: "/service_01.jpg",
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
    image: "/kerala_houseboat.jpg",
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
    image: "/dubai_safari.jpg",
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
    image: "/service_03.jpg",
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
    image: "/service_04.jpg",
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
    <div className="bg-[var(--background)] pt-32 pb-20 px-6">
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
                className="relative bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl overflow-hidden flex flex-col justify-between group"
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
                    <span className="absolute top-6 left-6 text-[10px] uppercase tracking-widest bg-amber-500 text-black px-3 py-1 font-extrabold rounded-full">
                      {pkg.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[var(--foreground-muted)] font-semibold mb-1 block">
                        {pkg.subtitle}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)] mb-4">
                        {pkg.title}
                      </h2>
                      <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-6 font-light">
                        {pkg.desc}
                      </p>

                      {/* Metadata details */}
                      <div className="flex gap-6 mb-6 text-xs text-[var(--foreground-muted)] border-t border-b border-[var(--border)] py-4">
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
                        <h3 className="text-[10px] uppercase tracking-wider text-[var(--foreground)] font-bold mb-3">Highlights Included</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[var(--foreground-muted)]">
                          {pkg.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                      <Magnetic range={25} strength={0.25} className="w-full sm:flex-1">
                        <Link
                          href={`/contact?package=${pkg.title}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
                        >
                          Inquire Now
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </Magnetic>
                      <Magnetic range={25} strength={0.25} className="w-full sm:flex-1">
                        <a
                          href={`https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(pkg.title)}"%20package.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                          </svg>
                          WhatsApp
                        </a>
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
