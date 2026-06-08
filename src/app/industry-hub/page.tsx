import Navbar from "@/components/layout/Navbar";
import IndustryHero from "@/components/industry/Hero";
import Challenges from "@/components/industry/Challenges";
import Explore from "@/components/industry/Explore";
import Adaptable from "@/components/industry/Adaptable";
import Solutions from "@/components/industry/Solutions";
import Stats from "@/components/industry/Stats";
import Footer from "@/components/layout/Footer";

const INDUSTRY_COLUMNS = [
  { heading: "Platform", links: ["DVA Access", "RTLS Tracking", "SMS Workflow", "HRMS Management"] },
  { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
  { heading: "Company", links: ["About Us", "Contact", "Career", "Terms of Service"] },
];

export default function IndustryHubPage() {
  return (
    <div className="relative bg-[#030515]">
      <Navbar active="Industries" />
      <IndustryHero />
      <Challenges />
      <Explore />
      <Adaptable />
      <Solutions />
      <Stats />
      <Footer
        ctaVariant="dark"
        ctaTitle="Find the right solution for your environment"
        ctaText="Explore how V-Watch Ai can help you improve visibility, strengthen compliance, and take full control of your operations."
        linkColumns={INDUSTRY_COLUMNS}
      />
    </div>
  );
}
