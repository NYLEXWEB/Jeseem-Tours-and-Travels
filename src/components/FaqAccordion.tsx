"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { FaqItem } from "@/lib/schema";

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export default function FaqAccordion({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our flight bookings, custom holiday packages, visa assistance, and document attestation in Alappuzha, Kerala.",
  badge = "HELP & FREQUENTLY ASKED QUESTIONS",
  className = "",
}: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIdx((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={`relative w-full py-16 md:py-24 border-t border-white/10 ${className}`}
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gradient-light border border-sky-500/30 text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
            {title}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* FAQ Items Accordion */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const faqId = `faq-content-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-white/20"
              >
                <button
                  id={buttonId}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff007f]"
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg font-medium text-white">
                    <HelpCircle className="w-5 h-5 text-[#ff007f] shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70"
                  >
                    <ChevronDown className="w-4 h-4 text-white" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={faqId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
