import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { COMPANY_DETAILS } from "@/constants/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Popular Packages",
      links: [
        { name: "Dubai Tour Packages", href: "/packages" },
        { name: "Maldives Honeymoon Packages", href: "/packages" },
        { name: "Georgia Holiday Packages", href: "/packages" },
        { name: "Kerala Backwater Houseboats", href: "/packages" },
        { name: "Hajj & Umrah Pilgrimage", href: "/packages" },
      ],
    },
    {
      title: "Core Travel Services",
      links: [
        { name: "Group Flight Booking", href: "/packages" },
        { name: "Special & Series Fares", href: "/packages" },
        { name: "Global Visa Assistance", href: "/contact" },
        { name: "Certificate Attestation Desk", href: "/contact" },
        { name: "Emigration Clearance Support", href: "/contact" },
      ],
    },
    {
      title: "Top Destinations",
      links: [
        { name: "Dubai, UAE", href: "/destinations" },
        { name: "Maldives Atolls", href: "/destinations" },
        { name: "Georgia, Caucasus", href: "/destinations" },
        { name: "Malaysia & Langkawi", href: "/destinations" },
        { name: "Lakshadweep Islands", href: "/destinations" },
      ],
    },
    {
      title: "Company & Trust",
      links: [
        { name: "About Jeseem Tours", href: "/about" },
        { name: "Founder Legacy & Story", href: "/about" },
        { name: "Guest Reviews & Ratings", href: "/#reviews" },
        { name: "Contact Travel Desks", href: "/contact" },
        { name: "XML Sitemap", href: "/sitemap.xml" },
      ],
    },
  ];

  return (
    <footer
      className="relative z-10 bg-[var(--background)] border-t border-[var(--border)] pt-20 pb-10 text-[var(--foreground-muted)]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 pb-16">
          {/* Brand & Local NAP Details */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="relative block h-12 w-48 mb-4"
              title="Jeseem Tours & Travels - Best Travel Agency in Alappuzha"
            >
              <Image
                src="/logo.png"
                alt="Jeseem Tours & Travels - Travel Agency Alappuzha Kerala"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm max-w-sm leading-relaxed mt-4 text-neutral-400">
              Trusted travel consultancy in Alappuzha, Kerala since{" "}
              {COMPANY_DETAILS.established}. Specialized in worldwide group
              flight tickets, bespoke holiday packages, fast-track visa
              assistance, and certificate attestation.
            </p>

            {/* Semantic NAP for Local SEO */}
            <address className="not-italic mt-6 text-xs flex flex-col gap-2.5 text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff007f] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-medium">
                    Office Address:
                  </strong>{" "}
                  {COMPANY_DETAILS.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff007f] shrink-0" />
                <span>
                  <strong className="text-white font-medium">Phone:</strong>{" "}
                  <a
                    href={`tel:${COMPANY_DETAILS.phone}`}
                    className="hover:text-[#ff007f] transition-colors font-mono"
                  >
                    {COMPANY_DETAILS.phone}
                  </a>{" "}
                  /{" "}
                  <a
                    href={`https://wa.me/919061858416`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors font-mono font-semibold"
                  >
                    +91 90618 58416 (WhatsApp)
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff007f] shrink-0" />
                <span>
                  <strong className="text-white font-medium">Email:</strong>{" "}
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="hover:text-[#ff007f] transition-colors font-mono"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ff007f] shrink-0" />
                <span>
                  <strong className="text-white font-medium">Hours:</strong>{" "}
                  {COMPANY_DETAILS.hours} (Mon – Sat)
                </span>
              </div>
            </address>
          </div>

          {/* Nav Categories */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-widest text-white font-semibold">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-white/10 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-400">
          <div className="flex flex-wrap gap-4 text-center md:text-left justify-center md:justify-start">
            <p>
              &copy; {currentYear} Jeseem Tours & Travels. All rights reserved.
            </p>
            <span className="hidden md:inline">|</span>
            <span>Alappuzha, Kerala, India</span>
            <span>•</span>
            <Link
              href="/sitemap.xml"
              className="hover:text-white transition-colors text-[#ff007f]"
            >
              HTML/XML Sitemap
            </Link>
          </div>
          <div className="flex gap-6">
            <a
              href={COMPANY_DETAILS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href={COMPANY_DETAILS.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors duration-300"
            >
              WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Jeseem+Tours+and+Travels+Alappuzha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Google Maps Location
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
