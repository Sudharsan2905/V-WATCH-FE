import Navbar from "@/components/layout/Navbar";
import ProductsHero from "@/components/products/Hero";
import CapabilityTabs from "@/components/products/CapabilityTabs";
import Ecosystem from "@/components/products/Ecosystem";
import Footer from "@/components/layout/Footer";

const PRODUCTS_COLUMNS = [
  { heading: "Platform", links: ["DVA Access", "RTLS Tracking", "BMS Worker", "HRMS Management"] },
  { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
  { heading: "Company", links: ["About Us", "Contact", "Career", "Terms of Service"] },
];

export default function ProductsPage() {
  return (
    <div className="relative bg-[#030515]">
      <Navbar active="Products" />
      <ProductsHero />
      <CapabilityTabs />
      <Ecosystem />
      <Footer
        ctaTitle="Start with what you need. Expand as you grow."
        ctaText="Whether you're looking to improve workforce visibility, automate operations, or strengthen security, V-Watch Ai gives you the flexibility to scale."
        linkColumns={PRODUCTS_COLUMNS}
      />
    </div>
  );
}
