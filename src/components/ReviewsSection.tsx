"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  X,
  MessageSquareQuote,
  MapPin,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/constants/company";

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  destination: string;
  category: "Holidays" | "Flight Tickets" | "Visa & Attestation" | "Umrah Pilgrimage";
  rating: number;
  date: string;
  quote: string;
  avatarColor: string;
  verified: boolean;
  avatarInitials: string;
  location?: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Ragesh Kurup",
    role: "Business Owner",
    destination: "Dubai Family Tour",
    category: "Holidays",
    rating: 5,
    date: "2 weeks ago",
    quote:
      "Jeseem Tours made our family holiday to Dubai completely hassle-free. From flight bookings with special fares to visa processing and hotel booking near Dubai Mall, everything was executed with extreme precision and luxury standard.",
    avatarColor: "from-amber-500 to-amber-700",
    avatarInitials: "RK",
    verified: true,
    location: "Alappuzha, Kerala",
  },
  {
    id: "rev-2",
    author: "Nithin Madhavan",
    role: "Managing Director",
    destination: "Corporate Travel Solutions",
    category: "Flight Tickets",
    rating: 5,
    date: "3 weeks ago",
    quote:
      "I've been booking our company's corporate flight tickets with Jeseem since 2018. Their ability to secure group bookings and series fares saves us substantial costs every year. Highly responsive hotline support!",
    avatarColor: "from-blue-500 to-indigo-700",
    avatarInitials: "NM",
    verified: true,
    location: "Kochi, Kerala",
  },
  {
    id: "rev-3",
    author: "Fathima Hameed",
    role: "Software Engineer",
    destination: "Visa & Attestation Support",
    category: "Visa & Attestation",
    rating: 5,
    date: "1 month ago",
    quote:
      "Highly recommend Jeseem's visa assistance and certificate attestation services. They handled my document attestation for the UAE employment visa quickly and professionally without any delays.",
    avatarColor: "from-emerald-500 to-teal-700",
    avatarInitials: "FH",
    verified: true,
    location: "Trivandrum, Kerala",
  },
  {
    id: "rev-4",
    author: "Dr. Anand & Anupama",
    role: "Pediatrician",
    destination: "Kashmir Honeymoon Package",
    category: "Holidays",
    rating: 5,
    date: "1 month ago",
    quote:
      "Our customized honeymoon tour to Kashmir was organized beautifully by their holiday team. Very professional, punctual airport transfers, high-end houseboat arrangements in Dal Lake, and excellent hotels.",
    avatarColor: "from-rose-500 to-pink-700",
    avatarInitials: "AA",
    verified: true,
    location: "Alappuzha, Kerala",
  },
  {
    id: "rev-5",
    author: "Sharafudeen K. A.",
    role: "Gulf Expatriate",
    destination: "Umrah Pilgrimage Package",
    category: "Umrah Pilgrimage",
    rating: 5,
    date: "2 months ago",
    quote:
      "We chose Jeseem Tours for our parents' Umrah pilgrimage. The hotel bookings near the Haram in Makkah & Madinah, ground transport, and spiritual guidance were outstanding. Very satisfied and grateful.",
    avatarColor: "from-purple-500 to-indigo-800",
    avatarInitials: "SK",
    verified: true,
    location: "Jeddah / Alappuzha",
  },
  {
    id: "rev-6",
    author: "Joseph Antony",
    role: "Merchant Navy Officer",
    destination: "Emigration & Travel Support",
    category: "Visa & Attestation",
    rating: 5,
    date: "2 months ago",
    quote:
      "Reliable and fast emigration clearance and passport support. The team at the Alappuzha head office was extremely helpful, courteous, and answered all my queries patiently.",
    avatarColor: "from-amber-600 to-orange-700",
    avatarInitials: "JA",
    verified: true,
    location: "Alappuzha, Kerala",
  },
  {
    id: "rev-7",
    author: "Harikrishnan Nair",
    role: "Senior IT Consultant",
    destination: "Swiss Alps & Europe Tour",
    category: "Holidays",
    rating: 5,
    date: "3 weeks ago",
    quote:
      "Planning a multi-city European trip felt daunting until we reached out to Jeseem Tours. They arranged train passes, hotel vouchers, and flight connections effortlessly. Top tier service!",
    avatarColor: "from-cyan-500 to-blue-700",
    avatarInitials: "HN",
    verified: true,
    location: "Bengaluru, India",
  },
  {
    id: "rev-8",
    author: "Ayesha Rahman",
    role: "Executive Manager",
    destination: "International Series Flights",
    category: "Flight Tickets",
    rating: 5,
    date: "1 month ago",
    quote:
      "Unbeatable prices on international flight ticket bookings even during peak holiday seasons. Their series fare discounts are genuine and customer care is available 24/7.",
    avatarColor: "from-fuchsia-500 to-purple-700",
    avatarInitials: "AR",
    verified: true,
    location: "Kozhikode, Kerala",
  },
];

const CATEGORIES = [
  "All",
  "Holidays",
  "Flight Tickets",
  "Visa & Attestation",
  "Umrah Pilgrimage",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

export default function ReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [expandedReview, setExpandedReview] = useState<ReviewItem | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter reviews
  const filteredReviews =
    selectedCategory === "All"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === selectedCategory);

  // Reset slider index when category changes
  const handleSelectCategory = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setActiveMobileIdx(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Listen to scroll position for mobile slider indicators
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < filteredReviews.length) {
      setActiveMobileIdx(newIndex);
    }
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    container.scrollBy({ left: -cardWidth * 0.9, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    container.scrollBy({ left: cardWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative py-28 md:py-36 border-t border-white/5 bg-transparent z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        
        {/* TOP HEADER BLOCK */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-2xl">
            {/* Google Rating Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="text-[11px] uppercase tracking-widest text-white/90 font-bold">
                GOOGLE VERIFIED REVIEWS
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-amber-400">4.9 ★</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
              What Our Distinguished Guests Say
            </h2>

            <p className="text-[#86868B] text-sm md:text-base leading-relaxed font-light">
              Trusted since {COMPANY_DETAILS.established}. Real experiences from travelers booking flights, international holidays, visa attestations, and holy pilgrimages.
            </p>
          </div>

          {/* Overall Stats Card */}
          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-black/60 via-[#121212]/80 to-black/60 border border-white/10 backdrop-blur-xl shadow-xl self-start lg:self-auto">
            <div className="flex flex-col items-center justify-center p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">4.9</span>
              <div className="flex items-center text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>115+ Verified Ratings</span>
              </div>
              <p className="text-[11px] text-[#86868B] mt-0.5">
                Alappuzha & Worldwide Clients
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium mt-1 transition-colors"
              >
                <span>Read all on Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS (Scrollable on Mobile) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 -mx-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? REVIEWS.length
                  : REVIEWS.filter((r) => r.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isSelected
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE VIEW: Enhanced Swipeable Touch Carousel (md:hidden) */}
        {/* ========================================================= */}
        <div className="block md:hidden relative">
          
          {/* Scrollable Container with Snap */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-3 px-1 -mx-1"
          >
            {filteredReviews.map((rev, index) => (
              <div
                key={rev.id}
                className="w-[86vw] sm:w-[340px] flex-shrink-0 snap-center rounded-3xl p-6 bg-gradient-to-b from-[#141414]/90 via-[#0f0f12]/90 to-black/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Subtle Ambient Glow Accent */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

                <div className="space-y-4 relative z-10">
                  {/* Card Header: Avatar + Author Info + Google Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle */}
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20`}
                      >
                        {rev.avatarInitials}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">
                          {rev.author}
                        </h4>
                        <p className="text-[11px] text-[#86868B] font-light">
                          {rev.role}
                        </p>
                      </div>
                    </div>

                    {/* Google Checkmark Pill */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Rating Stars + Category Tag */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono tracking-wider truncate max-w-[170px]">
                      {rev.destination}
                    </span>
                  </div>

                  {/* Review Text Body */}
                  <div className="relative pt-1">
                    <Quote className="w-6 h-6 text-white/10 absolute -top-2 -left-1 rotate-180 pointer-events-none" />
                    <p className="text-xs text-white/85 leading-relaxed font-light pl-4 italic">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#86868B] relative z-10">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500/80" />
                    <span>{rev.location || "Google Review"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40">{rev.date}</span>
                    {rev.quote.length > 100 && (
                      <button
                        onClick={() => setExpandedReview(rev)}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 cursor-pointer"
                      >
                        Read full
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Navigation Bar & Page Indicators */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Step Counter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400">
                {String(Math.min(activeMobileIdx + 1, filteredReviews.length)).padStart(2, "0")}
              </span>
              <span className="text-xs text-white/30">/</span>
              <span className="text-xs font-mono text-white/50">
                {String(filteredReviews.length).padStart(2, "0")}
              </span>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {filteredReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveMobileIdx(i);
                    if (scrollRef.current) {
                      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
                      scrollRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIdx === i
                      ? "w-6 bg-amber-400"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={activeMobileIdx === 0}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                disabled={activeMobileIdx === filteredReviews.length - 1}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW: Staggered 2-Column Grid (hidden on mobile)   */}
        {/* ========================================================= */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {filteredReviews
              .filter((_, idx) => idx % 2 === 0)
              .map((rev, idx) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.2)" }}
                  className="bg-black/50 border border-white/10 p-7 rounded-3xl space-y-5 transition-all duration-300 shadow-2xl backdrop-blur-lg flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20`}
                        >
                          {rev.avatarInitials}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {rev.author}
                          </h4>
                          <p className="text-xs text-[#86868B]">{rev.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-white/85 text-sm leading-relaxed font-light">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#86868B]">{rev.date}</span>
                    <span className="text-[11px] text-amber-400 font-mono tracking-wider">
                      {rev.destination}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:mt-10">
            {filteredReviews
              .filter((_, idx) => idx % 2 === 1)
              .map((rev, idx) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.2)" }}
                  className="bg-black/50 border border-white/10 p-7 rounded-3xl space-y-5 transition-all duration-300 shadow-2xl backdrop-blur-lg flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20`}
                        >
                          {rev.avatarInitials}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {rev.author}
                          </h4>
                          <p className="text-xs text-[#86868B]">{rev.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-white/85 text-sm leading-relaxed font-light">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#86868B]">{rev.date}</span>
                    <span className="text-[11px] text-amber-400 font-mono tracking-wider">
                      {rev.destination}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* BOTTOM ACTION CTA */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>View All 115+ Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* EXPANDABLE REVIEW MODAL FOR MOBILE */}
      <AnimatePresence>
        {expandedReview && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-lg bg-[#121215] border border-white/15 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedReview(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Close review details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 pr-8">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${expandedReview.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/20`}
                >
                  {expandedReview.avatarInitials}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {expandedReview.author}
                  </h3>
                  <p className="text-xs text-[#86868B]">{expandedReview.role}</p>
                </div>
              </div>

              {/* Rating + Tag */}
              <div className="flex items-center justify-between border-y border-white/10 py-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(expandedReview.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs font-bold text-white ml-2">5.0</span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  {expandedReview.destination}
                </span>
              </div>

              {/* Full Quote */}
              <blockquote className="text-sm text-white/90 leading-relaxed font-light italic">
                &ldquo;{expandedReview.quote}&rdquo;
              </blockquote>

              {/* Verification footer */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#86868B]">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Google Verified Review
                </span>
                <span>{expandedReview.date}</span>
              </div>

              <button
                onClick={() => setExpandedReview(null)}
                className="w-full py-3 rounded-full bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
