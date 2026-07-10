import Navbar from "@/components/layout/Navbar";
import ProductsHero from "@/components/products/Hero";
import CapabilityTabs from "@/components/products/CapabilityTabs";
import Ecosystem from "@/components/products/Ecosystem";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/common/SectionHeader";
import { ECOSYSTEM_HEADER } from "@/constants/products";

export default function ProductsPage() {
  return (
    <div className="relative bg-[#030515]">
      <Navbar active="Products" />
      <ProductsHero />
      <CapabilityTabs />
      <SectionHeader
        {...ECOSYSTEM_HEADER}
        titleClassName="max-w-[642px]"
        subtitleClassName="max-w-[962px]"
      />
      <Ecosystem />
      <Footer
        ctaTitle="Start with what you need. Expand as you grow."
        ctaText="Whether you're looking to improve workforce visibility, automate operations, or strengthen security, V-Watch Ai gives you the flexibility to scale."      />
    </div>
  );
}
