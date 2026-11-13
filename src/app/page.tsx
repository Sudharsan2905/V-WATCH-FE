import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { inter } from "@/components/landing/fonts";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import HandoverGap from "@/components/landing/HandoverGap";
import Journey from "@/components/landing/Journey";
import Products from "@/components/landing/Products";
import WhoItHelps from "@/components/landing/WhoItHelps";
import About from "@/components/landing/About";
import FAQ from "@/components/landing/FAQ";
import DemoForm from "@/components/landing/DemoForm";
import LandingFooter from "@/components/landing/Footer";

// Landing page from the Figma "V-Watch LP" design. The previous home page now
// lives at /home.
export const metadata: Metadata = {
  title: "V-Watch Ai — From Construction to Live Operations",
  description:
    "Keep relevant construction records available at handover, through the Defects Liability Period (DLP) and into live operations with Atlas, Digital Handover and Aegis.",
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    // Inter is applied to <main> and the footer only — not the wrapper — so the
    // shared Navbar's dropdown pop-ups and mobile menu keep their Lato styling.
    <div className={`${inter.variable} relative bg-white text-[#19213D]`}>
      <Navbar variant="light" />
      {/* Offset for the fixed header (Navbar publishes its height as --nav-h). */}
      <main className="pt-[var(--nav-h,77px)] font-[family-name:var(--font-inter)]">
        <Hero />
        <Testimonials />
        <HandoverGap />
        <Journey />
        <Products />
        <WhoItHelps />
        <About />
        <FAQ />
        <DemoForm />
      </main>
      <LandingFooter />
    </div>
  );
}
