import type { Metadata } from "next";
import DestinationsClient from "@/components/DestinationsClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getFaqSchema, FaqItem, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tour Destinations from Kerala | Dubai, Maldives, Georgia | Jeseem Tours",
  description:
    "Explore premier holiday destinations from Kerala with Jeseem Tours & Travels. Custom tour packages for Dubai, Maldives, Georgia, Malaysia, Kerala backwaters, and Lakshadweep with visa and flight assistance.",
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Popular Holiday Tour Destinations from Kerala | Jeseem Tours & Travels",
    description:
      "Handpicked domestic and international holiday tour packages from Kerala. Dubai desert safaris, Maldives overwater villas, Georgia mountain trails, and Kerala backwaters.",
    url: `${SITE_URL}/destinations`,
    siteName: "Jeseem Tours & Travels",
    images: [
      {
        url: "/destinations/Dubai.png",
        width: 1200,
        height: 630,
        alt: "Tour Destinations from Kerala - Jeseem Tours & Travels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Destinations from Kerala | Jeseem Tours & Travels",
    description:
      "Custom tour packages for Dubai, Maldives, Georgia, Malaysia, Kerala, and Lakshadweep.",
    images: ["/destinations/Dubai.png"],
  },
};

const DESTINATION_FAQS: FaqItem[] = [
  {
    question: "What are the most popular international destinations from Kerala?",
    answer:
      "Our most sought-after international holiday destinations from Kerala include Dubai (UAE), Maldives luxury island resorts, Georgia (Caucasus mountains), and Malaysia (Kuala Lumpur & Langkawi). All packages feature convenient direct or connecting flight options, private transfers, and complete visa processing.",
  },
  {
    question: "How do I obtain a visa for Dubai, Georgia, or Malaysia from Kerala?",
    answer:
      "Jeseem Tours & Travels manages the entire visa application process for you. For Dubai and Malaysia, we provide fast-track e-visa approvals within 48 to 72 hours. For Georgia, we guide Indian passport holders and GCC resident visa holders through the documentation and entry requirements.",
  },
  {
    question: "What is included in a Maldives honeymoon package from Kerala?",
    answer:
      "Our Maldives packages typically include roundtrip flight bookings from Kochi/Trivandrum, scenic seaplane or speedboat transfers, luxury overwater or beach bungalow accommodations, all-inclusive meal plans, honeymoon amenities (bed decoration, romantic candlelit dinner, spa vouchers), and coral reef snorkeling excursions.",
  },
  {
    question: "Can I customize my destination itinerary according to my budget?",
    answer:
      "Yes, absolutely. Every package can be tailored with flexible duration, hotel category (3-star, 4-star, 5-star luxury), private vs group sightseeing transfers, and personalized activities to match your exact budget and travel style.",
  },
];

export default function DestinationsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Destinations", url: "/destinations" },
  ]);
  const faqSchema = getFaqSchema(DESTINATION_FAQS);
  const destinationListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Tour Destinations from Kerala",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "TouristDestination",
          "name": "Dubai, UAE",
          "description": "Desert safari, Burj Khalifa VIP tours, and luxury shopping packages from Kerala.",
          "url": `${SITE_URL}/destinations#dubai`
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "TouristDestination",
          "name": "Maldives",
          "description": "Luxury overwater villas, coral reef snorkeling, and private island honeymoon packages.",
          "url": `${SITE_URL}/destinations#maldives`
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "TouristDestination",
          "name": "Georgia, Caucasus",
          "description": "Caucasus mountains, historic Tbilisi monasteries, and wine valley holiday tours.",
          "url": `${SITE_URL}/destinations#georgia`
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "TouristDestination",
          "name": "Malaysia & Langkawi",
          "description": "Kuala Lumpur city tour, Petronas Towers, and Langkawi island beach holidays.",
          "url": `${SITE_URL}/destinations#malaysia`
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "TouristDestination",
          "name": "Kerala Backwaters & Hills",
          "description": "Alappuzha private luxury houseboats, Munnar tea garden resorts, and Ayurvedic wellness stays.",
          "url": `${SITE_URL}/destinations#kerala`
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "TouristDestination",
          "name": "Lakshadweep Islands",
          "description": "Turquoise lagoons, coral reefs, scuba diving, and permit assistance.",
          "url": `${SITE_URL}/destinations#lakshadweep`
        }
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={destinationListSchema} />
      <DestinationsClient faqItems={DESTINATION_FAQS} />
    </>
  );
}
