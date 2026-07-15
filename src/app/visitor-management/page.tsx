import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/visitor-management/HeroSection";
import SmarterWay from "@/components/visitor-management/SmarterWay";
import HowItWorks from "@/components/visitor-management/HowItWorks";
import Footer from "@/components/layout/Footer";
import TechnologyPartners from "@/components/products/TechnologyPartners";

export const metadata: Metadata = {
  title: "Visitor Management — V-Watch AI",
  description:
    "Manage, verify, and track every visitor entering your operations from pre-registration to exit ensuring security, efficiency, and complete accountability without manual processes.",
  alternates: { canonical: "/visitor-management" },
};

export default function VisitorManagementPage() {
  return (
    <div className="relative bg-[#F5FBFF] overflow-x-hidden">
      <Navbar active="Resources" />
      <HeroSection />
      <SmarterWay />
      <HowItWorks />
      {/* <TrustedBy trustTitle="Trusted by teams operating in high-security environments" trustText="From construction sites to critical facilities, organisations rely on
            V-Watch AI to manage visitor access securely and efficiently." /> */}

      <div className="pt-2 py-5 relative rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
        <TechnologyPartners
          content={{
            title: "Trusted by teams operating in high-security environments",
            description:
              "From construction sites to critical facilities, organisations rely on V-Watch AI to manage visitor access securely and efficiently.",
          }}
        />
      </div>

      <Footer
        ctaTitle="Take control of your visitor access"
        ctaText="See how V-Watch AI helps you streamline visitor management, improve security, and maintain full visibility across your operations."        ctaVariant="dark"
      />
    </div>
  );
}
