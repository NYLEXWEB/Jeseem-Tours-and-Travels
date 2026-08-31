"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CloudSun, Compass } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";

const DESTINATIONS = [
  {
    id: "kerala",
    name: "Kerala",
    country: "India",
    image: "/destinations/Kerala.png",
    coords: "10.8505° N, 76.2711° E",
    bestTime: "September – March",
    description: "Experience God's Own Country with serene backwaters, emerald tea gardens, palm-fringed beaches, and luxurious houseboat cruises tailored to your preference.",
    highlights: ["Private luxury houseboat cruise in Alappuzha", "Tea estate walks & mountain mist in Munnar", "Traditional Ayurvedic wellness & spa stays", "Wayanad wildlife sanctuaries & Kovalam beach resorts"],
  },
  {
    id: "lakshadweep",
    name: "Lakshadweep",
    country: "India",
    image: "/destinations/Lakshadweep.png",
    coords: "10.5667° N, 72.6417° E",
    bestTime: "October – May",
    description: "A breathtaking tropical archipelago surrounded by turquoise lagoons, thriving coral reefs, and white-sand beaches. Perfect for secluded luxury and ocean adventures.",
    highlights: ["Scuba diving & snorkeling in Bangaram atoll", "Lagoon kayaking & glass-bottom coral tours", "Exclusive island resort & beach villa stays", "Full permit assistance & island transfer support"],
  },
  {
    id: "georgia",
    name: "Georgia",
    country: "Caucasus / Europe",
    image: "/destinations/Georgia.png",
    coords: "41.7151° N, 44.8271° E",
    bestTime: "May – October",
    description: "A land of ancient Orthodox mountain monasteries, snow-capped Caucasus peaks, historic cobblestone streets, and legendary hospitality.",
    highlights: ["Tbilisi Old Town & cable car mountain vista", "Kazbegi mountain expedition & Gergeti church", "Sighnaghi wine region private tasting", "Batumi Black Sea coastal boulevard walks"],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    image: "/destinations/Maldives.png",
    coords: "3.2028° N, 73.2207° E",
    bestTime: "November – April",
    description: "The gold standard for romantic island luxury. Discover pristine overwater villas, private island dining, and vibrant coral reef marine sanctuaries.",
    highlights: ["Private overwater bungalow & villa stays", "Snorkeling with manta rays & sea turtles", "Underwater glass dining experience", "Scenic seaplane transfers across tropical atolls"],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: "/destinations/Dubai.png",
    coords: "25.2048° N, 55.2708° E",
    bestTime: "October – April",
    description: "A dazzling desert metropolis where world-record architecture, luxury shopping, desert dune safaris, and Arabian hospitality converge.",
    highlights: ["Burj Khalifa VIP observatory access", "Desert safari with private dune bashing & BBQ", "Luxury yacht cruise around Dubai Marina", "Fast-tracked UAE tourist visa processing"],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    country: "Southeast Asia",
    image: "/destinations/Malaysia.png",
    coords: "3.1390° N, 101.6869° E",
    bestTime: "Year-Round",
    description: "A captivating blend of futuristic cityscapes, UNESCO heritage towns, ancient rainforests, and idyllic island beaches in Langkawi.",
    highlights: ["Petronas Twin Towers & Kuala Lumpur skyline", "Langkawi island hopping & skycab ride", "Genting Highlands theme park & cable car", "Batu Caves heritage guided tour"],
  },
];

export default function Destinations() {
  return (
    <div className="bg-[var(--background)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-[#ff007f]" />
              <span className="text-xs uppercase tracking-widest text-brand-gradient font-bold">PORTFOLIO</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.15}>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6">
              The Destinations
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={0.8} delay={0.3}>
            <p className="text-[#86868B] text-lg max-w-xl font-light leading-relaxed">
              Curated selection of our flagship regions. Each represents our standards of safety, exclusivity, and cinematic landscape beauty.
            </p>
          </ScrollReveal>
        </div>

        {/* Destination List */}
        <div className="flex flex-col gap-28">
          {DESTINATIONS.map((dest, idx) => (
            <ScrollReveal
              key={dest.id}
              variant="fade-up"
              duration={0.8}
              once
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
            >
              {/* Destination Image Showcase */}
              <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 group shadow-xl">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-neutral-950/30 group-hover:bg-neutral-950/20 transition-colors" />
                <span className="absolute bottom-6 left-6 text-xs font-mono text-neutral-50/80 bg-neutral-950/60 px-3 py-1.5 rounded-full backdrop-blur-md">
                  {dest.coords}
                </span>
              </div>

              {/* Destination Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-xs uppercase tracking-widest text-[#ff007f] font-bold mb-2">
                  {dest.country}
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--foreground)] mb-6">
                  {dest.name}
                </h2>
                <p className="text-[var(--foreground-muted)] text-base leading-relaxed mb-6 font-light">
                  {dest.description}
                </p>

                {/* Best Season */}
                <div className="flex items-center gap-2 mb-6 text-xs text-[var(--foreground)] bg-[var(--card-bg)] px-4 py-2.5 rounded-full border border-[var(--border)]">
                  <CloudSun className="w-4 h-4 text-[#ff007f]" />
                  <span>Best Season: <b>{dest.bestTime}</b></span>
                </div>

                {/* Key Highlights */}
                <div className="w-full border-t border-[var(--border)] pt-6 mb-8">
                  <h3 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-bold mb-4">Sample Curated Outings</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--foreground-muted)]">
                    {dest.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#ff007f] font-bold mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <Magnetic range={30} strength={0.3}>
                    <Link
                      href={`/contact?destination=${dest.name}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient-btn font-semibold text-xs uppercase tracking-wider shadow-md w-full sm:w-auto justify-center"
                    >
                      Consult Custom Route
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Magnetic>
                  <Magnetic range={30} strength={0.3}>
                    <a
                      href={`https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(dest.name)}"%20destination%20itinerary.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors w-full sm:w-auto"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                      </svg>
                      WhatsApp Inquiry
                    </a>
                  </Magnetic>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CUSTOM DESTINATION INQUIRY BANNER */}
        <div className="mt-28 border-t border-[var(--border)] pt-20">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="bg-[var(--card-bg)] border border-[#c4007b]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4 text-left">
                <span className="text-xs uppercase tracking-widest text-[#ff007f] font-bold block">
                  CAN'T FIND YOUR DREAM LOCATION?
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Inquire For A Custom Destination
                </h2>
                <p className="text-[var(--foreground-muted)] text-base font-light leading-relaxed">
                  Have a specific city, country, or customized multi-stop itinerary in mind? Our travel architects build bespoke itineraries from scratch tailored to your exact budget, timeline, and preferences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <Magnetic range={30} strength={0.3}>
                  <Link
                    href="/contact?destination=Custom+Destination+Inquiry"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-gradient-btn text-white font-bold text-xs uppercase tracking-wider shadow-lg w-full sm:w-auto"
                  >
                    Custom Destination Inquiry
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic range={30} strength={0.3}>
                  <a
                    href="https://wa.me/919061858416?text=Hi%20Jeseem%20Tours,%20I%20would%20like%20to%20inquire%20about%20planning%20a%20custom%20destination%20trip."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors w-full sm:w-auto"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                    </svg>
                    WhatsApp Custom Inquiry
                  </a>
                </Magnetic>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
