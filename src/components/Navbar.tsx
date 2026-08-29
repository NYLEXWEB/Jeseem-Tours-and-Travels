"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { COMPANY_DETAILS } from "@/constants/company";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if navbar is at the top of the page
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        
        // Hide navbar on scroll down, show on scroll up
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
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isAtTop 
            ? "py-6 bg-transparent border-b border-transparent" 
            : "py-4 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="relative block h-8 md:h-10 w-28 md:w-36" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Jeseem Tours & Travels"
              fill
              className="object-contain"
              priority
            />
          </Link>
 
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs uppercase tracking-widest transition-colors duration-300 relative py-1 group text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 bg-[var(--foreground)]" />
              </Link>
            ))}
          </div>
 
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Magnetic range={35} strength={0.3}>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
              >
                Plan Your Journey
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Magnetic>
          </div>
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-[var(--foreground)] hover:text-amber-500 transition-colors z-50 relative flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              <motion.line
                x1="4" y1="6" x2="20" y2="6"
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: "12px", originY: "6px" }}
              />
              <motion.line
                x1="4" y1="12" x2="20" y2="12"
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{ originX: "12px", originY: "12px" }}
              />
              <motion.line
                x1="4" y1="18" x2="20" y2="18"
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
            />

            {/* Menu Sliding Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[400px] bg-[var(--background)]/98 border-l border-[var(--border)] z-30 flex flex-col justify-between p-8 pt-28 md:hidden shadow-2xl"
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
                        className="text-3xl font-extralight tracking-wide text-[var(--foreground)] hover:text-amber-500 transition-colors flex items-center gap-2 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-5 h-5 text-[var(--foreground)]/30 group-hover:text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
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
                    className="w-full py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] font-semibold text-xs uppercase tracking-wider text-center block hover:bg-amber-500 hover:text-white transition-all active:scale-95 duration-300"
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
    </>
  );
}
