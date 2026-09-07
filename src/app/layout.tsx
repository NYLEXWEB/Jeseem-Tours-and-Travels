import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FloatingContact from "@/components/FloatingContact";
import JsonLd from "@/components/JsonLd";
import { getTravelAgencySchema, getOrganizationSchema, SITE_URL } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Travel Agency in Alappuzha Kerala | Jeseem Tours & Travels",
    template: "%s | Jeseem Tours & Travels",
  },
  description:
    "Trusted since 1985. Jeseem Tours & Travels is the best travel agency in Alappuzha, Kerala offering group flight bookings, international holiday packages (Dubai, Maldives, Georgia), fast visa assistance & certificate attestation.",
  applicationName: "Jeseem Tours & Travels",
  authors: [{ name: "Jeseem Tours & Travels", url: SITE_URL }],
  creator: "Jeseem Tours & Travels",
  publisher: "Jeseem Tours & Travels",
  category: "Travel & Tourism",
  keywords: [
    "Best travel agency in Alappuzha",
    "Travel agency in Alappuzha Kerala",
    "Best tour operator Kerala",
    "Holiday packages Kerala",
    "Travel agency near me",
    "Flight ticket booking Alappuzha",
    "Group flight bookings Kerala",
    "International tour packages from Kerala",
    "Domestic tour packages Kerala",
    "Dubai tour packages from Kerala",
    "Maldives tour packages from Kerala",
    "Georgia tour packages Kerala",
    "Malaysia tour packages Kerala",
    "Kerala houseboat packages Alappuzha",
    "Global visa assistance Kerala",
    "Certificate attestation Alappuzha",
    "Hajj and Umrah packages Kerala",
    "Honeymoon packages Kerala",
    "Jeseem Tours and Travels",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Jeseem Tours & Travels",
    title: "Best Travel Agency in Alappuzha Kerala | Jeseem Tours & Travels",
    description:
      "Save, Plan & Go with Jeseem Tours & Travels. 40+ years of trusted flight bookings, holiday packages, global visas, and document attestations in Alappuzha, Kerala.",
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
      "40+ years of travel excellence. Group flight tickets, custom international tours (Dubai, Maldives, Georgia), visa assistance & document attestation in Alappuzha.",
    images: ["/about.jpg"],
    creator: "@jeseem_tours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo.png" }],
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Alappuzha",
    "geo.position": "9.4981;76.3388",
    "ICBM": "9.4981, 76.3388",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const travelAgencySchema = getTravelAgencySchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${outfit.variable} ${cormorant.variable} antialiased`}
    >
      <head>
        <JsonLd schema={travelAgencySchema} />
        <JsonLd schema={organizationSchema} />
      </head>
      <body className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="main-content" className="flex-grow">{children}</main>
          <FloatingContact />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
