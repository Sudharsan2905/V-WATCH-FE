import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import ConnectedSystem from "@/components/geofencing/ConnectedSystem";
import TechnologyPartners from "@/components/products/TechnologyPartners";
import { geofencingContent } from "@/data/geofencing";

export default function GeofencingPage() {
  const { hero, connectedSystem, partners, footer } = geofencingContent;

  return (
    <div className="relative bg-[#f5fbff]">
      <Navbar active="Solutions" />

      {/* Common hero — same component/colors/image handling as the pre & post
          construction pages. Copy + bgImage come from the data file. */}
      <PreConstructionHero hero={hero} />

      {/* The only page-specific component — the marked section. */}
      <ConnectedSystem content={connectedSystem} />

      {/* Common partner-logos strip — text supplied from the data file. */}
      <div className="pb-20 pt-4">
        <TechnologyPartners content={partners} />
      </div>

      <Footer
        ctaTitle={footer.ctaTitle}
        ctaText={footer.ctaText}
        linkColumns={footer.linkColumns}
      />
    </div>
  );
}
