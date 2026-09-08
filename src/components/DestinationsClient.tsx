"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CloudSun, Compass, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import { FaqItem } from "@/lib/schema";

const DESTINATIONS = [
  {
    id: "dubai",
    name: "Dubai & Abu Dhabi Tour Packages",
    country: "UAE",
    image: "/destinations/Dubai.png",
    coords: "25.2048° N, 55.2708° E",
    bestTime: "October – April",
    description:
      "A dazzling desert metropolis where world-record architecture, luxury shopping, desert dune safaris, and Arabian hospitality converge. Fast-track UAE tourist visa processing included.",
    highlights: [
      "Burj Khalifa 124th & 125th floor VIP observatory entry",
      "Desert safari with 4x4 dune bashing, BBQ dinner & live show",
      "Luxury yacht cruise around Dubai Marina & Palm Jumeirah",
      "Abu Dhabi Grand Mosque & Ferrari World day excursion",
    ],
    alt: "Dubai tour package from Kerala with desert safari and Burj Khalifa by Jeseem Tours",
  },
  {
    id: "maldives",
    name: "Maldives Honeymoon & Luxury Resort Packages",
    country: "Indian Ocean",
    image: "/destinations/Maldives.png",
    coords: "3.2028° N, 73.2207° E",
    bestTime: "November – April",
    description:
      "The gold standard for romantic island luxury. Discover pristine overwater villas, private island dining, and vibrant coral reef marine sanctuaries with direct seaplane transfers.",
    highlights: [
      "Private overwater villa with private plunge pool",
      "Snorkeling & scuba diving with manta rays and sea turtles",
      "Romantic candlelit beach dinner with sunset views",
      "Roundtrip scenic seaplane or speedboat transfers",
    ],
    alt: "Maldives luxury overwater villa honeymoon package from Kerala by Jeseem Tours",
  },
  {
    id: "georgia",
    name: "Georgia Caucasus Mountain & Culture Packages",
    country: "Caucasus / Europe",
    image: "/destinations/Georgia.png",
    coords: "41.7151° N, 44.8271° E",
    bestTime: "May – October",
    description:
      "A picturesque land of ancient Orthodox mountain monasteries, snow-capped Caucasus peaks, historic cobblestone streets, and legendary hospitality with easy visa for Indian passport holders.",
    highlights: [
      "Tbilisi Old Town guided tour, Narikala Fortress & sulfur baths",
      "Kazbegi mountain expedition, Stepantsminda & Gergeti Trinity Church",
      "Kakheti wine cradle region private tour & traditional culinary tasting",
      "Batumi Black Sea coastal boulevard & botanical garden tour",
    ],
    alt: "Georgia Caucasus holiday tour package from Kerala by Jeseem Travels",
  },
  {
    id: "malaysia",
    name: "Malaysia & Langkawi Island Tour Packages",
    country: "Southeast Asia",
    image: "/destinations/Malaysia.png",
    coords: "3.1390° N, 101.6869° E",
    bestTime: "Year-Round",
    description:
      "A captivating blend of futuristic cityscapes, UNESCO heritage architecture, ancient tropical rainforests, and idyllic island beaches in Langkawi.",
    highlights: [
      "Petronas Twin Towers skybridge & Kuala Lumpur city tour",
      "Langkawi island hopping, cable car ride & sky bridge view",
      "Genting Highlands indoor/outdoor theme park & cable car",
      "Batu Caves Hindu shrine guided cultural excursion",
    ],
    alt: "Malaysia and Langkawi holiday tour package from Kerala by Jeseem Travels",
  },
  {
    id: "kerala",
    name: "Kerala Tourism & Luxury Backwater Houseboat Packages",
    country: "India",
    image: "/destinations/Kerala.png",
    coords: "10.8505° N, 76.2711° E",
    bestTime: "September – March",
    description:
      "Experience God's Own Country with serene backwaters in Alappuzha, emerald tea gardens in Munnar, misty hill stations in Wayanad, and luxury beach retreats in Kovalam.",
    highlights: [
      "Private luxury houseboat cruise with traditional Kerala cuisine",
      "Munnar tea plantation guided walks, waterfalls & Mattupetty Dam",
      "Authentic Ayurvedic rejuvenation therapy & wellness spa stays",
      "Periyar wildlife sanctuary boat safari in Thekkady",
    ],
    alt: "Kerala backwater luxury houseboat package in Alappuzha by Jeseem Tours",
  },
  {
    id: "lakshadweep",
    name: "Lakshadweep Island Marine Sanctuary Packages",
    country: "India",
    image: "/destinations/Lakshadweep.png",
    coords: "10.5667° N, 72.6417° E",
    bestTime: "October – May",
    description:
      "A breathtaking tropical archipelago surrounded by turquoise lagoons, thriving coral reefs, and white-sand beaches. Perfect for secluded island getaways and marine water adventures.",
    highlights: [
      "PADI certified scuba diving & coral reef snorkeling",
      "Lagoon kayaking, windsurfing & glass-bottom boat excursions",
      "Secluded beach villa resort stays in Bangaram & Agatti",
      "Complete entry permit processing & flight/ship transfer coordination",
    ],
    alt: "Lakshadweep island holiday tour package from Kerala by Jeseem Tours",
  },
];

interface DestinationsClientProps {
  faqItems: FaqItem[];
}

export default function DestinationsClient({ faqItems }: DestinationsClientProps) {
  const breadcrumbItems = [
    { name: "Destinations", url: "/destinations" },
  ];

  return (
    <div className="bg-[var(--background)] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Visual Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-20">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-[#ff007f]" />
              <span className="text-xs uppercase tracking-widest text-brand-gradient font-bold">
                POPULAR HOLIDAY DESTINATIONS
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="mask-reveal" duration={1.2} delay={0.15}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6">
              Bespoke Tour Destinations
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={0.8} delay={0.3}>
            <p className="text-[#86868B] text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Curated domestic and international holiday tour packages departing from Kerala. Every destination reflects our standards of safety, competitive pricing, seamless visa clearance, and luxury hospitality.
            </p>
          </ScrollReveal>
        </div>

        {/* Destination List */}
        <div className="flex flex-col gap-28">
          {DESTINATIONS.map((dest, idx) => (
            <section
              id={dest.id}
              key={dest.id}
              aria-label={`${dest.name} Tour Package`}
            >
              <ScrollReveal
                variant="fade-up"
                duration={0.8}
                once
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Destination Image Showcase */}
                <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 group shadow-xl">
                  <Image
                    src={dest.image}
                    alt={dest.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-neutral-950/30 group-hover:bg-neutral-950/20 transition-colors" />
                  <span className="absolute bottom-6 left-6 text-xs font-mono text-neutral-50/80 bg-neutral-950/60 px-3 py-1.5 rounded-full backdrop-blur-md">
                    {dest.coords}
                  </span>
                </div>

                {/* Destination Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <span className="text-xs uppercase tracking-widest text-[#ff007f] font-bold mb-2">
                    {dest.country}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--foreground)] mb-6">
                    {dest.name}
                  </h2>
                  <p className="text-[var(--foreground-muted)] text-base leading-relaxed mb-6 font-light">
                    {dest.description}
                  </p>

                  {/* Best Season */}
                  <div className="flex items-center gap-2 mb-6 text-xs text-[var(--foreground)] bg-[var(--card-bg)] px-4 py-2.5 rounded-full border border-[var(--border)]">
                    <CloudSun className="w-4 h-4 text-[#ff007f]" />
                    <span>
                      Best Season to Travel: <b>{dest.bestTime}</b>
                    </span>
                  </div>

                  {/* Key Highlights */}
                  <div className="w-full border-t border-[var(--border)] pt-6 mb-8">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-bold mb-4">
                      Curated Tour Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--foreground-muted)]">
                      {dest.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#ff007f] font-bold mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                    <Magnetic range={30} strength={0.3}>
                      <Link
                        href={`/contact?destination=${encodeURIComponent(dest.name)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient-btn font-semibold text-xs uppercase tracking-wider shadow-md w-full sm:w-auto justify-center hover:scale-105 transition-transform"
                      >
                        Inquire Custom Route
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </Magnetic>
                    <Magnetic range={30} strength={0.3}>
                      <a
                        href={`https://wa.me/919061858416?text=Hi%20Jeseem%20Tours,%20I%20would%20like%20to%20inquire%20about%20the%20"${encodeURIComponent(
                          dest.name
                        )}"%20destination%20itinerary.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors w-full sm:w-auto"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                        </svg>
                        WhatsApp Inquiry
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </ScrollReveal>
            </section>
          ))}
        </div>

        {/* CUSTOM DESTINATION INQUIRY BANNER */}
        <div className="mt-28 border-t border-[var(--border)] pt-20">
          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="bg-[var(--card-bg)] border border-[#c4007b]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4 text-left">
                <span className="text-xs uppercase tracking-widest text-[#ff007f] font-bold block">
                  CAN'T FIND YOUR DREAM LOCATION?
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Inquire For A Custom Holiday Destination
                </h2>
                <p className="text-[var(--foreground-muted)] text-base font-light leading-relaxed">
                  Have a specific city, country, or customized multi-stop itinerary in mind? Our travel architects build bespoke itineraries from scratch tailored to your exact budget, timeline, and preferences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <Magnetic range={30} strength={0.3}>
                  <Link
                    href="/contact?destination=Custom+Destination+Inquiry"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-gradient-btn text-white font-bold text-xs uppercase tracking-wider shadow-lg w-full sm:w-auto hover:scale-105 transition-transform"
                  >
                    Custom Destination Inquiry
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic range={30} strength={0.3}>
                  <a
                    href="https://wa.me/919061858416?text=Hi%20Jeseem%20Tours,%20I%20would%20like%20to%20inquire%20about%20planning%20a%20custom%20destination%20trip."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors w-full sm:w-auto"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.422 0 9.833-4.329 9.836-9.65.002-2.577-1.002-5.001-2.827-6.828-1.826-1.828-4.254-2.831-6.837-2.832-5.43 0-9.842 4.331-9.845 9.654a9.497 9.497 0 0 0 1.492 5.097l-.988 3.606 3.792-.962zm11.233-6.612c-.3-.15-1.774-.875-2.048-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.007-.504-1.684-.919-2.358-2.072-.175-.3-.175-.55-.025-.7.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.588-.492-.509-.675-.518-.175-.009-.375-.01-.575-.01a1.11 1.11 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.705.633.717.228 1.37.196 1.885.119.574-.085 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425.075-.025.15-.125.075-.275z" />
                    </svg>
                    WhatsApp Custom Inquiry
                  </a>
                </Magnetic>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* DESTINATIONS FAQ SECTION */}
        <FaqAccordion
          items={faqItems}
          title="Destinations & Travel Planning FAQs"
          subtitle="Frequently asked questions about best travel seasons, visa requirements, flights, and customized itineraries from Kerala."
          badge="DESTINATION PLANNING GUIDE"
          className="mt-20"
        />
      </div>
    </div>
  );
}
