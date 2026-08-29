"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, Calendar, User, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";
import ScrollReveal, { ScrollStagger } from "@/components/ScrollReveal";
import { COMPANY_DETAILS } from "@/constants/company";

// Curated Assets and Details
const DESTINATIONS = [
  {
    id: "alappuzha",
    name: "Alappuzha",
    country: "India (Kerala)",
    desc: "Pristine houseboats, serene backwaters, and local culinary delights.",
    image: "/about_intro.jpg",
    coords: "9.4981° N, 76.3388° E",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    desc: "Futuristic skyscrapers, desert safaris, and luxurious shopping.",
    image: "/amalfi.jpg",
    coords: "25.2048° N, 55.2708° E",
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    desc: "Majestic snow peaks and scenic panoramic train expeditions.",
    image: "/swiss_alps.jpg",
    coords: "46.8182° N, 8.2275° E",
  },
  {
    id: "serengeti",
    name: "Serengeti",
    country: "Tanzania",
    desc: "Wild savannah reserves and the breathtaking Great Migration.",
    image: "/serengeti.jpg",
    coords: "2.1540° S, 34.6857° E",
  },
];

const PACKAGES = [
  {
    id: "flight-ticketing",
    title: "Worldwide Flight Bookings",
    subtitle: "Group & Special / Series Fares",
    price: "Best Rates Guaranteed",
    duration: "Flexible Dates",
    desc: "Get exclusive access to group bookings, special flight deals, and series fares. Perfect for corporate travel, family delegations, and pilgrimage groups.",
    image: "/horizon_expedition.jpg",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Flight & Ticket Bookings",
    desc: "Access competitive group booking options, special fares, and series fares on all major airlines worldwide.",
    image: "/service_01.jpg",
  },
  {
    number: "02",
    title: "Domestic & International Holidays",
    desc: "Completely customized packages, honeymoon specials, and corporate retreats tailored to your timeline and budget.",
    image: "/service_02.jpg",
  },
  {
    number: "03",
    title: "Global Visa & Document Support",
    desc: "Hassle-free visa assistance, document attestation services, and emigration clearance support for all countries.",
    image: "/service_03.jpg",
  },
  {
    number: "04",
    title: "Pilgrimage, Hajj & Umrah Services",
    desc: "Dedicated coordinates and premium hotel arrangements for holy Hajj & Umrah journeys with maximum comfort.",
    image: "/service_04.jpg",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Save & Plan",
    desc: "Consult our travel agents to find group bookings, low flight ticket rates, and custom itineraries for your destinations.",
    image: "/step_01.jpg",
  },
  {
    number: "02",
    title: "Visa & Clearances",
    desc: "Our documents desk processes your visa assistance, certificate attestation, and emigration clearances seamlessly.",
    image: "/step_02.jpg",
  },
  {
    number: "03",
    title: "Go & Experience",
    desc: "Go on your trip confidently with pre-arranged airport transfers, comprehensive travel insurance, and 24/7 hotline support.",
    image: "/step_03.jpg",
  },
  {
    number: "04",
    title: "Return & Review",
    desc: "Arrive home with beautiful memories. Our travel desks remain ready to assist with your future tickets and packages.",
    image: "/step_04.jpg",
  },
];

const REVIEWS = [
  {
    quote: "Jeseem Tours made our family holiday to Dubai completely hassle-free. From flight bookings with special fares to visa processing and hotel booking, everything was perfect.",
    author: "Ragesh Kurup",
    role: "Business Owner",
    destination: "Dubai Family Tour",
    rating: 5,
  },
  {
    quote: "I've been booking our company's corporate flight tickets with Jeseem since 2018. Their ability to secure group bookings and series fares saves us substantial costs every year.",
    author: "Nithin Madhavan",
    role: "Managing Director",
    destination: "Corporate Travel Solutions",
    rating: 5,
  },
  {
    quote: "Highly recommend Jeseem's visa assistance and certificate attestation services. They handled my document attestation for the UAE visa quickly and professionally.",
    author: "Fathima Hameed",
    role: "Software Engineer",
    destination: "Visa & Attestation Support",
    rating: 5,
  },
  {
    quote: "Our customized honeymoon tour to Kashmir was organized beautifully by their holiday team. Very professional, punctual airport transfers, and excellent hotels.",
    author: "Dr. Anand & Anupama",
    role: "Pediatrician",
    destination: "Kashmir Honeymoon",
    rating: 5,
  },
  {
    quote: "We chose Jeseem Tours for our parents' Umrah pilgrimage. The hotel bookings near the Haram, ground transport, and guidance were outstanding. Very satisfied.",
    author: "Sharafudeen K. A.",
    role: "Gulf Expatriate",
    destination: "Umrah Pilgrimage Package",
    rating: 5,
  },
  {
    quote: "Reliable and fast emigration clearance and passport support. The team at the Alappuzha head office was extremely helpful and answered all questions patiently.",
    author: "Joseph Antony",
    role: "Merchant Navy Officer",
    destination: "Emigration & Travel Support",
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

  const heroRef = useRef<HTMLDivElement>(null);



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
      <section ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-transparent py-24">


        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 w-full z-20 flex flex-col items-start pt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Compass className="w-4 h-4 text-pink-300 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-pink-200 font-semibold">
              {COMPANY_DETAILS.tagline}
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white flex flex-col mb-8 select-none leading-none">
            <div className="overflow-hidden relative py-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block font-medium bg-gradient-to-r from-white to-[#ff9ebb] bg-clip-text text-transparent"
              >
                SAVE.
              </motion.span>
            </div>
            <div className="overflow-hidden relative py-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block text-stroke text-white/90"
              >
                PLAN.
              </motion.span>
            </div>
            <div className="overflow-hidden relative py-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block font-medium bg-gradient-to-r from-white to-[#ff9ebb] bg-clip-text text-transparent"
              >
                GO.
              </motion.span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[#86868B] text-base md:text-lg max-w-md mb-8 leading-relaxed font-light text-balance"
          >
            Since {COMPANY_DETAILS.established}, Jeseem Tours & Travels has simplified worldwide travel. From low airfares and customized holiday packages to visa assistance and emigration support, we make your journey hassle-free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 z-20"
          >
            <Magnetic range={30} strength={0.25}>
              <Link
                href="/packages"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
              >
                Explore Packages
              </Link>
            </Magnetic>
            <Magnetic range={30} strength={0.25}>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                Plan A Trip
              </Link>
            </Magnetic>
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
            <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-300 animate-[bounce_2s_infinite]" />
          </div>
        </motion.div>
      </section>

      {/* SINGLE STATIC FULL-SCREEN FIXED BACKGROUND CANVAS (POST-HERO) */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        {/* Cinematic dark overlay gradient to ensure high readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />
        {/* Desktop Background Visual */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/jeseem_bg.png"
            alt="Cinematic fixed travel canvas backdrop"
            fill
            className="object-cover opacity-65"
            sizes="100vw"
            priority
          />
        </div>
        {/* Mobile Background Visual */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/jeseem_bg_mobile.png"
            alt="Cinematic fixed travel canvas backdrop mobile"
            fill
            className="object-cover opacity-65"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <section className="relative py-48 px-6 overflow-hidden border-t border-white/5 flex items-center justify-center min-h-[80vh] z-10 bg-transparent">
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-6 block">
              OUR TRAVEL PHILOSOPHY
            </span>
          </ScrollReveal>
          <ScrollReveal variant="blur-in" duration={1.2} delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-tight leading-snug md:leading-normal text-white text-balance">
              We believe travel should be affordable, seamless, and memorable. From the moment you plan your flights to visa clearances and local stays, we take care of all the details, allowing you to focus entirely on the journey.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={0.8} delay={0.4} className="mt-8 flex justify-center">
            <Link href="/about" className="group text-xs uppercase tracking-widest text-white hover:text-amber-500 font-semibold inline-flex items-center gap-2 transition-all">
              Discover Our {new Date().getFullYear() - COMPANY_DETAILS.established}-Year Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </ScrollReveal>
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
                <div
                  key={`${dest.id}-${idx}`}
                  className="px-2"
                >
                  <TiltCard maxRotation={6}>
                    <div
                      className="relative min-w-[280px] md:min-w-[420px] h-[380px] md:h-[550px] rounded-3xl overflow-hidden flex flex-col justify-end p-6 md:p-8 group select-none bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md"
                      data-cursor="explore"
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
                    </div>
                  </TiltCard>
                </div>
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
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">FEATURED SERVICE</span>
            <h3 className="text-4xl md:text-6xl font-extralight tracking-tight text-white">Flight Ticket Bookings</h3>
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
                    <p className="text-sm font-semibold text-white mt-1">Group Booking & Series Fares</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Rates</span>
                    <p className="text-sm font-semibold text-white mt-1">Best Market Rates</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Support</span>
                    <p className="text-sm font-semibold text-white mt-1">24/7 Ticketing Help</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868B]">Destinations</span>
                    <p className="text-sm font-semibold text-white mt-1">Domestic & International</p>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
                  >
                    Inquire Ticket Allocation
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
            <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-4">OUR SERVICE RANGE</span>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-12">Core Services</h3>
            
            <ScrollStagger className="flex flex-col gap-6">
              {SERVICES.map((srv, idx) => (
                <ScrollReveal
                  key={srv.number}
                  variant="fade-up"
                  duration={0.6}
                  once
                  className={`border-b border-white/10 pb-6 cursor-pointer group transition-all duration-300 ${
                    activeServiceIdx === idx ? "opacity-100 pl-4" : "opacity-40 hover:opacity-75"
                  }`}
                >
                  <div
                    onClick={() => setActiveServiceIdx(idx)}
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
                </ScrollReveal>
              ))}
            </ScrollStagger>
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
            className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-32 lg:h-[500px] lg:self-start rounded-3xl overflow-hidden border border-white/10 order-2 lg:order-1 bg-black/40 backdrop-blur-md shadow-2xl min-h-[220px]"
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
            className="w-full lg:w-1/2 flex flex-col gap-20 lg:gap-40 py-12 lg:py-24 pb-24 lg:pb-48 order-1 lg:order-2"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-4">OUR TAGLINE APPROACH</span>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">Save • Plan • Go</h3>
              <p className="text-[#86868B] text-base font-light leading-relaxed max-w-md">
                We simplify travel logistics using a smooth four-stage methodology to ensure your journey is safe, affordable, and stress-free.
              </p>
            </div>

            <div className="flex flex-col gap-20 lg:gap-60">
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
                  
                  {/* Inline visual preview for mobile */}
                  <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border border-white/10 my-4 block lg:hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
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
              Trusted since {COMPANY_DETAILS.established}. Here is how our guests review their flights, holidays, and visa coordination from Alappuzha.
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
                      className="w-full flex touch-pan-y"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.6}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                        if (swipe) {
                          if (offset.x > 0) {
                            handlePrevMobileReview();
                          } else {
                            handleNextMobileReview();
                          }
                        }
                      }}
                    >
                       {activeMobileReviewIdx === 0 ? (
                        /* Cover Card */
                        <div className="w-full bg-black/50 border border-white/10 backdrop-blur-lg shadow-2xl p-6 rounded-2xl flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                              </svg>
                              <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Google Reviews</span>
                            </div>
                            <h3 className="text-xl font-light text-white leading-snug">
                              Bespoke Luxury Adventures
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-extrabold text-white">4.9</span>
                              <div>
                                <div className="flex text-amber-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                  ))}
                                </div>
                                <p className="text-[10px] text-white/50">115+ guest evaluations</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-[10px] text-amber-500 font-semibold flex items-center gap-1 mt-6">
                            <span>Swipe to browse reviews</span>
                            <ArrowRight className="w-3 h-3 text-amber-500" />
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
                            <div className="w-full bg-black/50 border border-white/10 backdrop-blur-lg shadow-2xl p-6 rounded-2xl flex flex-col justify-between text-left">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}>
                                      {initial}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-white">{rev.author}</h4>
                                      <p className="text-[10px] text-[#86868B]">{rev.role}</p>
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

                                <blockquote className="text-xs text-white/80 leading-relaxed font-light line-clamp-6">
                                  &ldquo;{rev.quote}&rdquo;
                                </blockquote>
                              </div>

                              <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between">
                                <span className="text-[10px] text-amber-500 font-mono tracking-wider">{rev.destination}</span>
                                <span className="text-[10px] text-[#86868B]">2 weeks ago</span>
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
                      whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.2)" }}
                      className="bg-black/50 border border-white/10 p-8 rounded-3xl space-y-6 transition-all duration-300 shadow-2xl backdrop-blur-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}>
                            {initial}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">{rev.author}</h4>
                            <p className="text-[10px] text-[#86868B]">{rev.role}</p>
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
                      
                      <blockquote className="text-white/80 text-sm leading-relaxed font-light">
                        &ldquo;{rev.quote}&rdquo;
                      </blockquote>
                      
                      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                        <span className="text-[10px] text-[#86868B]">a month ago</span>
                        <span className="text-[10px] text-amber-500 font-mono tracking-wider">{rev.destination}</span>
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
                      className="bg-black/50 border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl backdrop-blur-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}>
                            {initial}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">{rev.author}</h4>
                            <p className="text-[10px] text-[#86868B]">{rev.role}</p>
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
                      
                      <blockquote className="text-white/80 text-sm leading-relaxed font-light">
                        &ldquo;{rev.quote}&rdquo;
                      </blockquote>
                      
                      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                        <span className="text-[10px] text-[#86868B]">2 weeks ago</span>
                        <span className="text-[10px] text-amber-500 font-mono tracking-wider">{rev.destination}</span>
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
            Save. Plan. Go.
          </h2>
          <p className="text-[#86868B] text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed font-light">
            Contact our dedicated support desks today to book group flight tickets, plan domestic/international holidays, or secure your visa assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:scale-105 transition-all duration-300"
            >
              Get In Touch
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
