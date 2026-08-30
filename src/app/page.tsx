"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, Calendar, User, MapPin, Star, ChevronLeft, ChevronRight, Award, ShieldCheck, Clock } from "lucide-react";
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
    desc: "Hassle-free tourist, business & family visa assistance, document attestation, and emigration clearance. (Note: Job Visas are not provided).",
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
    quote: "I had an incredible experience with this agency! From start to finish, the team was professional, attentive, and handled every detail of my trip with care.",
    author: "Vishnu N Pillai",
    role: "Local Guide",
    destination: "Attentive & Caring Support",
    rating: 5,
  },
  {
    quote: "My last travelling from south africa to India was made easy wit jaseem tours n travels..they helped me to find affordable ticket on time during US Iran war",
    author: "Dipu Chinnappan",
    role: "International Traveler",
    destination: "Flight Ticket Booking",
    rating: 5,
  },
  {
    quote: "I had a great experience with Jeseem Tours and Travels! Their service was professional, friendly, and very well organized. The trip went smoothly, and everything was taken care of on time. I highly recommend them for a stress-free and enjoyable travel experience. Will definitely choose them again.",
    author: "yunus kngd",
    role: "Frequent Traveler",
    destination: "Seamless Tour Planning",
    rating: 5,
  },
  {
    quote: "Wonderful people. They did all what was required & more without me asking for. Excellent customer service. There are very few people in the world who go an extra mile for their customer needs. Jeseem is one of them. I highly recommend them with my whole heart and thank them for all their service. 🫰",
    author: "Ayza Aychu",
    role: "Loyal Customer",
    destination: "Extra-Mile Customer Support",
    rating: 5,
  },
  {
    quote: "Highly recommend Yasim for his deep knowledge of the visa application process, attention to detail and professionalism! He did a thorough job helping my parents with a time sensitive request. Thank you!",
    author: "Preethi Sridhar",
    role: "Verified Client",
    destination: "Visa Application Support",
    rating: 5,
  },
];

export default function Home() {
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
        behavior: "smooth"
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

    const handleMouseEnter = () => { isAutoScrollingRef.current = false; };
    const handleMouseLeave = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      isAutoScrollingRef.current = true;
    };
    const handleTouchStart = () => { pauseAutoScroll(); };

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
    <div ref={containerRef} className="relative w-full bg-[var(--background)]">
      {/* 1. HERO SECTION (Single-Screen Viewport Layout with Full Background Image) */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] max-h-[1080px] w-full flex flex-col justify-between overflow-hidden z-10 bg-transparent pt-24 pb-8 md:pt-28 md:pb-10 px-6 sm:px-12">
        {/* Background Layer (Full Image View, No Dark Fade Overlay) */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <Image
            src="/travel_pink_hero.png"
            alt="Jeseem Travel Header Background"
            fill
            className="object-cover object-center hidden md:block"
            priority
          />
          <Image
            src="/travel_pink_hero_mobile.png"
            alt="Jeseem Travel Mobile Header Background"
            fill
            className="object-cover object-center block md:hidden"
            priority
          />
        </div>

        {/* Hero Central Content */}
        <div className="relative max-w-7xl mx-auto w-full z-20 flex-1 flex flex-col justify-center items-start my-auto">
          {/* Frosted Glass Tagline Pill with Pink Accent */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-pink-500/30 inline-flex items-center gap-2 mb-6 shadow-xl"
          >
            <Compass className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-pink-300 font-bold">
              Est. {COMPANY_DETAILS.established} &bull; {COMPANY_DETAILS.tagline}
            </span>
          </motion.div>

          {/* Main Stylish Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white flex flex-col mb-6 select-none leading-[1.06]">
            <div className="overflow-hidden relative py-0.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block font-normal text-white"
              >
                SAVE THE MONEY PLAN FOR TRAVEL
              </motion.span>
            </div>
            <div className="overflow-hidden relative py-0.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 drop-shadow-lg"
              >
                GO TO THE DESTINATION
              </motion.span>
            </div>
          </h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed font-light text-balance drop-shadow-sm"
          >
            Since {COMPANY_DETAILS.established}, Jeseem Tours & Travels has simplified global journeys. Low airfares, bespoke holiday packages, rapid visa assistance, and emigration support.
          </motion.p>

          {/* Call-to-Action Buttons with Pink Accent Theme */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 z-20"
          >
            <Magnetic range={30} strength={0.25}>
              <Link
                href="/destinations"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 flex items-center gap-2"
              >
                Explore Destinations
                <ArrowUpRight className="w-4 h-4 text-white" />
              </Link>
            </Magnetic>

            <Magnetic range={30} strength={0.25}>
              <a
                href="https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20plan%20a%20trip%20with%20Jeseem%20Tours."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                </svg>
                WhatsApp Consultation
              </a>
            </Magnetic>

            <Magnetic range={30} strength={0.25}>
              <Link
                href="/packages"
                className="px-6 py-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
              >
                Our Packages
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Hero Footer: Compact Trust Badges & Scroll Indicator */}
        <div className="relative max-w-7xl mx-auto w-full z-20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15">
          <div className="flex items-center gap-6 text-white/80 text-xs font-mono tracking-wider">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-pink-400" />
              40+ Years Legacy
            </span>
            <span className="hidden sm:inline text-white/30">&bull;</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
              Verified Visa Care
            </span>
            <span className="hidden md:inline text-white/30">&bull;</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              24/7 Airline Booking Desk
            </span>
          </div>

          {/* Compact Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-2 text-white/70 text-[10px] uppercase tracking-widest pointer-events-none"
          >
            <span>Scroll</span>
            <div className="w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SINGLE STATIC FULL-SCREEN FIXED BACKGROUND CANVAS (POST-HERO) */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        {/* Desktop Background Visual */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/jeseem_bg.png"
            alt="Cinematic fixed travel canvas backdrop"
            fill
            className="object-cover opacity-100"
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
            className="object-cover opacity-100"
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

          {/* Scrollable Track Container with Chevron Arrows */}
          <div className="relative w-full">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 pointer-events-none md:left-8">
              <button
                onClick={() => scrollDestinations("left")}
                className="w-10 h-10 rounded-full bg-[var(--background)]/85 text-[var(--foreground)] border border-[var(--border)] shadow-md flex items-center justify-center pointer-events-auto hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous destination"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30 pointer-events-none md:right-8">
              <button
                onClick={() => scrollDestinations("right")}
                className="w-10 h-10 rounded-full bg-[var(--background)]/85 text-[var(--foreground)] border border-[var(--border)] shadow-md flex items-center justify-center pointer-events-auto hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Next destination"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable track with native touch swipe */}
            <div
              ref={destinationsScrollRef}
              className="w-full overflow-x-auto flex gap-6 px-12 md:px-24 py-6 no-scrollbar"
            >
              {[...DESTINATIONS, ...DESTINATIONS, ...DESTINATIONS, ...DESTINATIONS].map((dest, idx) => (
                <div
                  key={`${dest.id}-${idx}`}
                  className="shrink-0"
                >
                  <TiltCard maxRotation={6}>
                    <div
                      className="relative w-[280px] md:w-[420px] h-[380px] md:h-[550px] rounded-3xl overflow-hidden flex flex-col justify-end p-6 md:p-8 group select-none bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl"
                      data-cursor="explore"
                    >
                      {/* Image with zoom on hover */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 280px, 420px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/35 to-transparent" />
                      </div>

                      {/* Clickable Overlay Link (covers entire card except the WhatsApp button) */}
                      <Link
                        href={`/destinations#${dest.id}`}
                        className="absolute inset-0 z-10"
                        aria-label={`View itinerary for ${dest.name}`}
                      />

                      {/* Destination Title (Only heading in bright yellow/gold color) */}
                      <div className="relative z-20 flex flex-col mt-auto pointer-events-none mb-1">
                        <h4 className="text-3xl font-bold tracking-tight text-amber-400">
                          {dest.name}
                        </h4>
                      </div>

                      {/* WhatsApp Button on z-20 */}
                      <div className="relative z-20 flex mt-2">
                        <a
                          href={`https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(dest.name)}"%20destination%20itinerary.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                        >
                          WhatsApp Inquiry
                        </a>
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
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/85 via-transparent to-transparent z-10" />
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
                  className={`border-b border-white/10 pb-6 cursor-pointer group transition-all duration-300 ${activeServiceIdx === idx ? "opacity-100 pl-4" : "opacity-40 hover:opacity-75"
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
                                href={`/contact?service=${encodeURIComponent(srv.title)}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                              >
                                More Details
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                              <a
                                href={`https://wa.me/919061858416?text=Hi,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(srv.title)}"%20service.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                                </svg>
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
                <div className="absolute inset-0 bg-neutral-950/40 z-10" />
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

      {/* 5.5. WHY CHOOSE US SECTION */}
      <section className="relative py-32 border-t border-white/5 px-6 overflow-hidden z-10 bg-transparent">
        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Why Travelers Choose Us
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Advantage 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-500/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">40+ Years of Experience</h4>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                Guiding travelers since {COMPANY_DETAILS.established || 1985}. Over four decades of deep industry expertise, airline relations, and trusted operations.
              </p>
            </motion.div>

            {/* Advantage 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-500/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Customized Itineraries</h4>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                No cookie-cutter trips. Every holiday, corporate flight booking, or pilgrimage is personalized to fit your budget, timeline, and comfort preferences.
              </p>
            </motion.div>

            {/* Advantage 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-500/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Complete Visa Support</h4>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                From fast global visa clearances to certificate attestation and emigration services, our processing desk handles the heavy paperwork.
              </p>
            </motion.div>

            {/* Advantage 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-500/40 hover:bg-black/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">24/7 Ticketing Assistance</h4>
              <p className="text-sm text-[#86868B] font-light leading-relaxed">
                Emergency flight changes? Last-minute schedule changes? Our dedicated customer care desk coordinates allocations with major airlines day and night.
              </p>
            </motion.div>
          </div>
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
                  <div className="absolute inset-0 bg-neutral-950/35 z-10" />
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
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-6">Save the money plan for travel go to the destination</h3>
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
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
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
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
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

            {/* Write a review button link */}
            <div className="pt-2">
              <Magnetic range={30} strength={0.3}>
                <a
                  href="https://g.page/r/Ca2iU0gCoDpuEBE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-amber-500 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 w-full sm:w-auto justify-center shadow-lg"
                >
                  Write a Google Review
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
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
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
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
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
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
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeMobileReviewIdx === i ? "w-4 bg-amber-500" : "w-1.5 bg-white/20"
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
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
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
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
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
