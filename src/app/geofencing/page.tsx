import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import ConnectedSystem from "@/components/geofencing/ConnectedSystem";
import TrustedBy from "@/components/visitor-management/TrustedBy";
import { geofencingContent } from "@/data/geofencing";

export default function GeofencingPage() {
  const { hero, connectedSystem, partners, footer } = geofencingContent;

  return (
    <div className="relative bg-[#f5fbff]">
      <Navbar active="Solutions" />

      {/* Common hero — same component/colors/image handling as the pre & post
          construction pages. Copy + bgImage come from the data file. */}
      <PreConstructionHero hero={hero} showCurve={false} />

      {/* The only page-specific component — the marked section. */}
      <ConnectedSystem content={connectedSystem} />

      {/* Brick-wall partner logos — same component as visitor-management,
          title + description supplied from the data file. */}
      <TrustedBy
        trustTitle={`${partners.title} ${partners.subtitle}`}
        trustText={partners.description}
      />

      <Footer
        ctaTitle={footer.ctaTitle}
        ctaText={footer.ctaText}
        linkColumns={footer.linkColumns}
      />
    </div>
  );
}
