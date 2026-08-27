import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreConstructionHero from "@/components/pre-construction/Hero";
import SinglePlatform from "@/components/pre-construction/SinglePlatform";
import ConnectedCapabilities from "@/components/pre-construction/ConnectedCapabilities";
import PlatformOverview from "@/components/pre-construction/PlatformOverview";
import ComplexEnvironments from "@/components/pre-construction/ComplexEnvironments";
import PostConstructionTransition from "@/components/pre-construction/PostConstructionTransition";

export default function PreConstructionPage() {
  return (
    <div className="relative">
      <Navbar active="Solutions" />
      <PreConstructionHero />
      <SinglePlatform />
      <ConnectedCapabilities />
      <PlatformOverview />
      <ComplexEnvironments />
      <PostConstructionTransition />

      <Footer
        ctaTitle="Take control of your project from day one"
        ctaText="See how V-Watch Atlas helps you improve visibility, coordination, and performance across your construction operations."      />
    </div>
  );
}
