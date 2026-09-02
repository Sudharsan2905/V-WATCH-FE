import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import SinglePlatform from "@/components/pre-construction/SinglePlatform";
import ConnectedCapabilities from "@/components/pre-construction/ConnectedCapabilities";
import ConnectedCapabilitiesShowcase from "@/components/common/ConnectedCapabilitiesShowcase";
import PlatformOverview from "@/components/pre-construction/PlatformOverview";
import ComplexEnvironments from "@/components/pre-construction/ComplexEnvironments";
import PostConstructionTransition from "@/components/pre-construction/PostConstructionTransition";
import PlatformVideo from "@/components/common/PlatformVideo";

// Walkthrough clip — the same shared section renders on live-operations, so the
// two pages stay identical apart from the copy. The video file is not available
// yet: drop it in /public/pre-construction/platform-video/ and uncomment `src`
// (and `poster`) below. Until then the section shows its placeholder frame.
const platformVideo = {
  title: "V-Watch Atlas platform walkthrough",
  // src: "/pre-construction/platform-video/atlas-walkthrough.mp4",
  // poster: "/pre-construction/platform-video/poster.webp",
};

export default function PreConstructionPage() {
  return (
    <div className="relative">
      <Navbar active="Solutions" />
      <PreConstructionHero />
      <SinglePlatform />
      <ConnectedCapabilities />
      <ConnectedCapabilitiesShowcase />
      <PlatformVideo content={platformVideo} />
      <PlatformOverview />
      <ComplexEnvironments />
      <PostConstructionTransition />

      <Footer
        ctaTitle="Take control of your project from day one"
        ctaText="See how V-Watch Atlas helps you improve visibility, coordination, and performance across your construction operations."      />
    </div>
  );
}
