import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import "./globals.css";

// Lato is the design's primary typeface (from Figma). It's not a variable
// font, so the weights used across the UI must be listed explicitly.
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  // Lato ships only 100/300/400/700/900 — Figma's "600" maps to 700.
  weight: ["400", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "v-watch",
  description: "v-watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
