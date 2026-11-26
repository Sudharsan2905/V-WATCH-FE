import { ECOSYSTEM_HEADER } from "@/constants/products";
import Navbar from "@/components/layout/Navbar";
import ProductsHero from "@/components/products/Hero";
import CapabilityTabs from "@/components/products/CapabilityTabs";
import Ecosystem from "@/components/products/Ecosystem";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/common/SectionHeader";
import SeoKeywords from "@/components/common/SeoKeywords";
import { buildPageMetadata, type PageSeo } from "@/lib/seo";

// SEO for the "Digital Site Access System" keyword tab (which actually holds
// the facility management / CMMS keywords). Same approach as /home: meta tags
// + JSON-LD + a screen-reader-only keyword list. No visible text on the page
// is changed.
const SEO: PageSeo = {
  path: "/products",
  name: "V-Watch AI",
  title: "VWatch | Facility Management & CMMS Software Platform",
  description:
    "VWatch AI combines facility management software, CMMS, work order and preventive maintenance tools with construction site workforce management.",
  heading: "V-Watch AI facility management and CMMS topics",
  keywords: [
    "facility management software",
    "CMMS software",
    "computerized maintenance management system software",
    "maintenance management software",
    "building maintenance software",
    "facility maintenance software",
    "asset management software for facilities",
    "work order management software",
    "preventive maintenance software",
    "maintenance work order software",
    "facility operations software",
    "building operations software",
    "asset maintenance software",
    "facilities management system",
    "CMMS system",
  ],
};

export const metadata = buildPageMetadata(SEO);

export default function ProductsPage() {
  return (
    <div className="relative bg-[#030515]">
      <Navbar active="Products" />
      <ProductsHero />
      <SeoKeywords {...SEO} />
      <CapabilityTabs />
      <SectionHeader 
        {...ECOSYSTEM_HEADER}
        titleClassName="max-w-[642px]"
        subtitleClassName="max-w-[962px]"
      />
      <Ecosystem />
      <Footer
        ctaTitle="Start with what you need. Expand as you grow."
        ctaText="Whether you're looking to improve workforce visibility, automate operations, or strengthen security, V-Watch AI gives you the flexibility to scale."
      />
    </div>
  );
}
