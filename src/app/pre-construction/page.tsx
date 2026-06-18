import Navbar from "@/components/layout/Navbar";
import PreConstructionHero from "@/components/pre-construction/Hero";
import SinglePlatform from "@/components/pre-construction/SinglePlatform";
import PlatformOverview from "@/components/pre-construction/PlatformOverview";
import ComplexEnvironments from "@/components/pre-construction/ComplexEnvironments";
import PostConstructionTransition from "@/components/pre-construction/PostConstructionTransition";
import Footer from "@/components/layout/Footer";

export default function PreConstructionPage() {
  return (
    <div className="relative">
      <Navbar active="Solutions" />
      <PreConstructionHero />
      <SinglePlatform />
      <PlatformOverview />
      <ComplexEnvironments />
      <PostConstructionTransition />

      <Footer
        ctaTitle="Take control of your project from day one"
        ctaText="See how V-Watch Atlas helps you improve visibility, coordination, and performance across your construction operations."
        linkColumns={[
          {
            heading: "Platform",
            links: ["Dashboard", "BI Reporting", "System Integrators"],
          },
          {
            heading: "Industries",
            links: ["Construction", "Industrial", "Commercial"],
          },
          { heading: "Company", links: ["About Us", "Contact"] },
        ]}
      />
    </div>
  );
}
