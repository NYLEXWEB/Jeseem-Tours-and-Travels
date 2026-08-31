"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Users, BadgeCheck, Target, Eye, Award, CheckCircle2, Sparkles } from "lucide-react";
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
              <span className="text-xs uppercase tracking-widest text-[#c4007b] font-bold mb-4 block">
                WHO WE ARE
              </span>
            </ScrollReveal>
            <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-[var(--foreground)] mb-8">
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
                Whether you require group flight tickets, custom holiday planning, document attestation, emigration support, or dedicated Hajj & Umrah pilgrimage packages, our highly experienced desks process every request with complete reliability, speed, and 100% quality-ensured standards.
              </p>
            </ScrollReveal>
          </div>

          {/* Cinematic Side Image */}
          <div className="relative h-[220px] md:h-[450px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
            <Image
              src="/about.jpg"
              alt="Jeseem Tours & Travels About Intro"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* MISSION & VISION & 100% QUALITY GUARANTEE SECTION */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <ScrollReveal variant="fade-up" duration={0.8}>
              <span className="text-xs uppercase tracking-widest text-brand-gradient font-bold block mb-2">OUR PURPOSE & COMMITMENT</span>
            </ScrollReveal>
            <ScrollReveal variant="blur-in" duration={1.0} delay={0.15}>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[var(--foreground)]">Mission & Vision</h2>
            </ScrollReveal>
          </div>

          {/* Grid of Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Mission Card */}
            <ScrollReveal variant="fade-up" duration={0.8} delay={0.1}>
              <div className="bg-[var(--card-bg)] border border-[#c4007b]/20 p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between shadow-sm hover:border-[#c4007b]/40 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#7b0062]/10 border border-[#c4007b]/20 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-[#c4007b]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#c4007b] font-bold block mb-2">OUR MISSION</span>
                  <h3 className="text-2xl md:text-3xl font-light text-[var(--foreground)] tracking-tight mb-4">
                    Transparent & Seamless Global Travel
                  </h3>
                  <p className="text-[var(--foreground-muted)] text-sm md:text-base leading-relaxed font-light">
                    To deliver world-class, 100% quality-ensured travel solutions—from group flight ticket allocations and customized holiday packages to swift document attestations and visa clearances—empowering every client with transparent pricing, utmost comfort, and peace of mind.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs font-semibold text-[#c4007b]">
                  <CheckCircle2 className="w-4 h-4 text-[#ff007f]" />
                  Client-Centric Excellence Since 1985
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal variant="fade-up" duration={0.8} delay={0.25}>
              <div className="bg-[var(--card-bg)] border border-sky-500/20 p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between shadow-sm hover:border-sky-500/40 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6">
                    <Eye className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-sky-600 font-bold block mb-2">OUR VISION</span>
                  <h3 className="text-2xl md:text-3xl font-light text-[var(--foreground)] tracking-tight mb-4">
                    The Gold Standard in Travel Trust
                  </h3>
                  <p className="text-[var(--foreground-muted)] text-sm md:text-base leading-relaxed font-light">
                    To be recognized as the premier travel consultancy in Kerala and worldwide, celebrated for unyielding integrity, zero-compromise quality standards, zero hidden costs, and nurturing lifelong relationships with every passenger we serve.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs font-semibold text-sky-600">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  Building Lifelong Journeys & Trust
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 100% QUALITY ASSURANCE BANNER CARD */}
          <ScrollReveal variant="fade-up" duration={1.0} delay={0.3}>
            <div className="bg-brand-gradient-light border border-brand-gradient-light p-8 md:p-12 rounded-3xl shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gradient text-white font-bold text-[10px] uppercase tracking-widest mb-4 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% QUALITY ENSURED &middot; NO COMPROMISE
                  </div>
                  <h3 className="text-2xl md:text-4xl font-light text-[var(--foreground)] tracking-tight mb-3">
                    Zero Compromise on Quality of Service
                  </h3>
                  <p className="text-[var(--foreground-muted)] text-sm md:text-base font-light leading-relaxed">
                    At Jeseem Tours & Travels, service quality is absolute. We do not compromise on accuracy, safety, or timing. Every airline ticket, document attestation file, and travel itinerary undergoes multi-stage verification to ensure 100% precision and total satisfaction.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-full bg-brand-gradient-btn font-bold text-xs uppercase tracking-wider shadow-md inline-flex items-center gap-2"
                  >
                    Consult Quality Desks
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* FOUNDER & HERITAGE TRIBUTE SECTION - Clean White Light Theme with High Contrast Text */}
        <div className="border-t border-[var(--border)] pt-20 mb-24">
          <div className="bg-[var(--card-bg)] text-zinc-900 border border-[#c4007b]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              {/* Founder Portrait Photo */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden border-2 border-[#c4007b]/50 shadow-xl group bg-purple-50">
                  <Image
                    src="/Father photo.png"
                    alt="KUNJUMON ISMAIL (Founder)"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-white bg-brand-gradient font-bold px-3 py-1 rounded-full shadow-md inline-block">FOUNDER</span>
                  </div>
                </div>
              </div>

              {/* Founder Narrative Text */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <ScrollReveal variant="fade-up" duration={0.6}>
                  <span className="text-xs uppercase tracking-widest text-[#c4007b] font-bold block">
                    IN LOVING MEMORY & HERITAGE
                  </span>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" duration={0.8} delay={0.1}>
                  <h2 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight">
                    KUNJUMON ISMAIL <span className="text-sm font-bold text-[#c4007b] block sm:inline sm:ml-2">( late on 2022 )</span>
                  </h2>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" duration={0.8} delay={0.2}>
                  <p className="text-zinc-700 text-base font-light leading-relaxed">
                    Jeseem Tours & Travels was established in 1985 under the visionary leadership of <strong>Late KUNJUMON ISMAIL</strong>. For 37 dedication-filled years—from 1985 until his passing in late 2022—he personally nurtured the agency with unwavering honesty, warm hospitality, and deep commitment to every traveler.
                  </p>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" duration={0.8} delay={0.3}>
                  <p className="text-zinc-600 text-sm font-light leading-relaxed">
                    Today, his family and son carry forward his enduring legacy with the same values of trust and individual care that he instilled from day one.
                  </p>
                </ScrollReveal>

                <div className="pt-2 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#c4007b]/50" />
                  <span className="text-xs text-[#c4007b] font-mono font-semibold italic">37+ Years of Trusted Foundation</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-20 mb-24">
          <div className="text-center mb-16">
            <ScrollReveal variant="fade-up" duration={0.8}>
              <span className="text-xs uppercase tracking-widest text-[#ff007f] font-bold block mb-2">OUR STANDARDS</span>
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
                  className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-3xl flex flex-col items-start hover:border-[#c4007b]/40 transition-colors duration-300"
                >
                  <div className="p-3 bg-[var(--border)]/10 rounded-2xl border border-[var(--border)] mb-6">
                    <IconComp className="w-5 h-5 text-[#ff007f]" />
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
                  className="inline-block px-6 py-3 rounded-full bg-brand-gradient-btn text-white font-bold text-xs uppercase tracking-wider shadow-lg"
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
