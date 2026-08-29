import Link from "next/link";
import Image from "next/image";
import { COMPANY_DETAILS } from "@/constants/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Destinations", href: "/destinations" },
        { name: "Travel Packages", href: "/packages" },
        { name: "Hajj & Umrah", href: "/packages" },
        { name: "Honeymoon Packages", href: "/packages" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Flight Booking", href: "/packages" },
        { name: "Holiday Packages", href: "/packages" },
        { name: "Visa Assistance", href: "/contact" },
        { name: "Certificate Attestation", href: "/contact" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Terms of Service", href: "/" },
        { name: "Privacy Policy", href: "/" }
      ]
    }
  ];

  return (
    <footer className="relative z-10 bg-[var(--background)] border-t border-[var(--border)] pt-20 pb-10 text-[var(--foreground-muted)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 pb-16">
          <div className="md:col-span-2">
            <Link href="/" className="relative block h-12 w-40 mb-4">
              <Image
                src="/logo.png"
                alt="Jeseem Tours & Travels Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm max-w-sm leading-relaxed mt-4">
              Your trusted travel partner since {COMPANY_DETAILS.established}. From flight bookings and global visa assistance to customized international holidays, we help you Save, Plan, and Go seamlessly.
            </p>
            <div className="mt-6 text-xs flex flex-col gap-1.5 text-[var(--foreground-muted)]">
              <p>
                <strong className="text-[var(--foreground)] font-medium">Office Address:</strong> {COMPANY_DETAILS.address}
              </p>
              <p>
                <strong className="text-[var(--foreground)] font-medium">Phone:</strong> {COMPANY_DETAILS.phone} (Office) / {COMPANY_DETAILS.whatsapp} (WhatsApp)
              </p>
              <p>
                <strong className="text-[var(--foreground)] font-medium">Email:</strong> {COMPANY_DETAILS.email}
              </p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest text-[var(--foreground)] font-semibold">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-xs hover:text-[var(--foreground)] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-[var(--border)] w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex flex-wrap gap-4 text-center md:text-left justify-center md:justify-start">
            <p>&copy; {currentYear} Jeseem Tours & Travels. All rights reserved.</p>
            <span className="hidden md:inline">|</span>
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Sitemap</Link>
          </div>
          <div className="flex gap-6">
            <a href={COMPANY_DETAILS.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors duration-300">Instagram</a>
            <a href={COMPANY_DETAILS.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors duration-300">WhatsApp</a>
            <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-300">Facebook</a>
            <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
