import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import JsonLd from "@/components/JsonLd";
import { getFaqSchema, getServiceSchema, FaqItem, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Best Travel Agency in Alappuzha Kerala | Jeseem Tours & Travels",
  description:
    "Trusted since 1985. Jeseem Tours & Travels is the premier travel agency in Alappuzha, Kerala. Expert in group flight bookings, international tour packages (Dubai, Maldives, Georgia), visa assistance & certificate attestation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Travel Agency in Alappuzha Kerala | Jeseem Tours & Travels",
    description:
      "Save, Plan and Go with Jeseem Tours & Travels. Over 40 years of trusted flight booking, holiday packages, global visas, and document attestations in Alappuzha, Kerala.",
    url: SITE_URL,
    siteName: "Jeseem Tours & Travels",
    images: [
      {
        url: "/about.jpg",
        width: 1200,
        height: 630,
        alt: "Jeseem Tours & Travels - Best Travel Agency in Alappuzha Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Travel Agency in Alappuzha Kerala | Jeseem Tours & Travels",
    description:
      "Trusted travel partner since 1985 in Alappuzha, Kerala. Group flight tickets, holiday packages, and global visa support.",
    images: ["/about.jpg"],
  },
};

const HOME_FAQS: FaqItem[] = [
  {
    question: "Why is Jeseem Tours & Travels considered the best travel agency in Alappuzha, Kerala?",
    answer:
      "Established in 1985 in Thiruvampady, Alappuzha, Jeseem Tours & Travels brings over 40 years of continuous industry trust. We are known for securing lowest group flight tickets, offering curated international holiday tour packages (Dubai, Maldives, Georgia, Malaysia, Kerala), fast-track global visa processing, certified document attestations, and dedicated 24/7 client support with 100% transparent pricing and no hidden costs.",
  },
  {
    question: "How can I book group flight tickets and special series fares with Jeseem Tours?",
    answer:
      "We provide exclusive access to group allocations, special airline series fares, and corporate deals on major domestic and international airlines. You can reach out directly via our reservations hotline (0477 2266007), WhatsApp (+91 9061858416), or submit an online booking inquiry through our website.",
  },
  {
    question: "What international tour packages from Kerala do you offer?",
    answer:
      "We offer tailored international holiday packages departing from Kerala to top global destinations including Dubai (desert safari, Burj Khalifa, luxury shopping), Maldives (private overwater bungalows, coral reef snorkeling), Georgia (Caucasus mountain expeditions, wine valleys), Malaysia (Petronas Towers, Langkawi beach resorts), and holy Hajj & Umrah pilgrimage packages.",
  },
  {
    question: "Does Jeseem Tours provide visa assistance and certificate attestation in Alappuzha?",
    answer:
      "Yes. Our specialized documents desk in Alappuzha provides comprehensive tourist, visit, and business visa guidance for UAE, GCC countries, Schengen Europe, UK, USA, Canada, and Southeast Asia. We also handle HRD, MEA Apostille, and embassy certificate attestation for educational, commercial, and personal documents.",
  },
  {
    question: "Where is Jeseem Tours & Travels located and how do I contact you?",
    answer:
      "Our main office is situated at Thiruvampady P.O, Alappuzha - 688002, Kerala, India. You can call us at 0477 2266007, WhatsApp our team at +91 9061858416, or email us at admin@jeseemtours.com. Our office hours are Monday through Saturday, 09:30 AM to 06:00 PM.",
  },
];

export default function HomePage() {
  const faqSchema = getFaqSchema(HOME_FAQS);
  const flightServiceSchema = getServiceSchema({
    name: "Worldwide Group Flight Bookings",
    description:
      "Group flight allocations, series fares, and airline ticket booking assistance in Alappuzha, Kerala.",
    serviceType: "FlightBookingService",
    url: "/packages",
  });
  const holidayServiceSchema = getServiceSchema({
    name: "Customized Domestic & International Holiday Packages",
    description:
      "Bespoke tour packages for Dubai, Maldives, Georgia, Malaysia, Kerala backwaters, and Lakshadweep.",
    serviceType: "TourPackageService",
    url: "/destinations",
  });

  return (
    <>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={flightServiceSchema} />
      <JsonLd schema={holidayServiceSchema} />
      <HomePageClient faqItems={HOME_FAQS} />
    </>
  );
}
