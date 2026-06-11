import Navbar from "@/components/layout/Navbar";
import ProductsHero from "@/components/integrators-partners/Hero";
import RealTimeImplementationSection from "@/components/integrators-partners/RealTimeImplementationSection";
import IntegratorNetworkSection from "@/components/integrators-partners/IntegratorNetworkSection";
import GlobalTechnologiesSection from "@/components/integrators-partners/GlobalTechnologiesSection";
import WhyPartnerSection from "@/components/integrators-partners/WhyPartnerSection";
import BecomeIntegratorSection from "@/components/integrators-partners/BecomeIntegratorSection";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/common/SectionHeader";
import {
  IMPLEMENTATION_HEADER,
  NETWORK_HEADER,
} from "@/constants/integrators-partners";

const PRODUCTS_COLUMNS = [
  {
    heading: "Platform",
    links: ["DVA Access", "RTLS Tracking", "BMS Worker", "HRMS Management"],
  },
  {
    heading: "Industries",
    links: ["Construction", "Industrial", "Commercial"],
  },
  {
    heading: "Company",
    links: ["About Us", "Contact", "Career", "Terms of Service"],
  },
];

export default function ProductsPage() {
  return (
    <div className="relative bg-[#030515]">
      <Navbar active="integrators-partners" />
      <ProductsHero />
      <SectionHeader {...IMPLEMENTATION_HEADER} />

      <RealTimeImplementationSection />
      <SectionHeader {...NETWORK_HEADER} background="bg-[#eaf7fa]" />
      <IntegratorNetworkSection />
      <GlobalTechnologiesSection />
      <WhyPartnerSection />
      <BecomeIntegratorSection />
      <Footer
        ctaTitle="Expand Your Business with a Global Operations Platform"
        ctaText="Join our expanding network of system integrators delivering enterprise-grade operational, security, and workforce solutions across industries and regions"
        linkColumns={PRODUCTS_COLUMNS}
        isBookADemoVisible={false}
      />
    </div>
  );
}
