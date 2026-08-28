"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Calendar, ShieldAlert, Star, Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import ScrollReveal, { ScrollStagger } from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Kyoto, Japan",
    duration: "1-2 Weeks",
    travelers: "2 Guests",
    budget: "$15k - $50k",
    notes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const destinationsList = [
    "Kyoto, Japan",
    "Amalfi Coast, Italy",
    "Swiss Alps, Switzerland",
    "Serengeti, Tanzania",
    "Alappuzha Houseboat, Kerala",
    "Custom Global Journey"
  ];

  return (
    <div className="bg-[#080808] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">CONSULTATION</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.15}>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6">
              Design Your Journey
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={0.8} delay={0.3}>
            <p className="text-[#86868B] text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed text-balance">
              Connect with our travel design specialists. Let us arrange a bespoke itinerary tailored to your private schedule.
            </p>
          </ScrollReveal>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Column: Office Details */}
          <ScrollStagger className="lg:col-span-2 space-y-6">
            
            {/* Trust and Reviews Card */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[#121212] border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-sm font-semibold text-white ml-2">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Based on <strong className="text-white font-medium">115 verified Google reviews</strong>. Highly recommended travel agency offering custom packages and premium ticket booking with expert staff.
              </p>
            </ScrollReveal>

            {/* Physical Location Address */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[#121212] border border-white/10 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs uppercase tracking-widest text-white font-bold">Office Address</h3>
              </div>
              <p className="text-sm text-white font-light leading-relaxed">
                Jeseem Tours & Travels<br />
                Mullathuvallappu- Valiyachudukadu Rd, Jn,<br />
                Thiruvambady, P.O, Alappuzha, Kerala 688002
              </p>
              
              <div className="h-[1px] bg-white/10 w-full" />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Office Hours</span>
                </div>
                <p className="text-xs text-white">Closed · Opens 9:30 AM Sat</p>
                <p className="text-[10px] text-[#86868B] leading-relaxed">
                  *Standard hours may vary during holidays (Ayyankali Jayanthi might affect these hours).
                </p>
              </div>
            </ScrollReveal>

            {/* Direct Communication Channels */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[#121212] border border-white/10 p-6 rounded-3xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-white font-bold mb-4">Direct Channels</h3>
              <div className="flex flex-col gap-3">
                <Magnetic range={30} strength={0.25} className="w-full">
                  <a
                    href="tel:+919061858416"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-2xl hover:bg-amber-500 transition-all duration-300"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call: 090618 58416
                  </a>
                </Magnetic>
                <Magnetic range={30} strength={0.25} className="w-full">
                  <a
                    href="https://wa.me/919061858416"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent border border-white/10 text-white font-semibold text-xs uppercase tracking-wider rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    Chat on WhatsApp
                  </a>
                </Magnetic>
              </div>
            </ScrollReveal>
          </ScrollStagger>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-3 relative bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  
                  {/* Destination Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Select Destination</label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      {destinationsList.map((d) => (
                        <option key={d} value={d} className="bg-[#121212] text-white">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grid Inputs for traveler, duration, budget */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Travelers selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Travelers</label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="1 Guest">Solo Traveler</option>
                        <option value="2 Guests">Couple (2 Guests)</option>
                        <option value="3-5 Guests">Small Family (3-5 Guests)</option>
                        <option value="6+ Guests">Private Delegation (6+ Guests)</option>
                      </select>
                    </div>

                    {/* Duration selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Duration</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Under 1 Week">Under 1 Week</option>
                        <option value="1-2 Weeks">1 - 2 Weeks</option>
                        <option value="2-3 Weeks">2 - 3 Weeks</option>
                        <option value="3+ Weeks">Extended Expedition (3+ Weeks)</option>
                      </select>
                    </div>

                    {/* Budget scale */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Budget (USD)</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="$10k - $25k">$10k - $25k per guest</option>
                        <option value="$25k - $50k">$25k - $50k per guest</option>
                        <option value="$50k - $100k">$50k - $100k per guest</option>
                        <option value="$100k+">$100k+ Charter level</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Phone Number (Secure)</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 90618 58416"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#86868B] font-bold">Additional Requests or Flight Logistics</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about specific food allergies, room layouts, local private bookings, private jet clearances, or pace of exploration..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10">
                    <span className="text-[10px] text-[#86868B] flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                      All details are encrypted and private.
                    </span>
                    
                    <Magnetic range={30} strength={0.25}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 disabled:opacity-50 transition-all duration-300 cursor-pointer"
                      >
                        {isSubmitting ? "Allocating Architect..." : "Submit Inquiry"}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </Magnetic>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center max-w-md mx-auto"
                >
                  <CheckCircle2 className="w-16 h-16 text-amber-500 mb-6" />
                  <h3 className="text-3xl font-light text-white tracking-tight mb-4">Inquiry Received</h3>
                  <p className="text-sm text-[#86868B] leading-relaxed mb-8">
                    Thank you, <b>{formData.name}</b>. Your travel vision is securely dispatched. A travel architect will reach out to <b>{formData.email}</b> within 24 hours with custom routes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-xs text-[#86868B] hover:text-white hover:border-white transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}
