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
      <SinglePlatform content={unifiedPlatform} />
      <ConnectedCapabilities content={connectedCapabilities} />
      <ConnectedCapabilitiesShowcase modules={AEGIS_MODULES} />
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
