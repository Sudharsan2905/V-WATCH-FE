import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/common/Hero";
import FragmentedOps from "@/components/common/FragmentedOps";
import UnifiedSystem from "@/components/home/UnifiedSystem";
import FeatureGrid from "@/components/home/FeatureGrid";
import Industries from "@/components/home/Industries";
import BuiltToScale from "@/components/home/BuiltToScale";
import Footer from "@/components/layout/Footer";

// TODO: replace with the real production origin before launch — this drives the
// canonical URL and the absolute OG/Twitter URLs.
const SITE_URL = "https://www.v-watch.ai";

// The platform's core modules. HRMS is the flagship (rendered as the central,
// highlighted tile in the hero visual), so it leads the list for SEO weight.
const KEYS = [
  "HRMS (Human Resource Management System)",
  "Secure Access",
  "SMS",
  "RTL",
  "Workflow Management",
  "AI Location Tracking",
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HRMS, Secure Access & AI Location Tracking — V-Watch Ai",
  description:
    "V-Watch Ai unifies HRMS, Secure Access, SMS, RTL, Workflow Management and AI Location Tracking into one intelligent platform — real-time visibility and control across people, work, assets and movement.",
  keywords: [
    "HRMS",
    "Human Resource Management System",
    "Secure Access",
    "SMS",
    "RTL",
    "Workflow Management",
    "AI Location Tracking",
    "V-Watch Ai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "V-Watch Ai",
    title: "V-Watch Ai — HRMS, Secure Access & AI Location Tracking",
    description:
      "One intelligent system for HRMS, Secure Access, SMS, RTL, Workflow Management and AI Location Tracking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "V-Watch Ai — HRMS, Secure Access & AI Location Tracking",
    description:
      "One intelligent system for HRMS, Secure Access, SMS, RTL, Workflow Management and AI Location Tracking.",
  },
};

// schema.org structured data so search engines can read the module list that is
// otherwise baked into the hero PNG. HRMS is position 1 (the flagship module).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "V-Watch Ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-driven operations platform unifying HRMS, Secure Access, SMS, RTL, Workflow Management and AI Location Tracking.",
  featureList: KEYS,
};

export default function Home() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />

      {/* Crawlable, screen-reader-only list of the platform modules. These appear
          as labelled tiles inside the hero visual (a PNG), so without this they
          are invisible to search engines. Placed after the hero so it follows
          the page <h1> in the heading order. */}
      <section aria-label="V-Watch Ai platform modules" className="sr-only">
        <h2>V-Watch Ai platform modules</h2>
        <ul>
          {KEYS.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <FragmentedOps />
      <UnifiedSystem />
      <FeatureGrid />
      <Industries />
      <BuiltToScale />
      <Footer />
    </div>
  );
}
