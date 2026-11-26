import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import SinglePlatform from "@/components/pre-construction/SinglePlatform";
import ConnectedCapabilities from "@/components/pre-construction/ConnectedCapabilities";
import ConnectedCapabilitiesShowcase, {
  AEGIS_MODULES,
} from "@/components/common/ConnectedCapabilitiesShowcase";
import PlatformOverview from "@/components/pre-construction/PlatformOverview";
import ComplexEnvironments from "@/components/pre-construction/ComplexEnvironments";
import PostConstructionTransition from "@/components/pre-construction/PostConstructionTransition";
import PlatformVideo from "@/components/common/PlatformVideo";
import { postConstructionContent } from "@/data/post-construction";
import SeoKeywords from "@/components/common/SeoKeywords";
import { buildPageMetadata, type PageSeo } from "@/lib/seo";

// SEO for the post-construction keywords of the "Construction Site Management"
// tab. Same approach as /home: meta tags + JSON-LD + a screen-reader-only
// keyword list. No visible text on the page is changed.
const SEO: PageSeo = {
  path: "/live-operations",
  name: "V-Watch Aegis",
  title: "VWatch Aegis | Post Construction Monitoring Platform",
  description:
    "VWatch Aegis supports post construction monitoring, defects liability period follow-up and facility operations, carrying project records into live use.",
  heading: "V-Watch Aegis post construction topics",
  keywords: [
    "post construction monitoring",
    // CONFIRM with client: the site mentions the Defects Liability Period but
    // never warranty tracking.
    "construction warranty management software",
    "construction hr software",
  ],
};

export const metadata = buildPageMetadata(SEO);

export default function PostConstructionPage() {
  const {
    hero,
    platformVideo,
    unifiedPlatform,
    connectedCapabilities,
    longTermSecurity,
    criticalEnvironments,
    continuity,
    footer,
  } = postConstructionContent;

  return (
    <div className="relative">
      <Navbar active="Solutions" />
      <PreConstructionHero hero={hero} />
      <SeoKeywords {...SEO} />
      <SinglePlatform content={unifiedPlatform} />
      <ConnectedCapabilities content={connectedCapabilities} />
      <ConnectedCapabilitiesShowcase
        modules={AEGIS_MODULES}
        subtitle="A compact capability catalogue for live-facility management and security operations."
      />
      <PlatformVideo content={platformVideo} />
      <PlatformOverview content={longTermSecurity} />
      <ComplexEnvironments content={criticalEnvironments} />
      {/* Same transition section — its CTA detects this route and toggles back
          to pre-construction. */}
      <PostConstructionTransition content={continuity} />
      <Footer
        ctaTitle={footer.ctaTitle}
        ctaText={footer.ctaText}
      />
    </div>
  );
}
