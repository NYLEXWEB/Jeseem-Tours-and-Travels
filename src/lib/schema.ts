import { COMPANY_DETAILS } from "@/constants/company";

export const SITE_URL = "https://jeseemtours.com";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Generates comprehensive TravelAgency + LocalBusiness Schema (JSON-LD)
 */
export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "TouristInformationCenter"],
    "@id": `${SITE_URL}/#travelagency`,
    "name": COMPANY_DETAILS.name,
    "alternateName": [
      "Jaseem Tours and Travels",
      "Jeseem Travels Alappuzha",
      "Jeseem Tours",
      "Jeseem Holidays Kerala"
    ],
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": [
      `${SITE_URL}/about.jpg`,
      `${SITE_URL}/travel_image.png`,
      `${SITE_URL}/service_01.jpg`
    ],
    "description": "Premier travel agency and tour operator in Alappuzha, Kerala since 1985. Specialized in group flight bookings, series fares, customized domestic & international tour packages (Dubai, Maldives, Georgia, Malaysia, Kerala), global visa assistance, certificate attestation, and Hajj & Umrah pilgrimage.",
    "telephone": [COMPANY_DETAILS.phone, "+91 90618 58416", "+91 96331 33977"],
    "email": COMPANY_DETAILS.email,
    "priceRange": "$$",
    "currenciesAccepted": "INR, AED, USD, EUR",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Thiruvampady P.O",
      "addressLocality": "Alappuzha",
      "addressRegion": "Kerala",
      "postalCode": "688002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.4981,
      "longitude": 76.3388
    },
    "hasMap": "https://maps.google.com/?q=Jeseem+Tours+and+Travels+Alappuzha",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:30",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Alappuzha"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kerala"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kochi"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kottayam"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "115",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "K Kuriakose"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "I had a great experience with Jeseem Travels. The team was extremely professional, competent in getting the best prices at our convenient travel timings and continuously updating flight changes."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Firoze Aslam"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "It is a long time I am travelling with Jaseem Travels. Till now I am more than happy that Jaseem Travels gives a clear picture of the process and service with end to end clearance."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Pradeep Nayar"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Unique travel agency in Alappuzha. You may approach them with your requirements and you will get a satisfying response. The courteous behavior, attitude, and approach will be very satisfying."
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel & Document Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Flight Ticket Booking",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Group Flight Bookings & Series Fares",
                "description": "Affordable group flight reservations, series fares, and special corporate airline ticketing worldwide."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Holiday Tour Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "International Tour Packages (Dubai, Maldives, Georgia, Malaysia)",
                "description": "Customized international holiday packages from Kerala with hotel reservations, transfers, and sightseeing."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Domestic & Kerala Tourism Packages",
                "description": "Kerala backwater houseboat tours, Munnar hill station getaways, and Lakshadweep island expeditions."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Visa & Document Desks",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Global Visa Assistance & Certificate Attestation",
                "description": "Fast tourist and business visa assistance, MEA apostille, and embassy certificate attestation support."
              }
            }
          ]
        }
      ]
    },
    "sameAs": [
      COMPANY_DETAILS.socials.instagram,
      "https://maps.google.com/?q=Jeseem+Tours+and+Travels+Alappuzha"
    ]
  };
}

/**
 * Generates Organization Schema with founder tribute and trust signals
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": COMPANY_DETAILS.name,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "foundingDate": "1985",
    "founder": {
      "@type": "Person",
      "name": "Late Kunjumon Ismail"
    },
    "description": "Founded in 1985, Jeseem Tours & Travels is a leading travel consultancy in Alappuzha, Kerala providing reliable travel logistics, group flight ticketing, holiday packages, and visa assistance.",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": COMPANY_DETAILS.departments.reservations.phone,
        "contactType": "reservations",
        "areaServed": "IN",
        "availableLanguage": ["en", "ml", "hi", "ar"]
      },
      {
        "@type": "ContactPoint",
        "telephone": COMPANY_DETAILS.departments.holidays.phone,
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["en", "ml", "hi", "ar"]
      }
    ],
    "sameAs": [
      COMPANY_DETAILS.socials.instagram
    ]
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * Generates FAQPage Schema for rich results & AI Search
 */
export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generates Service Schema for specific travel service offerings
 */
export function getServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  providerName?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "serviceType": service.serviceType,
    "url": service.url ? (service.url.startsWith("http") ? service.url : `${SITE_URL}${service.url}`) : SITE_URL,
    "provider": {
      "@type": "TravelAgency",
      "name": COMPANY_DETAILS.name,
      "url": SITE_URL,
      "telephone": COMPANY_DETAILS.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Thiruvampady P.O",
        "addressLocality": "Alappuzha",
        "addressRegion": "Kerala",
        "postalCode": "688002",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Kerala, India"
    }
  };
}
