"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Users, BadgeCheck } from "lucide-react";
import ScrollReveal, { ScrollStagger } from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";
import { COMPANY_DETAILS } from "@/constants/company";

const VALUES = [
  {
    icon: Compass,
    title: "Save on Fares",
    desc: "We secure exclusive group flight tickets, special airline series fares, and excellent hotel rates so you can travel affordably."
  },
  {
    icon: Users,
    title: "Plan Custom Routes",
    desc: "Our team designs custom itineraries for domestic and international holidays built around your preferences and timeline."
  },
  {
    icon: ShieldCheck,
    title: "Global Visa & Document Care",
    desc: "We take care of hassle-free visa processing, quick certificate attestation, and reliable emigration clearance support."
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service Since 1985",
    desc: "Based in Alappuzha, Kerala, we bring nearly four decades of professional coordinates and travel trust to every journey."
  }
];

export default function About() {
  return (
    <div className="bg-[var(--background)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <ScrollReveal variant="fade-up" duration={0.8}>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-4 block">
                WHO WE ARE
              </span>
            </ScrollReveal>
            <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-8">
                Jeseem Tours & Travels
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={0.8} delay={0.25}>
              <p className="text-[var(--foreground-muted)] text-lg font-light leading-relaxed mb-6 text-balance">
                Founded in {COMPANY_DETAILS.established} in Thiruvampady, Alappuzha, Jeseem Tours & Travels has been a trusted symbol of travel excellence for nearly four decades. Our core mission is summarized in our tagline: <b>Save - Plan - Go</b>.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={0.8} delay={0.35}>
              <p className="text-[var(--foreground-muted)] text-base font-light leading-relaxed mb-6">
                Whether you require group flight tickets, custom holiday planning, document attestation, emigration support, or dedicated Hajj & Umrah pilgrimage packages, our highly experienced desks process every request with complete reliability and speed.
              </p>
            </ScrollReveal>
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

        <div className="border-t border-[var(--border)] pt-20 mb-24">
          <div className="text-center mb-16">
            <ScrollReveal variant="fade-up" duration={0.8}>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">OUR STANDARDS</span>
            </ScrollReveal>
            <ScrollReveal variant="blur-in" duration={1.0} delay={0.15}>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">The Core Pillars</h2>
            </ScrollReveal>
          </div>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <ScrollReveal
                  key={val.title}
                  variant="fade-up"
                  duration={0.6}
                  once
                  className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-3xl flex flex-col items-start hover:border-amber-500/30 transition-colors duration-300"
                >
                  <div className="p-3 bg-[var(--border)]/10 rounded-2xl border border-[var(--border)] mb-6">
                    <IconComp className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">{val.title}</h3>
                  <p className="text-[var(--foreground-muted)] text-xs leading-relaxed font-light">{val.desc}</p>
                </ScrollReveal>
              );
            })}
          </ScrollStagger>
        </div>

        {/* Closing Banner */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] flex items-center justify-center text-center p-6 border border-[var(--border)]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-neutral-950/75 z-10" />
            <Image
              src="/about_banner.jpg"
              alt="Night starry sky cabin"
              fill
              className="object-cover opacity-30"
            />
          </div>

          <div className="relative z-20 max-w-2xl">
            <ScrollReveal variant="fade-up" duration={0.8}>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-50 mb-4">Let us plan your next journey</h3>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={0.8} delay={0.15}>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                Our dedicated flight, visa, and holiday coordinators are ready to help you plan your next trip. Get in touch with our team today.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={0.8} delay={0.3} className="inline-block">
              <Magnetic range={30} strength={0.3}>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-full bg-neutral-50 text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-50 transition-all duration-300"
                >
                  Contact Our Desks
                </Link>
              </Magnetic>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </div>
  );
}
