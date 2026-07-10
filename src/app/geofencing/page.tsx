import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import ConnectedSystem from "@/components/geofencing/ConnectedSystem";
import { geofencingContent } from "@/data/geofencing";
import TechnologyPartners from "@/components/products/TechnologyPartners";

export default function GeofencingPage() {
  const { hero, connectedSystem, partners, footer } = geofencingContent;

  return (
    <div className="relative bg-[#f5fbff]">
      <Navbar active="Resources" />

      {/* Common hero — same component/colors/image handling as the pre & post
          construction pages. Copy + bgImage come from the data file. */}
      <PreConstructionHero hero={hero} showCurve={false} />

      {/* The only page-specific component — the marked section. */}
      <ConnectedSystem content={connectedSystem} />

      {/* Brick-wall partner logos — same component as visitor-management,
          title + description supplied from the data file. */}
      {/* <TrustedBy
        trustTitle={`${partners.title} ${partners.subtitle}`}
        trustText={partners.description}
      /> */}
      <div className="relative pt-2 px-5 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
        <TechnologyPartners
          content={{
            title: `${partners.title}`,
            description: `${partners.description}`,
          }}
        />
      </div>
      <Footer
        ctaTitle={footer.ctaTitle}
        ctaText={footer.ctaText}
      />
    </div>
  );
}
