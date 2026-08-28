import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Jeseem Tours & Travels | Bespoke Luxury Travel Agency",
  description: "Experience global exploration at its finest. Custom curated itineraries, private charters, and exclusive premium resorts by Jeseem Tours & Travels.",
  keywords: ["luxury travel", "private tours", "bespoke travel agency", "custom itineraries", "Jeseem Tours", "exclusive vacations"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col bg-[#080808] text-[#f5f5f7]">
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
