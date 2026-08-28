"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
            : "py-4 bg-black/20 backdrop-blur-md border-b border-white/5 shadow-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex flex-col md:flex-row md:items-baseline md:gap-2" onClick={() => setIsOpen(false)}>
            <span className="text-xl font-extrabold tracking-widest transition-colors duration-300 text-white hover:text-amber-500">
              JESEEM
            </span>
            <span className="text-[9px] tracking-widest font-semibold uppercase mt-0.5 md:mt-0 transition-colors duration-300 text-amber-500">
              tours & travels
            </span>
          </Link>
 
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs uppercase tracking-widest transition-colors duration-300 relative py-1 group text-white/80 hover:text-white"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 bg-white" />
              </Link>
            ))}
          </div>
 
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 border-white/20 text-white hover:bg-white hover:text-black"
            >
              Plan Your Journey
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
 
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden p-2 transition-colors ${isOpen ? "text-white" : "text-white hover:text-amber-500"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>
 
      {/* Mobile Screen Takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-30 flex flex-col justify-between p-8 pt-28 md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-6 mt-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-extralight tracking-wide text-white hover:text-amber-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
 
            <motion.div
              className="flex flex-col gap-8 pb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-[1px] bg-white/10 w-full" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">Inquiries</p>
                  <p className="text-sm text-white mt-1">info@jeseemtours.com</p>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Plan A Trip
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
