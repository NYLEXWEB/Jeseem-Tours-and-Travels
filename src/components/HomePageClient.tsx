"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Calendar,
  User,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Award,
  ShieldCheck,
  Clock,
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
  Plane,
  FileCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";
import ScrollReveal, { ScrollStagger } from "@/components/ScrollReveal";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import FaqAccordion from "@/components/FaqAccordion";
import { COMPANY_DETAILS } from "@/constants/company";
import { FaqItem } from "@/lib/schema";

// Curated Assets and Details with SEO-rich content
const DESTINATIONS = [
  {
    id: "kerala",
    name: "Kerala Backwaters & Hills",
    country: "Kerala, India",
    desc: "Pristine houseboats in Alappuzha, emerald tea gardens in Munnar, and peaceful backwater retreats.",
    image: "/destinations/Kerala.png",
    coords: "10.8505° N, 76.2711° E",
    alt: "Kerala backwater luxury houseboat cruise in Alappuzha by Jeseem Tours",
  },
  {
    id: "lakshadweep",
    name: "Lakshadweep Islands",
    country: "India",
    desc: "Crystal-clear turquoise lagoons, vibrant coral reefs, and tranquil white sand island beaches.",
    image: "/destinations/Lakshadweep.png",
    coords: "10.5667° N, 72.6417° E",
    alt: "Lakshadweep pristine island beach holiday package from Kerala",
  },
  {
    id: "georgia",
    name: "Georgia & Caucasus",
    country: "Caucasus / Europe",
    desc: "Historic monasteries, snow-capped Caucasus peaks, and rich European-Asian cultural heritage.",
    image: "/destinations/Georgia.png",
    coords: "41.7151° N, 44.8271° E",
    alt: "Georgia Caucasus holiday tour package from Kerala by Jeseem Travels",
  },
  {
    id: "maldives",
    name: "Maldives Luxury Atolls",
    country: "Indian Ocean",
    desc: "Luxury overwater bungalows, vibrant marine life sanctuaries, and private romantic island resorts.",
    image: "/destinations/Maldives.png",
    coords: "3.2028° N, 73.2207° E",
    alt: "Maldives overwater villa honeymoon package from Kerala by Jeseem Tours",
  },
  {
    id: "dubai",
    name: "Dubai & Desert Safari",
    country: "UAE",
    desc: "Futuristic Burj Khalifa architecture, desert dune safaris, and premier luxury shopping getaways.",
    image: "/destinations/Dubai.png",
    coords: "25.2048° N, 55.2708° E",
    alt: "Dubai desert safari and holiday package from Kerala by Jeseem Tours",
  },
  {
    id: "malaysia",
    name: "Malaysia & Langkawi",
    country: "Southeast Asia",
    desc: "Iconic Petronas Twin Towers, ancient tropical rainforests, and Langkawi island beach resorts.",
    image: "/destinations/Malaysia.png",
    coords: "3.1390° N, 101.6869° E",
    alt: "Malaysia holiday tour package from Kerala by Jeseem Travels",
  },
];

const PACKAGES = [
  {
    id: "flight-ticketing",
    title: "Worldwide Flight Bookings & Group Fares",
    subtitle: "Group & Special / Series Fares",
    price: "Best Rates Guaranteed",
    duration: "Flexible Dates",
    desc: "Get exclusive access to lowest group flight bookings, special airline promotions, and series fares from Kerala to UAE, GCC, Europe, and worldwide destinations.",
    image: "/service_01.jpg",
    alt: "Group flight ticket bookings and special series fares by Jeseem Tours in Alappuzha Kerala",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Flight & Ticket Bookings",
    desc: "Access competitive group booking options, special fares, and series fares on all major domestic and international airlines.",
    image: "/service_01.jpg",
    alt: "Flight ticket booking desk in Alappuzha Kerala - Jeseem Tours",
  },
  {
    number: "02",
    title: "Domestic & International Holidays",
    desc: "Completely customized holiday packages, honeymoon specials to Maldives & Dubai, and corporate retreats tailored to your timeline and budget.",
    image: "/service_02.jpg",
    alt: "International and domestic holiday packages from Kerala - Jeseem Tours",
  },
  {
    number: "03",
    title: "Global Visa & Document Support",
    desc: "Hassle-free tourist, business & visit visa assistance, MEA certificate attestation, and emigration clearance support.",
    image: "/service_03.jpg",
    alt: "Global visa assistance and certificate attestation desk in Alappuzha",
  },
  {
    number: "04",
    title: "Pilgrimage, Hajj & Umrah Services",
    desc: "Dedicated coordinates and premium hotel arrangements close to holy mosques for sacred Hajj & Umrah journeys.",
    image: "/service_04.jpg",
    alt: "Hajj and Umrah pilgrimage tour packages from Kerala - Jeseem Travels",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Save & Plan",
    desc: "Consult our senior travel advisors to lock in group airline rates, lowest flight tickets, and customized itineraries.",
    image: "/step_01.jpg",
    alt: "Save and plan travel consultation - Jeseem Tours Alappuzha",
  },
  {
    number: "02",
    title: "Visa & Clearances",
    desc: "Our documents desk processes your global visa assistance, certificate attestation, and emigration clearances seamlessly.",
    image: "/step_02.jpg",
    alt: "Visa processing and document clearance support - Jeseem Travels",
  },
  {
    number: "03",
    title: "Go & Experience",
    desc: "Embark on your journey confidently with pre-arranged airport transfers, comprehensive travel insurance, and 24/7 hotline support.",
    image: "/step_03.jpg",
    alt: "Travel experience with 24/7 concierge support - Jeseem Tours",
  },
  {
    number: "04",
    title: "Return & Review",
    desc: "Arrive home with unforgettable memories. Our travel desks remain ready to assist with your future tickets and packages.",
    image: "/step_04.jpg",
    alt: "Return home with lifelong travel memories - Jeseem Tours",
  },
];

const REVIEWS = [
  {
    quote:
      "I had a great experience with Jeseem Travels. The team was extremely professional, competent in getting the best prices; at our convenient travel timings; and continuously updating the flight changes. Highly recommend to reach out to them for anyone looking for hassle free and quality travel plans...",
    author: "K Kuriakose",
    role: "Verified Customer",
    destination: "Hassle Free & Quality Travel Plans",
    rating: 5,
  },
  {
    quote:
      "It's a long time I am travelling by Jaseem travels. Till now I am more than happy that jaseem travels gives a clear picture of the process and service with end to end clearance. Keep it up. Looking forward for more business with you.. Thank you for the good services",
    author: "Firoze Aslam",
    role: "Local Guide",
    destination: "End-to-End Clearance & Service",
    rating: 5,
  },
  {
    quote:
      "This is an unique place in Alappuzha or probably in Kerala. You may approach them with your requirements and you will get a satisfying response. I would recommend to the fullest from my deep heart. The ambiance and courteous behavior, attitude and approach to you and your issues will be very satisfying. I will merit them 5star.",
    author: "Pradeep Nayar",
    role: "Verified Customer",
    destination: "Courteous & Satisfying Response",
    rating: 5,
  },
  {
    quote:
      "The travel agency provided exceptional service, efficiently handling all aspects of my trip. Their attention to detail and personalized assistance made my travel experience seamless and enjoyable.",
    author: "Linu Albin",
    role: "Local Guide",
    destination: "Exceptional & Personalized Assistance",
    rating: 5,
  },
  {
    quote:
      "Everything was very well arranged by yaseem. Extremely cordial and helpful, will recommend everyone.",
    author: "Akash Deep Singh",
    role: "Verified Customer",
    destination: "Cordial & Well Arranged",
    rating: 5,
  },
  {
    quote:
      "I had an incredible experience with this agency! From start to finish, the team was professional, attentive, and handled every detail of my trip with care.",
    author: "Vishnu N Pillai",
    role: "Local Guide",
    destination: "Attentive & Caring Support",
    rating: 5,
  },
  {
    quote:
      "My last travelling from south africa to India was made easy wit jaseem tours n travels..they helped me to find affordable ticket on time during US Iran war",
    author: "Dipu Chinnappan",
    role: "International Traveler",
    destination: "Flight Ticket Booking",
    rating: 5,
  },
  {
    quote:
      "I had a great experience with Jeseem Tours and Travels! Their service was professional, friendly, and very well organized. The trip went smoothly, and everything was taken care of on time. I highly recommend them for a stress-free and enjoyable travel experience. Will definitely choose them again.",
    author: "yunus kngd",
    role: "Frequent Traveler",
    destination: "Seamless Tour Planning",
    rating: 5,
  },
  {
    quote:
      "Wonderful people. They did all what was required & more without me asking for. Excellent customer service. There are very few people in the world who go an extra mile for their customer needs. Jeseem is one of them. I highly recommend them with my whole heart and thank them for all their service. 🫰",
    author: "Ayza Aychu",
    role: "Loyal Customer",
    destination: "Extra-Mile Customer Support",
    rating: 5,
  },
  {
    quote:
      "Highly recommend Yasim for his deep knowledge of the visa application process, attention to detail and professionalism! He did a thorough job helping my parents with a time sensitive request. Thank you!",
    author: "Preethi Sridhar",
    role: "Verified Client",
    destination: "Visa Application Support",
    rating: 5,
  },
];

interface HomePageClientProps {
  faqItems: FaqItem[];
}

export default function HomePageClient({ faqItems }: HomePageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const destinationsScrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrollingRef = useRef(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pauseAutoScroll = () => {
    isAutoScrollingRef.current = false;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollingRef.current = true;
    }, 5000);
  };

  const scrollDestinations = (direction: "left" | "right") => {
    pauseAutoScroll();
    if (destinationsScrollRef.current) {
      const { scrollLeft } = destinationsScrollRef.current;
      const cardWidth = window.innerWidth < 768 ? 300 : 440;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      destinationsScrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = destinationsScrollRef.current;
    if (!el) return;

    let animationId: number;
    let lastTime = performance.now();
    const speed = 0.035; // Pixels per ms

    const step = (time: number) => {
      if (el && isAutoScrollingRef.current) {
        const delta = time - lastTime;
        if (delta < 200) {
          const item0 = el.children[0] as HTMLElement;
          const itemN = el.children[DESTINATIONS.length] as HTMLElement;
          if (item0 && itemN) {
            const W = itemN.offsetLeft - item0.offsetLeft;
            let currentScroll = el.scrollLeft;
            if (currentScroll >= W) {
              el.scrollLeft = currentScroll % W;
            } else if (currentScroll < 0) {
              el.scrollLeft = (currentScroll % W) + W;
            }
          }
          el.scrollLeft += speed * delta;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const handleMouseEnter = () => {
      isAutoScrollingRef.current = false;
    };
    const handleMouseLeave = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      isAutoScrollingRef.current = true;
    };
    const handleTouchStart = () => {
      pauseAutoScroll();
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleTouchStart);

    return () => {
      cancelAnimationFrame(animationId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // States for interactive UI elements
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeMobileReviewIdx, setActiveMobileReviewIdx] = useState(0);
  const [mobileSlideDirection, setMobileSlideDirection] = useState(1);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const handlePrevMobileReview = () => {
    setMobileSlideDirection(-1);
    setActiveMobileReviewIdx((prev) =>
      prev === 0 ? REVIEWS.length : prev - 1
    );
  };

  const handleNextMobileReview = () => {
    setMobileSlideDirection(1);
    setActiveMobileReviewIdx((prev) =>
      prev === REVIEWS.length ? 0 : prev + 1
    );
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
    <div ref={containerRef} className="relative w-full bg-[var(--background)]">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        aria-label="Welcome to Jeseem Tours & Travels"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden z-10 bg-transparent pt-24 pb-12 md:pt-28 px-4 sm:px-8 md:px-12"
      >
        {/* Background Layer (Animated Directional Slide-Over Image Carousel) */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <HeroBackgroundCarousel
            onSlideChange={setHeroSlideIndex}
            activeSlideIndex={heroSlideIndex}
          />
        </div>

        {/* Hero Central Content (Adaptive & visible across ALL 3 slides) */}
        <div className="relative max-w-7xl mx-auto w-full z-20 flex-1 flex flex-col justify-end items-start pb-6 sm:pb-8 md:pb-10 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-slide-${heroSlideIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.35, ease: "easeOut" } }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start w-full max-w-3xl"
            >

              {/* Main H1 Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.15] max-w-2xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Playfair Display', Georgia, serif",
                }}
              >
                {
                  [
                    "Explore the World with Kerala’s Trusted Travel Agency",
                    "Unforgettable Custom Tour Packages & Family Holidays",
                    "Fast-Track Visas & Guaranteed Best Flight Ticket Deals",
                  ][heroSlideIndex % 3]
                }
              </motion.h1>

              {/* SEO-Optimized Description Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 font-medium text-xs sm:text-sm md:text-base max-w-xl leading-relaxed text-slate-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
              >
                {
                  [
                    "Customized international holiday packages, lowest group flight fares, and fast-track visa assistance backed by four decades of trust.",
                    "From tranquil hill retreats to exotic worldwide destinations, experience tailor-made travel itineraries crafted for lifelong memories.",
                    "Hassle-free visa processing, document attestation, and guaranteed lowest airfares for individuals, family vacations, and tour groups.",
                  ][heroSlideIndex % 3]
                }
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 flex flex-wrap items-center gap-3 sm:gap-5"
              >
                <Link
                  href={
                    [
                      "/packages",
                      "/destinations",
                      "/contact",
                    ][heroSlideIndex % 3]
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-xl hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-95 group"
                >
                  <span>
                    {
                      [
                        "Explore Tour Packages",
                        "Discover Destinations",
                        "Get Flight Deals",
                      ][heroSlideIndex % 3]
                    }
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={
                    [
                      "/contact",
                      "/contact",
                      "/about",
                    ][heroSlideIndex % 3]
                  }
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-xl hover:border-white/60 hover:scale-[1.02] active:scale-95 group"
                >
                  <span>
                    {
                      [
                        "Book Flight Tickets",
                        "Plan My Holiday",
                        "Visa Assistance",
                      ][heroSlideIndex % 3]
                    }
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Slide Indicator Dots */}
          <div className="mt-8 flex items-center gap-2.5 z-20">
            {[0, 1, 2].map((idx) => (
              <button
                key={`hero-dot-${idx}`}
                onClick={() => setHeroSlideIndex(idx)}
                aria-label={`Switch to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  heroSlideIndex % 3 === idx
                    ? "w-9 bg-amber-400 shadow-md shadow-amber-400/40"
                    : "w-2.5 bg-white/40 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Bottom: Minimal Circular Scroll Button */}
        <div className="relative max-w-7xl mx-auto w-full z-20 flex justify-center items-center pb-2">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-none shadow-sm"
            aria-label="Scroll down to explore"
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </section>

      {/* SINGLE STATIC FULL-SCREEN FIXED BACKGROUND CANVAS */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none bg-black" />

      {/* 2. OUR TRAVEL PHILOSOPHY & FOUNDER TRIBUTE SECTION */}
      <section
        aria-label="Our Travel Philosophy and Founder Heritage"
        className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-black/5 flex flex-col items-center justify-center min-h-[85vh] z-10 bg-transparent"
      >
        <div className="max-w-6xl mx-auto w-full relative z-20">
          {/* Philosophy Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
            {/* Left Column: Visual Image */}
            <ScrollReveal
              variant="fade-up"
              duration={0.8}
              className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-black/10"
            >
              <Image
                src="/travel_image.png"
                alt="Jeseem Tours and Travels philosophy - Premier travel agency in Alappuzha Kerala"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </ScrollReveal>

            {/* Right Column: Philosophy Details */}
            <div className="flex flex-col items-start text-left">
              <ScrollReveal variant="fade-up" duration={0.8}>
                <span className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-4 block">
                  OUR TRAVEL PHILOSOPHY & TRUST
                </span>
              </ScrollReveal>
              <ScrollReveal variant="blur-in" duration={1.2} delay={0.2}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-relaxed text-[#171717] mb-6">
                  We believe travel should be affordable, seamless, and
                  unforgettable. From group flight bookings to fast visa
                  clearances and luxury stays, our travel agency in Alappuzha
                  handles every detail.
                </h2>
              </ScrollReveal>
              <ScrollReveal
                variant="fade-up"
                duration={0.8}
                delay={0.4}
                className="mt-2"
              >
                <Link
                  href="/about"
                  className="group text-xs uppercase tracking-widest text-[#171717] hover:text-sky-600 font-bold inline-flex items-center gap-2 transition-all"
                >
                  Discover Our{" "}
                  {new Date().getFullYear() - COMPANY_DETAILS.established}-Year
                  Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* MISSION & VISION & QUALITY ASSURANCE */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <ScrollReveal variant="fade-up" duration={0.8}>
                <span className="text-xs uppercase tracking-widest text-brand-gradient font-bold block mb-2">
                  OUR PURPOSE & QUALITY COMMITMENT
                </span>
              </ScrollReveal>
              <ScrollReveal variant="blur-in" duration={1.0} delay={0.15}>
                <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#171717]">
                  Mission & Vision for Kerala Travelers
                </h3>
              </ScrollReveal>
            </div>

            {/* Grid of Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Mission Card */}
              <ScrollReveal variant="fade-up" duration={0.8} delay={0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-black border border-neutral-200 p-5 sm:p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#912D6B]/15 via-[#C72F62]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#912D6B]/15 to-[#D92F60]/15 border border-[#c4007b]/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-7 h-7 text-[#c4007b] animate-pulse" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#c4007b]/10 text-[#c4007b] text-[10px] font-bold uppercase tracking-widest border border-[#c4007b]/20">
                        Purpose Driven
                      </span>
                    </div>

                    <span className="text-xs uppercase tracking-widest text-[#c4007b] font-bold block mb-2">
                      OUR MISSION
                    </span>
                    <h4 className="text-2xl md:text-3xl font-light text-[#171717] tracking-tight mb-4 group-hover:text-[#912D6B] transition-colors">
                      Transparent & Seamless Global Travel
                    </h4>
                    <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light mb-6">
                      To deliver world-class, 100% quality-ensured travel
                      solutions—from group flight ticket allocations and
                      customized holiday packages to swift document attestations
                      and visa clearances—empowering every client with
                      transparent pricing, utmost comfort, and peace of mind.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                        &bull; Group Flight Allocations
                      </span>
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                        &bull; Rapid Visa Support
                      </span>
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                        &bull; 100% Transparent Fares
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#c4007b]">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#ff007f]" />
                      Client-Centric Excellence Since {COMPANY_DETAILS.established}
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Vision Card */}
              <ScrollReveal variant="fade-up" duration={0.8} delay={0.25}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-black border border-neutral-200 p-5 sm:p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-sky-400/15 via-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 border border-sky-500/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Eye className="w-7 h-7 text-sky-600 animate-pulse" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 text-[10px] font-bold uppercase tracking-widest border border-sky-500/20">
                        Long-Term Trust
                      </span>
                    </div>

                    <span className="text-xs uppercase tracking-widest text-sky-600 font-bold block mb-2">
                      OUR VISION
                    </span>
                    <h4 className="text-2xl md:text-3xl font-light text-[#171717] tracking-tight mb-4 group-hover:text-sky-600 transition-colors">
                      The Gold Standard in Travel Trust
                    </h4>
                    <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light mb-6">
                      To be recognized as the premier travel consultancy in
                      Kerala and worldwide, celebrated for unyielding integrity,
                      zero-compromise quality standards, zero hidden costs, and
                      nurturing lifelong relationships with every passenger we
                      serve.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                        &bull; Premier Global Reputation
                      </span>
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                        &bull; Zero Hidden Costs
                      </span>
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200">
                        &bull; 24/7 Passenger Support
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      Building Lifelong Journeys & Trust
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* 100% QUALITY ASSURANCE BANNER CARD */}
            <ScrollReveal variant="fade-up" duration={1.0} delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-black border border-neutral-200 p-5 sm:p-8 md:p-12 rounded-3xl shadow-xl overflow-hidden text-left"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold text-[10px] uppercase tracking-widest mb-4 shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-sky-600" />
                      100% QUALITY ENSURED &middot; NO COMPROMISE
                    </div>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#171717] tracking-tight mb-3">
                      Zero Compromise on Quality of Service
                    </h4>
                    <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
                      At Jeseem Tours & Travels, service quality is absolute. We
                      do not compromise on accuracy, safety, or timing. Every
                      airline ticket, document attestation file, and travel
                      itinerary undergoes multi-stage verification to guarantee
                      100% precision and satisfaction.
                    </p>
                  </div>
                  <div className="shrink-0 w-full lg:w-auto">
                    <Link
                      href="/contact"
                      className="w-full lg:w-auto px-8 py-4 rounded-full bg-brand-gradient-btn hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      Consult Quality Desks
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* FOUNDER TRIBUTE CARD */}
          <ScrollReveal variant="fade-up" duration={1.0} delay={0.2}>
            <div className="relative w-full rounded-3xl overflow-hidden bg-[var(--card-bg)] text-zinc-900 p-5 sm:p-8 md:p-14 border border-sky-600/30 shadow-md flex flex-col lg:flex-row items-center gap-10 md:gap-14">
              {/* Founder Image Frame */}
              <div className="relative w-48 h-56 sm:w-60 sm:h-72 md:w-64 md:h-80 shrink-0 rounded-2xl overflow-hidden border-2 border-sky-600/40 shadow-xl group bg-purple-50">
                <Image
                  src="/Father photo.png"
                  alt="Late KUNJUMON ISMAIL - Founder & Visionary of Jeseem Tours & Travels Alappuzha"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                <div className="absolute bottom-3 left-3 right-3 z-20 text-center">
                  <span className="px-3.5 py-1 rounded-full bg-white text-black text-[10px] uppercase font-bold tracking-widest inline-block shadow-md">
                    In Loving Memory
                  </span>
                </div>
              </div>

              {/* Founder Bio & Tribute Content */}
              <div className="flex-1 flex flex-col justify-center items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gradient-light border border-sky-600/30 text-sky-600 text-xs uppercase tracking-widest font-mono font-bold mb-4">
                  <Award className="w-3.5 h-3.5 text-sky-600" />
                  FOUNDER TRIBUTE & HERITAGE
                </div>

                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-2 font-outfit flex flex-wrap"
                >
                  {"KUNJUMON ISMAIL".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 22,
                          filter: "blur(6px)",
                          scale: 0.85,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 220,
                            damping: 16,
                          },
                        },
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h3>
                <p className="text-sky-600 text-sm font-mono tracking-widest uppercase mb-6 font-bold">
                  Founder & Visionary &bull; (Late in 2022)
                </p>

                <blockquote className="text-zinc-700 text-base md:text-lg leading-relaxed font-light italic border-l-2 border-sky-600 pl-5 mb-6">
                  &ldquo;Travel is more than reaching a destination; it is about
                  building trust, creating lifetime memories, and serving every
                  passenger with utmost sincerity and dedication.&rdquo;
                </blockquote>

                <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-light max-w-2xl mb-8">
                  Founded in {COMPANY_DETAILS.established} by Late Kunjumon
                  Ismail, Jeseem Tours & Travels was established with a singular
                  mission: to make international and domestic travel
                  effortless, transparent, and accessible for everyone in
                  Alappuzha and throughout Kerala.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/about"
                    className="px-6 py-3.5 rounded-full bg-white font-bold text-black text-xs uppercase tracking-wider shadow-md inline-flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    Read Our Full Founder Story
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. DESTINATIONS SECTION (Horizontal showcase) */}
      <section
        aria-label="Popular Holiday Destinations from Kerala"
        className="relative py-16 sm:py-24 md:py-32 border-t border-white/5 overflow-hidden min-h-[90vh] flex flex-col justify-center z-10 bg-transparent"
      >
        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-2">
                POPULAR HOLIDAY PACKAGES
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                Bespoke Tour Destinations
              </h2>
            </div>
            <Link
              href="/destinations"
              className="text-xs uppercase tracking-widest text-white hover:text-[#ff007f] font-semibold inline-flex items-center gap-1"
            >
              Browse All Tour Destinations <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Scrollable Track Container with Chevron Arrows */}
          <div className="relative w-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 pointer-events-none md:left-8">
              <button
                onClick={() => scrollDestinations("left")}
                className="w-10 h-10 rounded-full bg-[var(--background)]/85 text-[var(--foreground)] border border-[var(--border)] shadow-md flex items-center justify-center pointer-events-auto hover:bg-[#c4007b] hover:text-white transition-colors cursor-pointer"
                aria-label="Previous destination"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30 pointer-events-none md:right-8">
              <button
                onClick={() => scrollDestinations("right")}
                className="w-10 h-10 rounded-full bg-[var(--background)]/85 text-[var(--foreground)] border border-[var(--border)] shadow-md flex items-center justify-center pointer-events-auto hover:bg-[#c4007b] hover:text-white transition-colors cursor-pointer"
                aria-label="Next destination"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={destinationsScrollRef}
              className="w-full max-w-full overflow-x-auto flex gap-4 sm:gap-6 px-4 sm:px-8 md:px-24 py-6 hide-scrollbar"
            >
              {[...DESTINATIONS, ...DESTINATIONS, ...DESTINATIONS].map(
                (dest, idx) => (
                  <div key={`${dest.id}-${idx}`} className="shrink-0">
                    <TiltCard maxRotation={6}>
                      <div
                        className="relative w-[280px] sm:w-[420px] md:w-[580px] aspect-[16/9] rounded-3xl overflow-hidden flex flex-col justify-end p-4 md:p-5 group select-none bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl"
                        data-cursor="explore"
                      >
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          <Image
                            src={dest.image}
                            alt={dest.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 320px, 580px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                        </div>

                        <Link
                          href={`/destinations#${dest.id}`}
                          className="absolute inset-0 z-10"
                          aria-label={`View itinerary for ${dest.name}`}
                        />

                        <div className="relative z-20 flex items-center justify-between mt-auto pointer-events-auto w-full pt-2">
                          <Link
                            href={`/destinations#${dest.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-neutral-950 text-[11px] uppercase tracking-wider font-extrabold transition-all duration-300 shadow-md hover:scale-105 shrink-0"
                          >
                            More Details
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </Link>
                          <a
                            href={`https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(
                              dest.name
                            )}"%20destination%20itinerary.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:brightness-110 text-white text-[11px] uppercase tracking-wider font-bold transition-all duration-300 shadow-lg hover:scale-105 shrink-0"
                            style={{ backgroundColor: "#25D366" }}
                          >
                            <FaWhatsapp className="w-4 h-4 text-white" />
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED FLIGHT TICKETING SERVICE */}
      <section
        aria-label="Flight Ticket Booking and Group Airline Deals"
        className="relative py-16 sm:py-24 md:py-32 border-t border-white/5 px-4 sm:px-6 md:px-8 overflow-hidden min-h-[90vh] flex flex-col justify-center z-10 bg-transparent"
      >
        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-brand-gradient font-bold block mb-2">
              FEATURED AIRLINE SERVICE
            </span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white">
              Flight Ticket Bookings & Group Fares
            </h2>
          </motion.div>

          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-3xl overflow-hidden bg-[#0d0d0e] border border-white/15 flex flex-col lg:flex-row min-h-[500px] shadow-2xl"
            >
              <div className="relative flex-1 min-h-[220px] lg:min-h-[500px] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0d0d0e] via-transparent to-transparent z-10" />
              </div>

              <div className="flex-1 p-5 sm:p-8 md:p-16 flex flex-col justify-center relative z-20 bg-[#0d0d0e]">
                <span
                  className="text-xs uppercase tracking-widest font-extrabold mb-2"
                  style={{ color: "#D92F60" }}
                >
                  {pkg.subtitle}
                </span>
                <h3
                  className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6"
                  style={{ color: "#ffffff" }}
                >
                  {pkg.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-8 font-light"
                  style={{ color: "#d4d4d4" }}
                >
                  {pkg.desc}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b border-white/15 py-6">
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-wider font-bold block"
                      style={{ color: "#a3a3a3" }}
                    >
                      Includes
                    </span>
                    <p
                      className="text-sm font-semibold text-white mt-1"
                      style={{ color: "#ffffff" }}
                    >
                      Group Booking & Series Fares
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-wider font-bold block"
                      style={{ color: "#a3a3a3" }}
                    >
                      Rates
                    </span>
                    <p
                      className="text-sm font-semibold text-white mt-1"
                      style={{ color: "#ffffff" }}
                    >
                      Best Market Rates Guaranteed
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-wider font-bold block"
                      style={{ color: "#a3a3a3" }}
                    >
                      Support
                    </span>
                    <p
                      className="text-sm font-semibold text-white mt-1"
                      style={{ color: "#ffffff" }}
                    >
                      24/7 Ticketing Concierge
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-wider font-bold block"
                      style={{ color: "#a3a3a3" }}
                    >
                      Destinations
                    </span>
                    <p
                      className="text-sm font-semibold text-white mt-1"
                      style={{ color: "#ffffff" }}
                    >
                      Domestic & Worldwide Routes
                    </p>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-gradient-btn text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                    style={{ color: "#ffffff" }}
                  >
                    Inquire Flight Ticket Allocation
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE SERVICES */}
      <section
        aria-label="Core Travel Services in Alappuzha Kerala"
        className="relative py-16 sm:py-24 md:py-32 border-t border-white/5 px-4 sm:px-6 md:px-8 overflow-hidden min-h-[90vh] flex flex-col justify-center z-10 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-20 w-full flex flex-col lg:flex-row gap-16">
          {/* Text List Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-4">
              TRAVEL & DOCUMENT SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-12">
              Our Core Services
            </h2>

            <ScrollStagger className="flex flex-col gap-6">
              {SERVICES.map((srv, idx) => (
                <ScrollReveal
                  key={srv.number}
                  variant="fade-up"
                  duration={0.6}
                  once
                  className={`border-b border-white/10 pb-6 cursor-pointer group transition-all duration-300 ${activeServiceIdx === idx
                    ? "opacity-100 pl-4"
                    : "opacity-40 hover:opacity-75"
                    }`}
                >
                  <div
                    onClick={() => setActiveServiceIdx(idx)}
                    onMouseEnter={() => setActiveServiceIdx(idx)}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-xs font-mono font-bold mt-1 ${activeServiceIdx === idx
                          ? "text-[#ff007f]"
                          : "text-white"
                          }`}
                      >
                        {srv.number}
                      </span>
                      <div>
                        <h3 className="text-xl md:text-2xl text-white font-normal mb-2 group-hover:text-[#ff007f] transition-colors">
                          {srv.title}
                        </h3>
                        {activeServiceIdx === idx && (
                          <div className="mt-2">
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-[var(--foreground-muted)] text-sm leading-relaxed max-w-md font-light mb-4"
                            >
                              {srv.desc}
                            </motion.p>
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="flex flex-wrap items-center gap-3"
                            >
                              <Link
                                href="/packages"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                              >
                                More Details
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                              <a
                                href={`https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(
                                  srv.title
                                )}"%20service.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                              >
                                WhatsApp Inquiry
                              </a>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </ScrollStagger>
          </motion.div>

          {/* Interactive Graphic Column */}
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
                <div className="absolute inset-0 bg-neutral-950/40 z-10" />
                <Image
                  src={SERVICES[activeServiceIdx].image}
                  alt={SERVICES[activeServiceIdx].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-6 left-6 z-20 bg-neutral-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/25 shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest text-[#D92F60] font-extrabold block">
                SERVICE OVERVIEW
              </span>
              <p
                className="text-white text-sm font-bold tracking-wide mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                style={{ color: "#ffffff" }}
              >
                {SERVICES[activeServiceIdx].title}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5.5. WHY CHOOSE US SECTION */}
      <section
        aria-label="Why Choose Jeseem Tours and Travels"
        className="relative py-16 sm:py-24 md:py-32 border-t border-white/5 px-4 sm:px-6 md:px-8 overflow-hidden z-10 bg-transparent"
      >
        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Why Travelers in Kerala Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#c4007b]/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7b0062]/20 flex items-center justify-center text-[#ff007f] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                40+ Years of Excellence
              </h3>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                Guiding travelers since {COMPANY_DETAILS.established}. Over four
                decades of deep airline relations, visa clearances, and trusted
                operations in Alappuzha.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#c4007b]/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7b0062]/20 flex items-center justify-center text-[#ff007f] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Customized Itineraries
              </h3>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                No cookie-cutter trips. Every holiday, corporate flight booking,
                or pilgrimage is personalized to fit your budget, timeline, and
                comfort preferences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#c4007b]/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7b0062]/20 flex items-center justify-center text-[#ff007f] mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Complete Visa Support
              </h3>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                From fast global visa clearances to certificate attestation and
                emigration services, our processing desk handles the heavy
                paperwork.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#c4007b]/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7b0062]/20 flex items-center justify-center text-[#ff007f] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                24/7 Ticketing Help
              </h3>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                Emergency flight changes? Last-minute schedule alterations? Our
                dedicated customer care desk coordinates allocations with major
                airlines day and night.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. SCROLL STORYTELLING SECTION */}
      <section
        aria-label="Our Travel Methodology"
        className="relative py-16 sm:py-24 md:py-32 border-t border-white/5 px-4 sm:px-6 md:px-8 min-h-screen flex flex-col justify-center z-10 bg-transparent"
      >
        <div className="max-w-7xl mx-auto relative z-20 w-full flex flex-col lg:flex-row gap-16 relative">
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
                  <div className="absolute inset-0 bg-neutral-950/35 z-10" />
                  <Image
                    src={STEPS[activeStepIdx].image}
                    alt={STEPS[activeStepIdx].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">
                  STAGE
                </span>
                <p className="text-[#ff007f] text-lg font-bold">
                  {STEPS[activeStepIdx].number} — {STEPS[activeStepIdx].title}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col gap-20 lg:gap-40 py-12 lg:py-24 pb-24 lg:pb-48 order-1 lg:order-2"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#86868B] font-semibold block mb-4">
                OUR METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                Save the money plan for travel go to the destination
              </h2>
              <p className="text-[#86868B] text-base font-light leading-relaxed max-w-md">
                We simplify travel logistics using a smooth four-stage
                methodology to ensure your journey from Alappuzha is safe,
                affordable, and memorable.
              </p>
            </div>

            <div className="flex flex-col gap-20 lg:gap-60">
              {STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="flex flex-col gap-4 border-l-2 border-white/10 pl-6 lg:pl-10 relative"
                >
                  {activeStepIdx === idx && (
                    <motion.div
                      layoutId="step-indicator"
                      className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-brand-gradient"
                    />
                  )}
                  <span
                    className={`text-sm font-mono font-bold ${activeStepIdx === idx ? "text-[#ff007f]" : "text-white/40"
                      }`}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-2xl text-white font-medium">{step.title}</h3>

                  <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border border-white/10 my-4 block lg:hidden">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <p className="text-[#86868B] text-base leading-relaxed font-light max-w-md">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. PREMIUM REVIEWS (Google Styled Reviews) */}
      <section
        id="reviews"
        aria-label="Google Customer Reviews & Testimonials"
        className="relative py-16 sm:py-24 md:py-32 border-t border-white/5 px-4 sm:px-6 md:px-8 bg-transparent z-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-20">
          {/* Left Column: Sticky Title & Info */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 self-start space-y-6">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-xs uppercase tracking-widest text-white/70 font-bold">
                GOOGLE REVIEWS
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
              What our distinguished travelers say.
            </h2>

            <p className="text-white/60 text-base leading-relaxed font-light">
              Trusted in Alappuzha since {COMPANY_DETAILS.established}. Here is
              how our passengers review their flight ticket bookings, holiday
              packages, and visa coordination.
            </p>

            {/* Google Rating Badge */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-white">4.9</span>
                    <div className="flex items-center text-[#ff007f]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/50 font-medium">
                    115+ Google reviews &bull; Top Rated in Alappuzha
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Magnetic range={30} strength={0.3}>
                <a
                  href="https://g.page/r/Ca2iU0gCoDpuEBE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gradient-btn font-semibold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                >
                  Write a Google Review
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Reviews Grid */}
          <div className="lg:w-2/3">
            {/* Mobile View */}
            <div className="md:hidden flex flex-col items-center w-full">
              <div className="relative w-full flex items-center justify-between gap-1">
                <button
                  onClick={handlePrevMobileReview}
                  className="z-20 p-2.5 rounded-full bg-black/40 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-all flex items-center justify-center"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>

                <div className="flex-1 max-w-full w-full min-h-[350px] relative overflow-hidden flex items-stretch">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeMobileReviewIdx}
                      initial={{
                        opacity: 0,
                        x: mobileSlideDirection > 0 ? 40 : -40,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: mobileSlideDirection > 0 ? -40 : 40,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full flex touch-pan-y"
                    >
                      {activeMobileReviewIdx === 0 ? (
                        <div className="w-full bg-black/50 border border-white/10 backdrop-blur-lg shadow-2xl p-6 rounded-2xl flex flex-col justify-between">
                          <div className="space-y-4">
                            <span className="text-xs uppercase tracking-widest text-white/50 font-bold">
                              Google Reviews
                            </span>
                            <h3 className="text-xl font-light text-white leading-snug">
                              Bespoke Luxury Travel
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-extrabold text-white">
                                4.9
                              </span>
                              <div>
                                <div className="flex text-[#f59e0b]">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]"
                                    />
                                  ))}
                                </div>
                                <p className="text-[10px] text-white/50">
                                  115+ guest evaluations
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-[10px] text-[#ff007f] font-semibold flex items-center gap-1 mt-6">
                            <span>Swipe to browse reviews</span>
                            <ArrowRight className="w-3 h-3 text-[#ff007f]" />
                          </div>
                        </div>
                      ) : (
                        (() => {
                          const rev = REVIEWS[activeMobileReviewIdx - 1];
                          const initial = rev.author.charAt(0);
                          return (
                            <div className="w-full bg-black/50 border border-white/10 backdrop-blur-lg shadow-2xl p-6 rounded-2xl flex flex-col justify-between text-left">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white text-sm font-semibold">
                                      {initial}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-white">
                                        {rev.author}
                                      </h4>
                                      <p className="text-[10px] text-[#86868B]">
                                        {rev.role}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center text-[#f59e0b]">
                                  {[...Array(rev.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]"
                                    />
                                  ))}
                                </div>

                                <blockquote className="text-xs text-white/80 leading-relaxed font-light line-clamp-6">
                                  &ldquo;{rev.quote}&rdquo;
                                </blockquote>
                              </div>

                              <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between">
                                <span className="text-[10px] text-[#ff007f] font-mono tracking-wider">
                                  {rev.destination}
                                </span>
                                <span className="text-[10px] text-[#86868B]">
                                  Google Verified
                                </span>
                              </div>
                            </div>
                          );
                        })()
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleNextMobileReview}
                  className="z-20 p-2.5 rounded-full bg-black/40 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-all flex items-center justify-center"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Desktop View: Staggered Grid */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                {REVIEWS.filter((_, idx) => idx % 2 === 0).map((rev, idx) => (
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
                        <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white text-sm font-semibold">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {rev.author}
                          </h4>
                          <p className="text-[10px] text-[#86868B]">
                            {rev.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-[#f59e0b]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]"
                        />
                      ))}
                    </div>

                    <blockquote className="text-white/80 text-sm leading-relaxed font-light">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                      <span className="text-[10px] text-[#86868B]">
                        Verified Google Review
                      </span>
                      <span className="text-[10px] text-[#ff007f] font-mono tracking-wider">
                        {rev.destination}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-6 md:mt-12">
                {REVIEWS.filter((_, idx) => idx % 2 === 1).map((rev, idx) => (
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
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {rev.author}
                          </h4>
                          <p className="text-[10px] text-[#86868B]">
                            {rev.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-[#f59e0b]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]"
                        />
                      ))}
                    </div>

                    <blockquote className="text-white/80 text-sm leading-relaxed font-light">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                      <span className="text-[10px] text-[#86868B]">
                        Verified Google Review
                      </span>
                      <span className="text-[10px] text-[#ff007f] font-mono tracking-wider">
                        {rev.destination}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. AI-SEARCH OPTIMIZED ACCORDION FAQ */}
      <FaqAccordion
        items={faqItems}
        title="Travel & Booking FAQs"
        subtitle="Common questions about our flight ticketing, international holiday tour packages, visa services, and document attestation in Alappuzha, Kerala."
        badge="GOOGLE & AI SEARCH FAQ GUIDE"
      />

      {/* 8. CALL TO ACTION */}
      <section
        aria-label="Call to Action - Plan Your Travel"
        className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5 z-10 bg-transparent"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto px-6 text-center z-20"
        >
          <span className="text-xs uppercase tracking-widest text-[#ff007f] font-bold block mb-4">
            START YOUR NEXT JOURNEY
          </span>
          <h2 className="text-4xl md:text-7xl font-extralight tracking-tight text-white mb-6 text-balance">
            Save. Plan. Go.
          </h2>
          <p className="text-[#86868B] text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed font-light">
            Contact Jeseem Tours & Travels today for group flight tickets,
            customized holiday packages, or swift visa assistance in Alappuzha,
            Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-gradient-btn text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
            >
              Get In Touch With Our Travel Desks
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
