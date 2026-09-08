import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getFaqSchema, FaqItem, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us | 40+ Years Travel Agency in Alappuzha | Jeseem Tours & Travels",
  description:
    "Learn about Jeseem Tours & Travels, established in 1985 in Alappuzha, Kerala. Over 40 years of dedicated service in group flight bookings, customized tour packages, and global visa assistance.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Jeseem Tours & Travels | 40+ Years of Travel Trust in Kerala",
    description:
      "Founded in 1985 by Late Kunjumon Ismail, Jeseem Tours & Travels has served thousands of happy travelers with group flight bookings, holiday packages, and visa assistance in Alappuzha.",
    url: `${SITE_URL}/about`,
    siteName: "Jeseem Tours & Travels",
    images: [
      {
        url: "/best-travel-agency-alappuzha-kerala-jeseem-tours.jpg",
        width: 1200,
        height: 630,
        alt: "About Jeseem Tours & Travels Alappuzha Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Jeseem Tours & Travels Alappuzha",
    description:
      "Trusted travel partner in Kerala since 1985. Four decades of excellence in flights, holidays, and visa processing.",
    images: ["/best-travel-agency-alappuzha-kerala-jeseem-tours.jpg"],
  },
};

const ABOUT_FAQS: FaqItem[] = [
  {
    question: "When was Jeseem Tours & Travels established?",
    answer:
      "Jeseem Tours & Travels was established in 1985 in Thiruvampady, Alappuzha, Kerala by our visionary founder Late Kunjumon Ismail. We have been continuously providing professional travel consultancy services for over 40 years.",
  },
  {
    question: "What core values guide Jeseem Tours & Travels?",
    answer:
      "Our operations are guided by our foundational motto 'Save - Plan - Go'. We believe in 100% transparent pricing, zero hidden costs, multi-stage document verification, personalized trip curation, and dedicated 24/7 traveler care.",
  },
  {
    question: "What travel services can I access through your Alappuzha office?",
    answer:
      "From our Alappuzha headquarters, we offer worldwide group flight ticket bookings, special airline series fares, customized domestic & international tour packages (Dubai, Maldives, Georgia, Malaysia, Kerala), tourist & business visa guidance, certificate attestation (HRD, MEA, Embassy), and Hajj & Umrah pilgrimage support.",
  },
  {
    question: "How does Jeseem Tours guarantee quality and reliability?",
    answer:
      "Every airline ticket allocation, visa application, and holiday itinerary undergoes multi-stage verification by senior travel specialists before confirmation, ensuring zero booking errors and maximum passenger peace of mind.",
  },
];

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);
  const faqSchema = getFaqSchema(ABOUT_FAQS);

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <AboutClient faqItems={ABOUT_FAQS} />
    </>
  );
}
