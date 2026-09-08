import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getFaqSchema, FaqItem, SITE_URL } from "@/lib/schema";
import { COMPANY_DETAILS } from "@/constants/company";

export const metadata: Metadata = {
  title: "Contact Best Travel Agency in Alappuzha | Jeseem Tours & Travels",
  description:
    "Contact Jeseem Tours & Travels in Thiruvampady, Alappuzha, Kerala. Call 0477 2266007 or WhatsApp +91 9061858416 for worldwide flight tickets, holiday packages, and fast visa assistance.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Jeseem Tours & Travels Alappuzha | Flight & Holiday Desk",
    description:
      "Get in touch with our travel and visa consultants in Alappuzha, Kerala. Direct support for group flight tickets, custom holidays, and certificate attestation.",
    url: `${SITE_URL}/contact`,
    siteName: "Jeseem Tours & Travels",
    images: [
      {
        url: "/best-travel-agency-alappuzha-kerala-jeseem-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Jeseem Tours & Travels in Alappuzha Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jeseem Tours & Travels | Alappuzha Kerala",
    description:
      "Call 0477 2266007 or WhatsApp +91 9061858416 for flight bookings, holiday packages, and visa guidance.",
    images: ["/best-travel-agency-alappuzha-kerala-jeseem-tours.jpg"],
  },
};

const CONTACT_FAQS: FaqItem[] = [
  {
    question: "Where is the Jeseem Tours & Travels office located?",
    answer:
      "Our main office is located at Thiruvampady P.O, Alappuzha - 688002, Kerala, India. We are easily accessible from all parts of Alappuzha town and nearby districts.",
  },
  {
    question: "How quickly will your team respond to my online inquiry?",
    answer:
      "Our travel coordinators review inquiries in real-time during business hours (09:30 AM – 06:00 PM) and will contact you by phone or email within 1 to 24 hours. For instant assistance, you can message our WhatsApp desk directly at +91 9061858416.",
  },
  {
    question: "Do you offer emergency ticket booking or after-hours visa support?",
    answer:
      "Yes. For urgent last-minute flight bookings, emergency date changes, or time-sensitive document processing, our dedicated WhatsApp hotline (+91 9061858416) provides responsive after-hours support.",
  },
  {
    question: "Can I send documents by courier for certificate attestation?",
    answer:
      "Yes. Clients across Kerala and international expatriates regularly send documents via secure registered courier or speed post to our Alappuzha office address. We acknowledge receipt immediately and track the file throughout the attestation stages.",
  },
];

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);
  const faqSchema = getFaqSchema(CONTACT_FAQS);
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Jeseem Tours & Travels",
    "url": `${SITE_URL}/contact`,
    "mainEntity": {
      "@type": "TravelAgency",
      "name": COMPANY_DETAILS.name,
      "telephone": COMPANY_DETAILS.phone,
      "email": COMPANY_DETAILS.email,
      "image": `${SITE_URL}/best-travel-agency-alappuzha-kerala-jeseem-tours.jpg`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Thiruvampady P.O",
        "addressLocality": "Alappuzha",
        "addressRegion": "Kerala",
        "postalCode": "688002",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={contactPageSchema} />
      <ContactClient faqItems={CONTACT_FAQS} />
    </>
  );
}
