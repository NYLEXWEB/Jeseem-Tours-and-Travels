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
    // Certificate Attestation specific state
    documentType: "Degree / Educational Certificate",
    issuingState: "India (Kerala)",
    attestationType: "UAE Attestation",
    // Global Visa Assistance specific state
    visaCategory: "Tourist / Visit Visa",
    targetCountry: "UAE / GCC Countries",
    processingUrgency: "Standard Processing (1 Month)",
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
    }, 1500);
  };

  const destinationsList = [
    "Flight Booking",
    "Domestic Holiday Package",
    "International Holiday Package",
    "Global Visa Assistance",
    "Certificate Attestation",
    "Hajj & Umrah Pilgrimage",
    "Custom Destination Inquiry",
    "Other Travel Support"
  ];

  const isAttestation = formData.destination === "Certificate Attestation";
  const isVisa = formData.destination === "Global Visa Assistance";

  return (
    <div className="bg-[var(--background)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#ff007f]" />
              <span className="text-xs uppercase tracking-widest text-brand-gradient font-bold">CONSULTATION</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.15}>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-[var(--foreground)] mb-6">
              Design Your Journey
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={0.8} delay={0.3}>
            <p className="text-[var(--foreground-muted)] text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed text-balance">
              Connect with our travel & document specialists. Let us arrange a bespoke itinerary or fast-track your document clearances.
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
                  <Star key={s} className="w-4 h-4 fill-[#ff007f] text-[#ff007f]" />
                ))}
                <span className="text-sm font-semibold text-[var(--foreground)] ml-2">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Based on <strong className="text-[var(--foreground)] font-medium">115 verified Google reviews</strong>. Highly recommended travel agency offering custom packages, 100% quality document care, and premium ticket booking with expert staff.
              </p>
            </ScrollReveal>

            {/* Physical Location Address */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff007f]" />
                <h3 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-bold">Office Address</h3>
              </div>
              <p className="text-sm text-[var(--foreground)] font-light leading-relaxed">
                Jeseem Tours & Travels<br />
                {COMPANY_DETAILS.address}
              </p>

              <div className="h-[1px] bg-[var(--border)] w-full" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff007f]" />
                  <span className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Business Hours</span>
                </div>
                <p className="text-xs text-[var(--foreground)]">Open · {COMPANY_DETAILS.hours} (Mon – Sat)</p>
                <p className="text-[10px] text-[var(--foreground-muted)] leading-relaxed">
                  *Standard office timing. For urgent document verification or late flight tickets, contact our WhatsApp support desks.
                </p>
              </div>
            </ScrollReveal>

            {/* Department Contacts Card */}
            <ScrollReveal variant="fade-up" duration={0.6} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-3xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-bold mb-2">Our Departments</h3>

              <div className="space-y-4 text-xs">
                {/* Reservations */}
                <div className="border-b border-[var(--border)] pb-3">
                  <p className="font-bold text-[#c4007b] uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.reservations.label}</p>
                  <p className="text-[var(--foreground)] mt-1">Phone/WhatsApp: <a href={`tel:${COMPANY_DETAILS.departments.reservations.phone}`} className="hover:text-[#c4007b] font-mono font-semibold">{COMPANY_DETAILS.departments.reservations.phone}</a></p>
                  <p className="text-[var(--foreground-muted)]">Email: <a href={`mailto:${COMPANY_DETAILS.departments.reservations.email}`} className="hover:text-[#c4007b] font-mono">{COMPANY_DETAILS.departments.reservations.email}</a></p>
                </div>

                {/* Holidays */}
                <div className="border-b border-[var(--border)] pb-3">
                  <p className="font-bold text-[#c4007b] uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.holidays.label}</p>
                  <p className="text-[var(--foreground)] mt-1">Phone/WhatsApp: <a href={`tel:${COMPANY_DETAILS.departments.holidays.phone}`} className="hover:text-[#c4007b] font-mono font-semibold">{COMPANY_DETAILS.departments.holidays.phone}</a></p>
                  <p className="text-[var(--foreground-muted)]">Email: <a href={`mailto:${COMPANY_DETAILS.departments.holidays.email}`} className="hover:text-[#c4007b] font-mono">{COMPANY_DETAILS.departments.holidays.email}</a></p>
                </div>

                {/* Visa & Attestation Team */}
                <div className="border-b border-[var(--border)] pb-3">
                  <p className="font-bold text-[#c4007b] uppercase tracking-wider text-[10px]">Visa & Attestation Desk</p>
                  <p className="text-[var(--foreground-muted)] mt-1">Email: <a href={`mailto:${COMPANY_DETAILS.departments.visas.email}`} className="hover:text-[#c4007b] font-mono">{COMPANY_DETAILS.departments.visas.email}</a></p>
                </div>

                {/* Admin */}
                <div>
                  <p className="font-bold text-[#c4007b] uppercase tracking-wider text-[10px]">{COMPANY_DETAILS.departments.admin.label}</p>
                  <p className="text-[var(--foreground)] mt-1">Official Phone: <a href={`tel:${COMPANY_DETAILS.departments.admin.phone}`} className="hover:text-[#c4007b] font-mono font-semibold">{COMPANY_DETAILS.departments.admin.phone}</a></p>
                  <p className="text-[var(--foreground-muted)]">Email: <a href={`mailto:${COMPANY_DETAILS.departments.admin.email}`} className="hover:text-[#c4007b] font-mono">{COMPANY_DETAILS.departments.admin.email}</a></p>
                </div>
              </div>
            </ScrollReveal>
          </ScrollStagger>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-3 relative bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm">

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

                  {/* Destination / Service Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#c4007b] font-bold">Select Service / Destination</label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors font-medium"
                    >
                      {destinationsList.map((d) => (
                        <option key={d} value={d} className="bg-[var(--card-bg)] text-[var(--foreground)]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* DYNAMIC TOP 3 INPUT FIELDS */}
                  <AnimatePresence mode="wait">
                    {isAttestation ? (
                      /* CERTIFICATE ATTESTATION FIELDS */
                      <motion.div
                        key="attestation-fields"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {/* 1. Document Type */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#c4007b] font-bold flex items-center gap-1">
                            Document / Certificate Type
                          </label>
                          <select
                            value={formData.documentType}
                            onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="Degree / Educational Certificate">Degree / Educational Certificate</option>
                            <option value="Birth Certificate">Birth Certificate</option>
                            <option value="Marriage Certificate">Marriage Certificate</option>
                            <option value="Diploma / Technical Certificate">Diploma / Technical Certificate</option>
                            <option value="Commercial / Company Documents">Commercial / Company Documents</option>
                            <option value="Police Clearance (PCC)">Police Clearance Certificate (PCC)</option>
                            <option value="Other Personal Documents">Other Personal Documents</option>
                          </select>
                        </div>

                        {/* 2. Issuing State / Country */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#c4007b] font-bold flex items-center gap-1">
                            Issuing Country / State
                          </label>
                          <select
                            value={formData.issuingState}
                            onChange={(e) => setFormData({ ...formData, issuingState: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="India (Kerala)">India (Kerala)</option>
                            <option value="India (Other States)">India (Other States)</option>
                            <option value="UAE / Gulf Region">UAE / Gulf Region</option>
                            <option value="United Kingdom / Europe">United Kingdom / Europe</option>
                            <option value="USA / Canada">USA / Canada</option>
                            <option value="Other Foreign State">Other Foreign State</option>
                          </select>
                        </div>

                        {/* 3. Target Attestation / Purpose */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#c4007b] font-bold flex items-center gap-1">
                            Target Attestation / Purpose
                          </label>
                          <select
                            value={formData.attestationType}
                            onChange={(e) => setFormData({ ...formData, attestationType: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="UAE Attestation">UAE Attestation</option>
                            <option value="Qatar Attestation">Qatar Attestation</option>
                            <option value="Saudi Arabia Attestation">Saudi Arabia Attestation</option>
                            <option value="Kuwait Attestation">Kuwait Attestation</option>
                            <option value="Oman Attestation">Oman Attestation</option>
                            <option value="Bahrain Attestation">Bahrain Attestation</option>
                            <option value="Apostille / MEA India">Apostille / MEA India</option>
                            <option value="Other Country Attestation">Other Country Attestation</option>
                          </select>
                        </div>
                      </motion.div>
                    ) : isVisa ? (
                      /* GLOBAL VISA ASSISTANCE FIELDS */
                      <motion.div
                        key="visa-fields"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {/* 1. Visa Category */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-sky-600 font-bold flex items-center gap-1">
                            Visa Category
                          </label>
                          <select
                            value={formData.visaCategory}
                            onChange={(e) => setFormData({ ...formData, visaCategory: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="Tourist / Visit Visa">Tourist / Visit Visa</option>
                            <option value="Business / Conference Visa">Business / Conference Visa</option>
                            <option value="Family / Dependent Visa">Family / Dependent Visa</option>
                            <option value="Student / Training Visa">Student / Training Visa</option>
                            <option value="Transit Visa">Transit Visa</option>
                            <option value="Other Visa Support">Other Visa Support (Job Visas Excluded)</option>
                          </select>
                        </div>

                        {/* 2. Target Country / Region */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-sky-600 font-bold flex items-center gap-1">
                            Target Country / Region
                          </label>
                          <select
                            value={formData.targetCountry}
                            onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="UAE / GCC Countries">UAE / GCC Countries</option>
                            <option value="Schengen (Europe)">Schengen (Europe)</option>
                            <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                            <option value="USA & Canada">USA & Canada</option>
                            <option value="South East Asia (Malaysia/Singapore/Thailand)">South East Asia (Malaysia/Singapore/Thailand)</option>
                            <option value="Australia & New Zealand">Australia & New Zealand</option>
                            <option value="Other Destinations">Other Destinations</option>
                          </select>
                        </div>

                        {/* 3. Processing Urgency */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-sky-600 font-bold flex items-center gap-1">
                            Processing Urgency
                          </label>
                          <select
                            value={formData.processingUrgency}
                            onChange={(e) => setFormData({ ...formData, processingUrgency: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="Express / Urgent Processing">Express / Urgent Processing</option>
                            <option value="Within 1 - 2 Weeks">Within 1 - 2 Weeks</option>
                            <option value="Standard Processing (1 Month)">Standard Processing (1 Month)</option>
                            <option value="Flexible / Planning Phase">Flexible / Planning Phase</option>
                          </select>
                        </div>
                      </motion.div>
                    ) : (
                      /* DEFAULT TRAVEL / HOLIDAY / FLIGHT FIELDS */
                      <motion.div
                        key="default-fields"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {/* Travelers selection */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Travelers</label>
                          <select
                            value={formData.travelers}
                            onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="1 Guest">Solo Traveler (1 Guest)</option>
                            <option value="2 Guests">Couple (2 Guests)</option>
                            <option value="3-5 Guests">Small Family (3-5 Guests)</option>
                            <option value="6+ Guests">Group Booking (6+ Guests)</option>
                          </select>
                        </div>

                        {/* Duration selection */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Duration</label>
                          <select
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="Under 1 Week">Under 1 Week</option>
                            <option value="1-2 Weeks">1 - 2 Weeks</option>
                            <option value="2-3 Weeks">2 - 3 Weeks</option>
                            <option value="3+ Weeks">Extended Expedition (3+ Weeks)</option>
                          </select>
                        </div>

                        {/* Budget scale */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Expected Budget</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#c4007b] transition-colors"
                          >
                            <option value="Economy">Budget Friendly (Economy)</option>
                            <option value="Standard">Mid-Range (Standard)</option>
                            <option value="Premium">Premium / Luxury</option>
                            <option value="Group Fare">Group Fare / Corporate Packages</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Personal Information (UNCHANGED LOWER FIELDS) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--border)]">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/50 focus:outline-none focus:border-[#c4007b] transition-colors"
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
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/50 focus:outline-none focus:border-[#c4007b] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Phone Number (Secure)</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 90618 58416"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/50 focus:outline-none focus:border-[#c4007b] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">
                      {isAttestation ? "Document & HRD Details or Remarks" : isVisa ? "Visa Requirements & Passport Details" : "Additional Requests or Flight Logistics"}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={
                        isAttestation
                          ? "Specify total certificates, HRD / Home Department status, embassy requirements, or preferred delivery timeline..."
                          : isVisa
                            ? "Mention traveler nationalities, planned entry dates, passport validity, or specific visa requirements (Job Visas are not provided)..."
                            : "Tell us about specific food allergies, room layouts, local private bookings, group flight fares, or pace of exploration..."
                      }
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)]/50 focus:outline-none focus:border-[#c4007b] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[var(--border)]">
                    <span className="text-[10px] text-[var(--foreground-muted)] flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#ff007f]" />
                      100% Quality-Ensured Service & Confidentiality.
                    </span>

                    <Magnetic range={30} strength={0.25}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-gradient-btn text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-all duration-300 cursor-pointer shadow-md"
                      >
                        {isSubmitting ? "Dispatching Inquiry..." : "Submit Inquiry"}
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
                  <CheckCircle2 className="w-16 h-16 text-[#ff007f] mb-6" />
                  <h3 className="text-3xl font-light text-[var(--foreground)] tracking-tight mb-4">Inquiry Received</h3>
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-8">
                    Thank you, <b>{formData.name}</b>. Your inquiry for <b>{formData.destination}</b> has been securely received by our desk. Our travel & document team will contact <b>{formData.email}</b> or call you within 24 hours.
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

