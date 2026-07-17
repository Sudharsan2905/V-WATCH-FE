import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import SinglePlatform from "@/components/pre-construction/SinglePlatform";
import PlatformOverview from "@/components/pre-construction/PlatformOverview";
import ComplexEnvironments from "@/components/pre-construction/ComplexEnvironments";
import PostConstructionTransition from "@/components/pre-construction/PostConstructionTransition";
import { postConstructionContent } from "@/data/post-construction";

export default function PostConstructionPage() {
  const {
    hero,
    unifiedPlatform,
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
