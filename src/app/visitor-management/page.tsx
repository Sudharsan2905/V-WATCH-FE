import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/visitor-management/HeroSection";
import SmarterWay from "@/components/visitor-management/SmarterWay";
import HowItWorks from "@/components/visitor-management/HowItWorks";
import TrustedBy from "@/components/visitor-management/TrustedBy";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Visitor Management — V-Watch Ai",
  description:
    "Manage, verify, and track every visitor entering your operations from pre-registration to exit ensuring security, efficiency, and complete accountability without manual processes.",
  alternates: { canonical: "/visitor-management" },
};

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: ["Dashboard", "BI Reporting", "System Integrators"],
  },
  {
    heading: "Industries",
    links: ["Construction", "Industrial", "Commercial"],
  },
  { heading: "Company", links: ["About Us", "Contact"] },
];

export default function VisitorManagementPage() {
  return (
    <div className="relative bg-[#F5FBFF] overflow-x-hidden">
      <Navbar active="Resources" />
      <HeroSection />
      <SmarterWay />
      <HowItWorks />
      <TrustedBy trustTitle="Trusted by teams operating in high-security environments" trustText="From construction sites to critical facilities, organisations rely on
            V-Watch Ai to manage visitor access securely and efficiently." />
      <Footer
        ctaTitle="Take control of your visitor access"
        ctaText="See how V-Watch Ai helps you streamline visitor management, improve security, and maintain full visibility across your operations."
        linkColumns={FOOTER_COLUMNS}
        ctaVariant="dark"
      />
    </div>
  );
}
