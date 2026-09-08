import type { Metadata } from "next";
import PackagesClient from "@/components/PackagesClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getFaqSchema, FaqItem, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tour Packages & Flight Deals from Kerala | Jeseem Tours & Travels",
  description:
    "Book customized domestic & international tour packages from Kerala. Exclusive Dubai desert safari holidays, luxury Maldives honeymoons, worldwide group flight tickets, visa assistance & Hajj-Umrah pilgrimage.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Holiday Tour Packages & Flight Bookings from Kerala | Jeseem Tours",
    description:
      "Handcrafted travel packages with best airline rates, luxury hotels, airport transfers, and guided sightseeing from Alappuzha, Kerala.",
    url: `${SITE_URL}/packages`,
    siteName: "Jeseem Tours & Travels",
    images: [
      {
        url: "/group-flight-ticket-booking-series-fares-alappuzha.jpg",
        width: 1200,
        height: 630,
        alt: "Tour Packages & Flight Deals - Jeseem Tours & Travels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages & Flight Deals | Jeseem Tours & Travels Kerala",
    description:
      "Domestic & international holiday packages, lowest group flight fares, and visa assistance.",
    images: ["/group-flight-ticket-booking-series-fares-alappuzha.jpg"],
  },
};

const PACKAGE_FAQS: FaqItem[] = [
  {
    question: "What is included in holiday packages booked through Jeseem Tours?",
    answer:
      "Our holiday tour packages typically include return flight bookings, hotel accommodations in verified 3 to 5-star properties, daily breakfast/meals as per plan, airport transfers, guided sightseeing tours in private AC vehicles, entry tickets to major attractions, and tourist visa assistance.",
  },
  {
    question: "Can I book customized family and honeymoon packages?",
    answer:
      "Yes. We specialize in private customized itineraries designed specifically around your travel dates, pace, budget, and hotel preferences. Our travel designers customize every detail from room configurations to private candlelight dinners and child-friendly excursions.",
  },
  {
    question: "How do I secure group flight tickets with special series fares?",
    answer:
      "We hold direct airline allocations for group bookings (10 to 100+ passengers) and series fares on major domestic and international carriers. Contact our reservations team with your passenger count and preferred departure dates to lock in seats at discounted group fares.",
  },
  {
    question: "What payment options are accepted for package bookings?",
    answer:
      "We accept multiple secure payment modes including Bank Wire Transfers (NEFT/RTGS/IMPS), UPI payments, Debit Cards, Credit Cards, and direct cash payments at our Alappuzha office.",
  },
];

export default function PackagesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tour Packages", url: "/packages" },
  ]);
  const faqSchema = getFaqSchema(PACKAGE_FAQS);
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Jeseem Tours & Travels Featured Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Worldwide Flight Bookings & Group Fares",
          "description": "Group flight ticketing and series fares on premium airlines from Kerala.",
          "image": `${SITE_URL}/group-flight-ticket-booking-series-fares-alappuzha.jpg`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dubai & Abu Dhabi Desert Safari Package",
          "description": "5-day holiday tour to Dubai including Burj Khalifa, desert safari, and visa support.",
          "image": `${SITE_URL}/dubai-desert-safari-holiday-tour-packages-kerala.jpg`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kerala Backwater & Houseboat Holiday",
          "description": "6-day God's Own Country tour across Alappuzha backwaters, Munnar, and Kovalam.",
          "image": `${SITE_URL}/alappuzha-backwaters-luxury-houseboat-packages-kerala.jpg`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Global Visa & Certificate Attestation Desk",
          "description": "Fast tourist and business visa processing, MEA Apostille, and embassy attestation.",
          "image": `${SITE_URL}/global-tourist-visa-assistance-certificate-attestation-alappuzha.jpg`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hajj & Umrah Pilgrimage Tour Packages",
          "description": "14-day coordinated holy pilgrimage to Makkah and Madinah with close hotel stays.",
          "image": `${SITE_URL}/hajj-umrah-pilgrimage-tour-packages-kerala.jpg`
        }
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={offerCatalogSchema} />
      <PackagesClient faqItems={PACKAGE_FAQS} />
    </>
  );
}
