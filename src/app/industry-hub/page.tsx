import Navbar from "@/components/layout/Navbar";
import IndustryHero from "@/components/industry/Hero";
import Challenges from "@/components/industry/Challenges";
import Explore from "@/components/industry/Explore";
import Adaptable from "@/components/industry/Adaptable";
import Solutions from "@/components/industry/Solutions";
import Stats from "@/components/industry/Stats";
import Footer from "@/components/layout/Footer";

const INDUSTRY_COLUMNS = [
  {
    heading: "Platform",
    links: ["DVA Access", "RTLS Tracking", "SMS Workflow", "HRMS Management"],
  },
  {
    heading: "Industries",
    links: ["Construction", "Industrial", "Commercial"],
  },
  {
    heading: "Company",
    links: ["About Us", "Contact", "Career", "Terms of Service"],
  },
];

export default function IndustryHubPage() {
  return (
    <div className="relative">
      <Navbar active="Industries" />
      <IndustryHero />
      <Challenges />
      {/* Dark band — dome arch rises into Challenges, bg image provides all visual styling */}
      <Explore />
      <div
        className="relative z-1 -mt-83 overflow-hidden"
        style={{
          borderRadius: "50% 50% 0 0 / 80px 80px 0 0",
          backgroundImage: "url('/industry/explore-adaptable-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Adaptable />
      </div>
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
