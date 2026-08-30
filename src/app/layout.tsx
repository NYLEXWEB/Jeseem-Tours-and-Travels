import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FloatingContact from "@/components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeseem Tours & Travels | Save - Plan - Go",
  description: "Trusted since 1985. Jeseem Tours & Travels in Alappuzha, Kerala offers professional Flight Booking (Group / Special Fares), Domestic & International Holidays, Global Visa Assistance, and Certificate Attestation.",
  keywords: ["Jeseem Tours & Travels", "flight booking Alappuzha", "group flight bookings", "visa assistance Alappuzha", "certificate attestation Kerala", "Hajj and Umrah packages Alappuzha", "tours and travels Kerala", "customized tour packages"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${outfit.variable} antialiased`}
    >
      <body className="flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FloatingContact />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
