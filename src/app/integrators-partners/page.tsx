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

export default function ProductsPage() {
  return (
    // [&>*+*]:-mt-px overlaps each stacked section 1px onto the previous one, so
    // the fractional-pixel seam between full-width sections doesn't render as a
    // hairline at non-100% browser zoom (75% / 125%).
    <div className="relative bg-[#030515] [&>*+*]:-mt-px">
      <Navbar active="Platform" />
      <ProductsHero />
      <SectionHeader {...IMPLEMENTATION_HEADER} className="!pt-0 md:!pt-15" />

      <RealTimeImplementationSection />
      <SectionHeader
        {...NETWORK_HEADER}
        background="bg-[#eaf7fa]"
        className="max-md:pb-4 max-lg:pt-0"
      />
      <IntegratorNetworkSection />
      <GlobalTechnologiesSection />
      <WhyPartnerSection />
      <BecomeIntegratorSection />
      <Footer
        ctaTitle="Expand Your Business with a Global Operations Platform"
        ctaText="Join our expanding network of system integrators delivering enterprise-grade operational, security, and workforce solutions across industries and regions"
        isBookADemoVisible={false}
      />
    </div>
  );
}
