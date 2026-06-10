import Navbar from "@/components/layout/Navbar";
import AIPlatformHero from "@/components/ai-platform/Hero";
import PlatformVisibility from "@/components/ai-platform/PlatformVisibility";
import ConnectedOperations from "@/components/ai-platform/ConnectedOperations";
import DataToDecisions from "@/components/ai-platform/DataToDecisions";
import ThreePillars from "@/components/ai-platform/ThreePillars";
import Footer from "@/components/layout/Footer";

const AI_PLATFORM_COLUMNS = [
  { heading: "Platform", links: ["Dashboard", "BI Reporting", "System Integrators"] },
  { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
  { heading: "Company", links: ["About Us", "Contact", "Career"] },
];

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
        ctaText="Discover how V-Watch Ai can transform how your operations run with automation, security, and real-time intelligence."
        linkColumns={AI_PLATFORM_COLUMNS}
        ctaVariant="light"
      />
    </div>
  );
}
