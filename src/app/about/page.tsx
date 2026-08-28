"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Users, BadgeCheck } from "lucide-react";

const VALUES = [
  {
    icon: Compass,
    title: "Bespoke Artistry",
    desc: "Every route is designed from a blank slate. We reject presets, templates, and generic travel packages in favor of highly customized itineraries."
  },
  {
    icon: ShieldCheck,
    title: "Absolute Discretion",
    desc: "We protect our clients' schedules, flight details, and residential details with military-grade privacy. Experience security and peace of mind."
  },
  {
    icon: Users,
    title: "VIP On-Ground Network",
    desc: "Our localized contacts are elite guides, cultural authorities, and hospitality directors who offer immediate entry into locked gates."
  },
  {
    icon: BadgeCheck,
    title: "Seamless Orchestration",
    desc: "From private jet takeoff to final villa checkouts, we monitor every step. Your only task is to be fully present and explore."
  }
];

export default function About() {
  return (
    <div className="bg-[#080808] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-4 block"
            >
              WHO WE ARE
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-8"
            >
              Jeseem Tours & Travels
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#86868B] text-lg font-light leading-relaxed mb-6 text-balance"
            >
              Founded on the belief that luxury is not in the material, but in the experiences that expand the soul. Jeseem Tours & Travels curates journeys that transcend the average.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#86868B] text-base font-light leading-relaxed mb-6"
            >
              We serve a selective client base of global leaders, artists, and families who require absolute seamless execution, authentic local entry, and complete discretion.
            </motion.p>
          </div>

          {/* Cinematic Side Image */}
          <div className="relative h-[220px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="/about_intro.jpg"
              alt="Serene mountain lake journey"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="border-t border-white/10 pt-20 mb-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">OUR STANDARDS</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">The Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-[#121212] border border-white/10 p-8 rounded-3xl flex flex-col items-start"
                >
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-6">
                    <IconComp className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{val.title}</h3>
                  <p className="text-[#86868B] text-xs leading-relaxed font-light">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing Banner */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] flex items-center justify-center text-center p-6 border border-white/10">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/75 z-10" />
            <Image
              src="/about_banner.jpg"
              alt="Night starry sky cabin"
              fill
              className="object-cover opacity-30"
            />
          </div>

          <div className="relative z-20 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">Let us design your next milestone</h3>
            <p className="text-sm text-[#86868B] font-light leading-relaxed mb-6">
              Our travel architects are ready to draft your bespoke itinerary. Start the discussion today.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
            >
              Consult an Architect
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
