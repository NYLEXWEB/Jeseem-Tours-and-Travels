import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Destinations", href: "/destinations" },
        { name: "Travel Packages", href: "/packages" },
        { name: "Luxury Experiences", href: "/" },
        { name: "Last Minute Deals", href: "/packages" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Personal Planning", href: "/contact" },
        { name: "Corporate Travel", href: "/contact" },
        { name: "Private Charters", href: "/contact" },
        { name: "VIP Concierge", href: "/contact" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Careers", href: "/about" },
        { name: "Press & Media", href: "/about" },
        { name: "Contact Us", href: "/contact" }
      ]
    }
  ];

  return (
    <footer className="relative z-10 bg-[#080808] border-t border-white/10 pt-20 pb-10 text-[#86868B]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 pb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-col mb-4">
              <span className="text-2xl font-extrabold tracking-widest text-white">JESEEM</span>
              <span className="text-[10px] tracking-widest text-amber-500 font-semibold uppercase mt-0.5">
                tours & travels
              </span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed mt-4">
              Crafting bespoke luxury travel experiences for discerning global adventurers. We create journeys that linger in the memory, long after the dust has settled.
            </p>
            <div className="mt-6 text-xs flex flex-col gap-1.5 text-[#86868B]">
              <p>
                <strong className="text-white font-medium">Head Office:</strong> Mullathuvallappu- Valiyachudukadu Rd, Jn, Thiruvambady, P.O, Alappuzha, Kerala 688002
              </p>
              <p>
                <strong className="text-white font-medium">Phone:</strong> +91 90618 58416
              </p>
              <p>
                <strong className="text-white font-medium">Rating:</strong> 4.9 ★ (115 Google Reviews)
              </p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-xs hover:text-white transition-colors duration-300"
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex flex-wrap gap-4 text-center md:text-left justify-center md:justify-start">
            <p>&copy; {currentYear} Jeseem Tours & Travels. All rights reserved.</p>
            <span className="hidden md:inline">|</span>
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/jeseem_tours" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Instagram</a>
            <a href="https://wa.me/919061858416?text=Hi%20Jeseem%20Tours%20%26%20Travels,%20I%27m%20interested%20in%20planning%20a%20bespoke%20journey." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">WhatsApp</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Facebook</a>
            <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
