import type { Metadata } from "next";
import { Geist_Mono, Lato, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/home/SmoothScroll";
import CookieConsent from "@/components/common/CookieConsent";

// Lato is the design's primary typeface (from Figma). It's not a variable
// font, so the weights used across the UI must be listed explicitly.
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  // Lato ships only 100/300/400/700/900 — Figma's "600" maps to 700.
  weight: ["400", "700", "900"],
});

// Plus Jakarta Sans — used for the numeric markers in the "Why we built this"
// timeline (Figma font-['Plus_Jakarta_Sans:Bold']).
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "V-Watch AI — Workforce Management & Site Safety for Infrastructure",
  description:
    "V-Watch AI delivers AI-powered workforce management and site safety for data centre and infrastructure projects — from construction handover to live operations.",
  icons: {
    icon: "/vwatch-logo-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" 
      className={`${lato.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
