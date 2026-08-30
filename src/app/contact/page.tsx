"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Calendar, ShieldAlert, Star, Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import ScrollReveal, { ScrollStagger } from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";
import { COMPANY_DETAILS } from "@/constants/company";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Flight Booking",
    duration: "1-2 Weeks",
    travelers: "2 Guests",
    budget: "Standard",
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
    "Custom Destination Inquiry",
    "Flight Booking",
    "Domestic Holiday Package",
    "International Holiday Package",
    "Global Visa Assistance",
    "Certificate Attestation",
    "Hajj & Umrah Pilgrimage",
    "Other Travel Support"
  ];

  return (
    <div className="bg-[var(--background)] pt-32 pb-20 px-6">
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
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-3xl">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-sm font-semibold text-[var(--foreground)] ml-2">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Based on <strong className="text-[var(--foreground)] font-medium">115 verified Google reviews</strong>. Highly recommended travel agency offering custom packages and premium ticket booking with expert staff.
              </p>
            </ScrollReveal>

            {/* Physical Location Address */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-bold">Office Address</h3>
              </div>
              <p className="text-sm text-[var(--foreground)] font-light leading-relaxed">
                Jeseem Tours & Travels<br />
                {COMPANY_DETAILS.address}
              </p>

              <div className="h-[1px] bg-[var(--border)] w-full" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Business Hours</span>
                </div>
                <p className="text-xs text-[var(--foreground)]">Open · {COMPANY_DETAILS.hours} (Mon – Sat)</p>
                <p className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                  *Standard office timing. For late reservations, contact our WhatsApp support desks.
                </p>
              </div>
            </ScrollReveal>

            {/* Department Contacts Card */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-3xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-bold mb-2">Our Departments</h3>

              <div className="space-y-4 text-xs">
                {/* Reservations */}
                <div className="border-b border-[var(--border)] pb-3">
                  <p className="font-bold text-amber-500 uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.reservations.label}</p>
                  <p className="text-[var(--foreground)] mt-1">Phone/WhatsApp: <a href={`tel:${COMPANY_DETAILS.departments.reservations.phone}`} className="hover:text-amber-500 font-mono font-semibold">{COMPANY_DETAILS.departments.reservations.phone}</a></p>
                  <p className="text-[var(--foreground-muted)]">Email: <a href={`mailto:${COMPANY_DETAILS.departments.reservations.email}`} className="hover:text-amber-500 font-mono">{COMPANY_DETAILS.departments.reservations.email}</a></p>
                </div>

                {/* Holidays */}
                <div className="border-b border-[var(--border)] pb-3">
                  <p className="font-bold text-amber-500 uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.holidays.label}</p>
                  <p className="text-[var(--foreground)] mt-1">Phone/WhatsApp: <a href={`tel:${COMPANY_DETAILS.departments.holidays.phone}`} className="hover:text-amber-500 font-mono font-semibold">{COMPANY_DETAILS.departments.holidays.phone}</a></p>
                  <p className="text-[var(--foreground-muted)]">Email: <a href={`mailto:${COMPANY_DETAILS.departments.holidays.email}`} className="hover:text-amber-500 font-mono">{COMPANY_DETAILS.departments.holidays.email}</a></p>
                </div>

                {/* Visa Team */}
                <div className="border-b border-[var(--border)] pb-3">
                  <p className="font-bold text-amber-500 uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.visas.label}</p>
                  <p className="text-[var(--foreground-muted)] mt-1">Email: <a href={`mailto:${COMPANY_DETAILS.departments.visas.email}`} className="hover:text-amber-500 font-mono">{COMPANY_DETAILS.departments.visas.email}</a></p>
                </div>

                {/* Admin */}
                <div>
                  <p className="font-bold text-amber-500 uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.admin.label}</p>
                  <p className="text-[var(--foreground)] mt-1">Official Phone: <a href={`tel:${COMPANY_DETAILS.departments.admin.phone}`} className="hover:text-amber-500 font-mono font-semibold">{COMPANY_DETAILS.departments.admin.phone}</a></p>
                  <p className="text-[var(--foreground-muted)]">Email: <a href={`mailto:${COMPANY_DETAILS.departments.admin.email}`} className="hover:text-amber-500 font-mono">{COMPANY_DETAILS.departments.admin.email}</a></p>
                </div>
              </div>
            </ScrollReveal>
          </ScrollStagger>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-3 relative bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 md:p-12 overflow-hidden">

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
                      className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      {destinationsList.map((d) => (
                        <option key={d} value={d} className="bg-[var(--card-bg)] text-[var(--foreground)]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grid Inputs for traveler, duration, budget */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Travelers selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Travelers</label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="1 Guest" className="bg-[var(--card-bg)] text-[var(--foreground)]">Solo Traveler</option>
                        <option value="2 Guests" className="bg-[var(--card-bg)] text-[var(--foreground)]">Couple (2 Guests)</option>
                        <option value="3-5 Guests" className="bg-[var(--card-bg)] text-[var(--foreground)]">Small Family (3-5 Guests)</option>
                        <option value="6+ Guests" className="bg-[var(--card-bg)] text-[var(--foreground)]">Group Booking (6+ Guests)</option>
                      </select>
                    </div>

                    {/* Duration selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Duration</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Under 1 Week" className="bg-[var(--card-bg)] text-[var(--foreground)]">Under 1 Week</option>
                        <option value="1-2 Weeks" className="bg-[var(--card-bg)] text-[var(--foreground)]">1 - 2 Weeks</option>
                        <option value="2-3 Weeks" className="bg-[var(--card-bg)] text-[var(--foreground)]">2 - 3 Weeks</option>
                        <option value="3+ Weeks" className="bg-[var(--card-bg)] text-[var(--foreground)]">Extended Expedition (3+ Weeks)</option>
                      </select>
                    </div>

                    {/* Budget scale */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Expected Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Economy" className="bg-[var(--card-bg)] text-[var(--foreground)]">Budget Friendly (Economy)</option>
                        <option value="Standard" className="bg-[var(--card-bg)] text-[var(--foreground)]">Mid-Range (Standard)</option>
                        <option value="Premium" className="bg-[var(--card-bg)] text-[var(--foreground)]">Premium / Luxury</option>
                        <option value="Group Fare" className="bg-[var(--card-bg)] text-[var(--foreground)]">Group Fare / Corporate Packages</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--border)]">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/40 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/40 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Phone Number (Secure)</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 90618 58416"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/40 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Additional Requests or Flight Logistics</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about specific food allergies, room layouts, local private bookings, private jet clearances, or pace of exploration..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[var(--background)]/60 border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/40 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[var(--border)]">
                    <span className="text-[10px] text-[var(--foreground-muted)] flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                      All details are encrypted and private.
                    </span>

                    <Magnetic range={30} strength={0.25}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-semibold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-50 disabled:opacity-50 transition-all duration-300 cursor-pointer"
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
                  <h3 className="text-3xl font-light text-[var(--foreground)] tracking-tight mb-4">Inquiry Received</h3>
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-8">
                    Thank you, <b>{formData.name}</b>. Your travel vision is securely dispatched. A travel architect will reach out to <b>{formData.email}</b> within 24 hours with custom routes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-[var(--border)] text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all cursor-pointer"
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
