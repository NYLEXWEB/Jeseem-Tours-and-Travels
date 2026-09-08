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
      ],
    },
  ];

  return (
    <footer
      className="relative z-10 bg-[var(--background)] border-t border-neutral-200 pt-16 pb-12 text-neutral-800"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 pb-14">
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
            <p className="text-sm max-w-sm leading-relaxed mt-4 text-neutral-700 font-normal">
              Trusted travel consultancy in Alappuzha, Kerala since{" "}
              {COMPANY_DETAILS.established}. Specialized in worldwide group
              flight tickets, bespoke holiday packages, fast-track visa
              assistance, and certificate attestation.
            </p>

            <address className="not-italic mt-6 text-xs flex flex-col gap-3 text-neutral-800">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C72F62] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-neutral-950 font-bold">
                    Office Address:
                  </strong>{" "}
                  {COMPANY_DETAILS.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C72F62] shrink-0" />
                <span>
                  <strong className="text-neutral-950 font-bold">Phone:</strong>{" "}
                  <a
                    href={`tel:${COMPANY_DETAILS.phone}`}
                    className="hover:text-[#C72F62] transition-colors font-mono font-medium text-neutral-800"
                  >
                    {COMPANY_DETAILS.phone}
                  </a>{" "}
                  /{" "}
                  <a
                    href={`https://wa.me/919061858416`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 transition-colors font-mono font-bold"
                  >
                    +91 90618 58416 (WhatsApp)
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C72F62] shrink-0" />
                <span>
                  <strong className="text-neutral-950 font-bold">Email:</strong>{" "}
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="hover:text-[#C72F62] transition-colors font-mono font-medium text-neutral-800"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C72F62] shrink-0" />
                <span>
                  <strong className="text-neutral-950 font-bold">Hours:</strong>{" "}
                  {COMPANY_DETAILS.hours} (Mon – Sat)
                </span>
              </div>
            </address>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-widest text-neutral-950 font-bold">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-700 hover:text-[#C72F62] font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-neutral-200 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-700 font-medium">
          <div className="flex flex-wrap gap-4 text-center md:text-left justify-center md:justify-start items-center">
            <p className="text-neutral-800">
              &copy; {currentYear} Jeseem Tours & Travels. All rights reserved.
            </p>
            <span className="hidden md:inline text-neutral-300">|</span>
            <span className="text-neutral-700">Alappuzha, Kerala, India</span>
          </div>
          <div className="flex gap-6 font-semibold">
            <a
              href={COMPANY_DETAILS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-pink-600 transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href={COMPANY_DETAILS.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-emerald-600 transition-colors duration-200"
            >
              WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Jeseem+Tours+and+Travels+Alappuzha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-blue-600 transition-colors duration-200"
            >
              Google Maps Location
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
