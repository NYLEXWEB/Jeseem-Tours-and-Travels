"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, Calendar, User, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data for Premium Curated Assets
const DESTINATIONS = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    desc: "Ancient shrines, cherry blossoms, and timeless serenity.",
    image: "/kyoto.jpg",
    coords: "35.0116° N, 135.7681° E",
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    desc: "Cliffside luxury villas and deep blue Mediterranean horizons.",
    image: "/amalfi.jpg",
    coords: "40.6340° N, 14.6027° E",
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    desc: "Majestic snow peaks and secluded, premium mountain retreats.",
    image: "/swiss_alps.jpg",
    coords: "46.8182° N, 8.2275° E",
  },
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    desc: "Exclusive tented safaris and witness the Great Migration.",
    image: "/serengeti.jpg",
    coords: "2.1540° S, 34.6857° E",
  },
];

const PACKAGES = [
  {
    id: "horizon-jet",
    title: "The Horizon Expedition",
    subtitle: "Private Jet World Tour",
    price: "$145,000 / guest",
    duration: "24 Days",
    desc: "An ultra-exclusive journey encompassing 8 global wonders, flying by privately chartered Boeing 757, staying at Aman & One&Only properties.",
    image: "/horizon_expedition.jpg",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Bespoke Itinerary Curations",
    desc: "Journeys tailored completely around your preferences, Pace, and design of travel.",
    image: "/service_01.jpg",
  },
  {
    number: "02",
    title: "Private Jet & Yacht Charters",
    desc: "Exquisite transportation options tailored to secure your ultimate safety, comfort, and schedule.",
    image: "/service_02.jpg",
  },
  {
    number: "03",
    title: "VIP On-Ground Concierge",
    desc: "Unrestricted global access, booking private temples, VIP tables, and exclusive local entry.",
    image: "/service_03.jpg",
  },
  {
    number: "04",
    title: "Secluded Luxury Residences",
    desc: "Verified, ultra-premium villas, private islands, and luxury hotel suites with tailored butler care.",
    image: "/service_04.jpg",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Discover Your Vision",
    desc: "Collaborate with an expert travel architect to articulate your wanderlust design, pace, and bespoke desires.",
    image: "/step_01.jpg",
  },
  {
    number: "02",
    title: "Curate the Details",
    desc: "Receive a fully custom, hour-by-hour itinerary including select luxury accommodations, private guides, and exclusive bookings.",
    image: "/step_02.jpg",
  },
  {
    number: "03",
    title: "Experience Seamless Travel",
    desc: "Relax completely. With 24/7 dedicated support and VIP ground coordination, your journey unfolds effortlessly.",
    image: "/step_03.jpg",
  },
  {
    number: "04",
    title: "Remember and Revisit",
    desc: "Cherish the moments. We compile key photographic captures and notes from your journey for your personal vault.",
    image: "/step_04.jpg",
  },
];

const REVIEWS = [
  {
    quote: "Jeseem Tours and Travels reimagined how we see the world. Our journey through the temples of Kyoto and private retreats in Okinawa was orchestrated to perfection. It was travel as art.",
    author: "Eleanor Vance",
    role: "Collector & Global Traveler",
    destination: "Kyoto & Okinawa, Japan",
    rating: 5,
  },
  {
    quote: "The seamlessness of flying from Amalfi directly into a Swiss mountain estate with zero wait, private custom dining, and personal guides was spectacular. An unmatched experience.",
    author: "Marcus Aurelius Group",
    role: "CEO & Philanthropist",
    destination: "Alps & Amalfi Expedition",
    rating: 5,
  },
  {
    quote: "We reserved the Horizon private jet tour. Aman properties, private temples in Kyoto, and absolute privacy on our flights. Their on-ground team is incredible.",
    author: "Clara Templeton",
    role: "Art Curator",
    destination: "Signature Jet Tour",
    rating: 5,
  },
  {
    quote: "Booking custom retreats in Switzerland and Tanzania has never been this stress-free. Every butler, chauffeur, and local guide was vetted and outstanding.",
    author: "Dr. Aris Vance",
    role: "Neurosurgeon",
    destination: "Swiss Alps & Serengeti",
    rating: 5,
  },
  {
    quote: "We spent two weeks sailing around Positano and Capri on a private yacht. The captain was knowledgeable, the chef prepared amazing meals, and we had VIP access everywhere.",
    author: "Sasha & David K.",
    role: "Venture Partners",
    destination: "Amalfi Coast Yacht Tour",
    rating: 5,
  },
  {
    quote: "Their discrete coordination is what keeps us coming back. Everything from flight logs to villa allocations is handled with extreme security. Highly recommended.",
    author: "The Sterling Family",
    role: "Private Office",
    destination: "Custom Global Route",
    rating: 5,
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States for interactive UI elements
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeMobileReviewIdx, setActiveMobileReviewIdx] = useState(0);
  const [mobileSlideDirection, setMobileSlideDirection] = useState(1);

  const handlePrevMobileReview = () => {
    setMobileSlideDirection(-1);
    setActiveMobileReviewIdx((prev) => (prev === 0 ? REVIEWS.length : prev - 1));
  };

  const handleNextMobileReview = () => {
    setMobileSlideDirection(1);
    setActiveMobileReviewIdx((prev) => (prev === REVIEWS.length ? 0 : prev + 1));
  };
  
  // Refs for tracking sticky steps
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll logic for cinematic hero scaling
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);



  // Setup Step Intersection Observers
  useEffect(() => {
    const observers = stepRefs.current.map((ref, idx) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStepIdx(idx);
          }
        },
        { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#080808]">
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-transparent">
        {/* Background Image Panel */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
          <Image
            src="/hero_bg.jpg"
            alt="Immersive landscape"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 w-full z-20 flex flex-col items-start pt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Compass className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
              BESPOKE LUXURY JOURNEYS
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white flex flex-col mb-8 select-none">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              EXPLORE
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-stroke text-white/90"
            >
              WHAT&apos;S
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              NEXT.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[#86868B] text-base md:text-lg max-w-md mb-8 leading-relaxed font-light text-balance"
          >
            Jeseem Tours & Travels designs highly personalized adventures and premium charters around the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/packages"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
            >
              Explore Packages
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Plan A Trip
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] uppercase tracking-widest text-[#86868B] font-semibold">SCROLL</span>
          <div className="w-[1px] h-12 bg-white/20 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-amber-500 animate-[bounce_2s_infinite]" />
          </div>
        </motion.div>
      </section>

      {/* SINGLE STATIC FULL-SCREEN FIXED BACKGROUND CANVAS (POST-HERO) */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        {/* Cinematic dark overlay gradient to ensure high readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-black/85 to-[#080808] z-10" />
        <Image
          src="/about_banner.jpg"
          alt="Cinematic fixed travel canvas backdrop"
          fill
          className="object-cover opacity-35"
          sizes="100vw"
          priority
        />
      </div>

      {/* 2. INTRODUCTION / BRAND STORY */}
      <section className="relative py-48 px-6 overflow-hidden border-t border-white/5 flex items-center justify-center min-h-[80vh] z-10 bg-transparent">
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-6 block"
          >
            OUR TRAVEL PHILOSOPHY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-extralight tracking-tight leading-snug md:leading-normal text-white text-balance"
          >
            We believe travel is not just about changing locations. It is about shifting perspectives. We curate bespoke journeys that feel like a symphony of private, cinematic moments designed exclusively for you.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <Link href="/about" className="group text-xs uppercase tracking-widest text-white hover:text-amber-500 font-semibold inline-flex items-center gap-2 transition-all">
              Discover Jeseem Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. DESTINATIONS SECTION (Horizontal showcase) */}
      <section className="relative py-32 border-t border-white/5 overflow-hidden min-h-[90vh] flex flex-col justify-center z-10 bg-transparent">
        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-2">CURATED LOCATIONS</span>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white">Bespoke Destinations</h3>
            </div>
            <Link href="/destinations" className="text-xs uppercase tracking-widest text-white hover:text-amber-500 font-semibold inline-flex items-center gap-1">
              Browse All Destinations <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Infinite Loop Marquee Container */}
          <div className="w-full overflow-hidden py-4 mask-image-reveal">
            <div className="animate-marquee">
              {[...DESTINATIONS, ...DESTINATIONS].map((dest, idx) => (
                <motion.div
                  key={`${dest.id}-${idx}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.8, delay: (idx % DESTINATIONS.length) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative min-w-[280px] md:min-w-[420px] h-[380px] md:h-[550px] rounded-3xl overflow-hidden flex flex-col justify-end p-6 md:p-8 group select-none bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md"
                  data-cursor="explore"
                  whileHover={{ y: -8 }}
                >
                  {/* Image with zoom on hover */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  </div>

                  {/* Coordinates */}
                  <span className="absolute top-8 right-8 text-[10px] font-mono text-white/50 tracking-wider">
                    {dest.coords}
                  </span>

                  {/* Destination Metadata */}
                  <div className="relative z-10 flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-1">
                      {dest.country}
                    </span>
                    <h4 className="text-3xl font-light tracking-tight text-white mb-2">
                      {dest.name}
                    </h4>
                    <p className="text-sm text-[#86868B] group-hover:text-white/80 line-clamp-2 transition-colors duration-300 mb-6">
                      {dest.desc}
                    </p>
                    <Link
                      href={`/destinations#${dest.id}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-amber-500 font-semibold"
                    >
                      View Itinerary
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED LUXURY PACKAGE (Apple Product-Style Layout) */}
      <section className="relative py-32 border-t border-white/5 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center z-10 bg-transparent">
        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">LIMITED LAUNCH</span>
            <h3 className="text-4xl md:text-6xl font-extralight tracking-tight text-white">Signature Masterpiece</h3>
          </motion.div>

          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-3xl overflow-hidden bg-black/50 backdrop-blur-lg border border-white/10 flex flex-col lg:flex-row min-h-[500px] shadow-2xl"
            >
              {/* Flight Wing Cinematic Visual */}
              <div className="relative flex-1 min-h-[220px] lg:min-h-[500px] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/85 via-transparent to-transparent z-10" />
              </div>

              {/* Package Content Details */}
              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-20">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2">
                  {pkg.subtitle}
                </span>
                <h4 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
                  {pkg.title}
                </h4>
                <p className="text-[#86868B] text-base leading-relaxed mb-8 font-light">
                  {pkg.desc}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b border-white/10 py-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Includes</span>
                    <p className="text-sm font-semibold text-white mt-1">Global Private Flight</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Duration</span>
                    <p className="text-sm font-semibold text-white mt-1">{pkg.duration}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Pricing</span>
                    <p className="text-sm font-semibold text-white mt-1">{pkg.price}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Stays</span>
                    <p className="text-sm font-semibold text-white mt-1">Aman Residences</p>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
                  >
                    Request Cabin Allocation
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE SERVICES / WHY US */}
      <section className="relative py-32 border-t border-white/5 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full flex flex-col lg:flex-row gap-16">
          {/* Text List Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-4">LUXURY PROVISION</span>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-12">The Jeseem Provision</h3>
            
            <div className="flex flex-col gap-6">
              {SERVICES.map((srv, idx) => (
                <div
                  key={srv.number}
                  className={`border-b border-white/10 pb-6 cursor-pointer group transition-all duration-300 ${
                    activeServiceIdx === idx ? "opacity-100 pl-4" : "opacity-40 hover:opacity-75"
                  }`}
                  onMouseEnter={() => setActiveServiceIdx(idx)}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-xs font-mono font-bold mt-1 ${activeServiceIdx === idx ? "text-amber-500" : "text-white"}`}>
                      {srv.number}
                    </span>
                    <div>
                      <h4 className="text-xl md:text-2xl text-white font-normal mb-2 group-hover:text-amber-400 transition-colors">
                        {srv.title}
                      </h4>
                      {activeServiceIdx === idx && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-[#86868B] text-sm leading-relaxed max-w-md font-light mt-2"
                        >
                          {srv.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Cinematic Graphic Column - Glass backdrop showing active service */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-auto flex-1 relative min-h-[300px] lg:min-h-[550px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-md lg:self-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image
                  src={SERVICES[activeServiceIdx].image}
                  alt={SERVICES[activeServiceIdx].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-8 left-8 z-20">
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">PREVIEW</span>
              <p className="text-white text-xs font-mono mt-1">{SERVICES[activeServiceIdx].title}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. SCROLL STORYTELLING SECTION (Sticky timeline) */}
      <section className="relative py-32 border-t border-white/5 px-6 min-h-screen flex flex-col justify-center z-10 bg-transparent">
        <div className="max-w-7xl mx-auto relative z-20 w-full flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left Side: Sticky Visual Preview Panel (translucent frosted-glass card overlay) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 lg:sticky lg:top-32 lg:h-[500px] lg:self-start rounded-3xl overflow-hidden border border-white/10 order-2 lg:order-1 bg-black/40 backdrop-blur-md shadow-2xl min-h-[220px]"
          >
            <div className="relative w-full h-full min-h-[220px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIdx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-black/35 z-10" />
                  <Image
                    src={STEPS[activeStepIdx].image}
                    alt={STEPS[activeStepIdx].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">STAGE</span>
                <p className="text-amber-500 text-lg font-bold">{STEPS[activeStepIdx].number} — {STEPS[activeStepIdx].title}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Scroll Content list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col gap-40 py-24 pb-48 order-1 lg:order-2"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-4">THE METHODOLOGY</span>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">Designing Journeys</h3>
              <p className="text-[#86868B] text-base font-light leading-relaxed max-w-md">
                We craft tailored itineraries using a meticulous four-stage approach to ensure zero compromises and full travel alignment.
              </p>
            </div>

            <div className="flex flex-col gap-60">
              {STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  className="flex flex-col gap-4 border-l-2 border-white/10 pl-6 lg:pl-10 relative"
                >
                  {/* Vertical bar highlight */}
                  {activeStepIdx === idx && (
                    <motion.div
                      layoutId="step-indicator"
                      className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-amber-500"
                    />
                  )}
                  <span className={`text-sm font-mono font-bold ${activeStepIdx === idx ? "text-amber-500" : "text-white/40"}`}>
                    {step.number}
                  </span>
                  <h4 className="text-2xl text-white font-medium">{step.title}</h4>
                  <p className="text-[#86868B] text-base leading-relaxed font-light max-w-md">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 7. PREMIUM REVIEWS (Google Styled Reviews with Horizontal Scroll on Mobile) */}
      <section id="reviews" className="relative py-32 border-t border-white/5 px-6 bg-transparent z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-20">
          
          {/* Left Column: Sticky Title & Info */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 self-start space-y-6">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="text-xs uppercase tracking-widest text-white/70 font-bold">
                GOOGLE REVIEWS
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
              What our distinguished guests say.
            </h2>
            
            <p className="text-white/60 text-base leading-relaxed font-light">
              We take pride in crafting flawless, private journeys. Here is how our clients recount their travel experiences and bespoke itineraries.
            </p>
            
            {/* Google Rating Badge */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-white">4.9</span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/50 font-medium">115+ Google reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Masonry (Desktop) & Horizontal Scroll Carousel (Mobile) */}
          <div className="lg:w-2/3">
            {/* Mobile View: Arrow-controlled slider */}
            <div className="md:hidden flex flex-col items-center w-full">
              <div className="relative w-full flex items-center justify-between gap-1">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevMobileReview}
                  className="z-20 p-2.5 rounded-full bg-black/40 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-all flex items-center justify-center"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>

                {/* Card Container */}
                <div className="flex-1 max-w-[76vw] min-h-[350px] relative overflow-hidden flex items-stretch">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeMobileReviewIdx}
                      initial={{ opacity: 0, x: mobileSlideDirection > 0 ? 40 : -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: mobileSlideDirection > 0 ? -40 : 40 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full flex"
                    >
                      {activeMobileReviewIdx === 0 ? (
                        /* Cover Card */
                        <div className="w-full bg-white/90 backdrop-blur-md border border-[#dadce0]/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                              </svg>
                              <span className="text-xs uppercase tracking-widest text-[#5f6368] font-bold">Google Reviews</span>
                            </div>
                            <h3 className="text-xl font-light text-[#202124] leading-snug">
                              Bespoke Luxury Adventures
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-extrabold text-[#202124]">4.9</span>
                              <div>
                                <div className="flex text-amber-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                  ))}
                                </div>
                                <p className="text-[10px] text-[#5f6368]">115+ guest evaluations</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 mt-6">
                            <span>Swipe to browse reviews</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      ) : (
                        /* Review Card */
                        (() => {
                          const rev = REVIEWS[activeMobileReviewIdx - 1];
                          const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
                          const avatarColor = colors[(activeMobileReviewIdx - 1) % colors.length];
                          const initial = rev.author.charAt(0);
                          return (
                            <div className="w-full bg-white/95 backdrop-blur-md border border-[#dadce0]/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between text-left">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}>
                                      {initial}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-[#202124]">{rev.author}</h4>
                                      <p className="text-[10px] text-[#5f6368]">{rev.role}</p>
                                    </div>
                                  </div>
                                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                                  </svg>
                                </div>

                                <div className="flex items-center text-amber-500">
                                  {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                  ))}
                                </div>

                                <blockquote className="text-xs text-[#3c4043] leading-relaxed font-light line-clamp-6">
                                  &ldquo;{rev.quote}&rdquo;
                                </blockquote>
                              </div>

                              <div className="border-t border-[#f1f3f4] pt-4 mt-4 flex items-center justify-between">
                                <span className="text-[10px] text-amber-600 font-mono tracking-wider">{rev.destination}</span>
                                <span className="text-[10px] text-[#5f6368]">2 weeks ago</span>
                              </div>
                            </div>
                          );
                        })()
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextMobileReview}
                  className="z-20 p-2.5 rounded-full bg-black/40 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-all flex items-center justify-center"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-1.5 mt-6 pb-4">
                {Array.from({ length: REVIEWS.length + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMobileSlideDirection(i > activeMobileReviewIdx ? 1 : -1);
                      setActiveMobileReviewIdx(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeMobileReviewIdx === i ? "w-4 bg-amber-500" : "w-1.5 bg-white/20"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop View: Staggered Grid */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-6">
                {REVIEWS.filter((_, idx) => idx % 2 === 0).map((rev, idx) => {
                  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
                  const avatarColor = colors[idx % colors.length];
                  const initial = rev.author.charAt(0);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", borderColor: "#babcbf" }}
                      className="bg-white/90 backdrop-blur-md border border-[#dadce0]/50 p-8 rounded-3xl space-y-6 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}>
                            {initial}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#202124]">{rev.author}</h4>
                            <p className="text-[10px] text-[#5f6368]">{rev.role}</p>
                          </div>
                        </div>
                        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                      </div>

                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      
                      <blockquote className="text-[#3c4043] text-sm leading-relaxed font-light">
                        &ldquo;{rev.quote}&rdquo;
                      </blockquote>
                      
                      <div className="border-t border-[#f1f3f4] pt-4 flex items-center justify-between">
                        <span className="text-[10px] text-[#5f6368]">a month ago</span>
                        <span className="text-[10px] text-amber-600 font-mono tracking-wider">{rev.destination}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6 md:mt-12">
                {REVIEWS.filter((_, idx) => idx % 2 === 1).map((rev, idx) => {
                  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
                  const avatarColor = colors[(idx * 2 + 1) % colors.length];
                  const initial = rev.author.charAt(0);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", borderColor: "#babcbf" }}
                      className="bg-white/90 backdrop-blur-md border border-[#dadce0]/50 p-8 rounded-3xl space-y-6 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}>
                            {initial}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#202124]">{rev.author}</h4>
                            <p className="text-[10px] text-[#5f6368]">{rev.role}</p>
                          </div>
                        </div>
                        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                      </div>

                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      
                      <blockquote className="text-[#3c4043] text-sm leading-relaxed font-light">
                        &ldquo;{rev.quote}&rdquo;
                      </blockquote>
                      
                      <div className="border-t border-[#f1f3f4] pt-4 flex items-center justify-between">
                        <span className="text-[10px] text-[#5f6368]">2 weeks ago</span>
                        <span className="text-[10px] text-amber-600 font-mono tracking-wider">{rev.destination}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* 8. CALL TO ACTION (Climax) */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5 z-10 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto px-6 text-center z-20"
        >
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block mb-4">THE NEXT CHAPTER</span>
          <h2 className="text-4xl md:text-7xl font-extralight tracking-tight text-white mb-6 text-balance">
            Where will you go next?
          </h2>
          <p className="text-[#86868B] text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed font-light">
            Contact our travel architects today to curate your next private itinerary or reserve private jet allocation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
            >
              Consult an Architect
            </Link>
            <Link
              href="/destinations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Explore Destinations
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
