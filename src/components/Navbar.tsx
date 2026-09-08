"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { COMPANY_DETAILS } from "@/constants/company";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar visible near top, or hide on fast scroll down and show on scroll up
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Destinations", href: "/destinations", title: "Explore Holiday Destinations" },
    { name: "Packages", href: "/packages", title: "View Holiday Packages & Flight Bookings" },
    { name: "About Us", href: "/about", title: "About Jeseem Tours & Travels Alappuzha" },
    { name: "Contact", href: "/contact", title: "Contact Travel & Visa Desks" },
  ];

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-6 md:px-8 py-3 md:py-4 pointer-events-none">
      <motion.nav
        role="navigation"
        aria-label="Main Navigation"
        className="pointer-events-auto max-w-7xl mx-auto w-full bg-white border border-neutral-200/90 rounded-2xl shadow-lg shadow-black/5 py-2.5 px-4 sm:px-6 transition-all duration-300"
        initial={{ y: -120 }}
        animate={{ y: isVisible ? 0 : -120 }}
        transition={{ type: "spring", damping: 24, stiffness: 160 }}
      >
        <div className="w-full flex items-center justify-between">
            {/* Transparent Logo without box container */}
            <Link
              href="/"
              className="relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-102 shrink-0 py-1"
              onClick={() => setIsOpen(false)}
              title="Jeseem Tours & Travels - Best Travel Agency in Alappuzha Kerala"
            >
              <div className="relative h-9 sm:h-11 md:h-14 w-36 sm:w-44 md:w-68">
                <Image
                  src="/logo.png"
                  alt="Jeseem Tours & Travels - Premier Tour Operator in Alappuzha, Kerala"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links & CTA (Moved to Right Side) */}
            <div className="hidden md:flex items-center gap-7 lg:gap-9">
              <div className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={link.title}
                    className="text-xs uppercase tracking-widest transition-colors duration-300 relative py-1 font-bold text-[#111111] hover:text-[#c4007b] group"
                    style={{ color: "#111111" }}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 bg-[#c4007b]" />
                  </Link>
                ))}
              </div>

              <Magnetic range={35} strength={0.3}>
                <Link
                  href="/contact"
                  title="Plan Your Travel & Book Flights"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all duration-300"
                >
                  Plan Your Journey
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </Magnetic>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl border-none bg-transparent hover:text-[#c4007b] transition-colors z-50 relative flex items-center justify-center"
              style={{ color: "#000000" }}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" className="w-6 h-6">
                <motion.line
                  x1="4" y1="6" x2="20" y2="6"
                  stroke="#000000"
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: "12px", originY: "6px" }}
                />
                <motion.line
                  x1="4" y1="12" x2="20" y2="12"
                  stroke="#000000"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ originX: "12px", originY: "12px" }}
                />
                <motion.line
                  x1="4" y1="18" x2="20" y2="18"
                  stroke="#000000"
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: "12px", originY: "18px" }}
                />
              </svg>
            </button>
          </div>
        </motion.nav>

      {/* Mobile Screen Takeover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Sliding Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[360px] sm:max-w-[400px] bg-[var(--background)]/98 border-l border-[var(--border)] z-30 flex flex-col justify-between p-6 pt-20 pb-8 sm:p-8 sm:pt-28 md:hidden shadow-2xl overflow-y-auto max-h-screen"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
            >
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 + 0.1, type: "spring", damping: 20, stiffness: 150 }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95, x: 5 }}
                      className="inline-block"
                    >
                      <Link
                        href={link.href}
                        title={link.title}
                        className="text-3xl font-extralight tracking-wide text-[var(--foreground)] hover:text-[#c4007b] transition-colors flex items-center gap-2 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-5 h-5 text-[var(--foreground)]/30 group-hover:text-[#ff007f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-col gap-6 pb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="h-[1px] bg-[var(--border)] w-full" />
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[var(--foreground)]/50">Curated Journeys</p>
                    <p className="text-xs text-[var(--foreground)]/80 mt-1 font-light font-mono">{COMPANY_DETAILS.departments.reservations.email}</p>
                    <p className="text-xs text-[var(--foreground)]/80 font-light font-mono">{COMPANY_DETAILS.departments.reservations.phone}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full py-3.5 rounded-full bg-brand-gradient-btn font-semibold text-xs uppercase tracking-wider text-center block active:scale-95 duration-300 shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Plan A Trip
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
