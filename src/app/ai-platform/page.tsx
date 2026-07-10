import Navbar from "@/components/layout/Navbar";
import AIPlatformHero from "@/components/ai-platform/Hero";
import PlatformVisibility from "@/components/ai-platform/PlatformVisibility";
import ConnectedOperations from "@/components/ai-platform/ConnectedOperations";
import DataToDecisions from "@/components/ai-platform/DataToDecisions";
import ThreePillars from "@/components/ai-platform/ThreePillars";
import Footer from "@/components/layout/Footer";

export default function AIPlatformPage() {
  return (
    <div className="relative bg-[#F2F8FE]">
      <Navbar active="Platform" />
      <AIPlatformHero />
      <PlatformVisibility />
      <ConnectedOperations />
      <DataToDecisions />
      <ThreePillars />
      <Footer
        ctaTitle="See how the platform works for your business"
        ctaText="Discover how V-Watch AI can transform how your operations run with automation, security, and real-time intelligence."        ctaVariant="light"
      />
    </div>
  );
}
