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
          // Keep the textured dome image, but fade it to solid navy over the
          // bottom ~20% so the image's baked-in white strip is masked (that strip
          // was what cover/min-h cropped + inflated). The rounded white transition
          // into the next section is done in CSS on <Solutions>, and a fixed pb
          // (not min-h:vh) keeps the dark buffer consistent across screen sizes.
          backgroundColor: "#19213d",
          backgroundImage:
            "linear-gradient(180deg, rgba(25,33,61,0) 78%, #19213d 92%), url('/industry/explore-adaptable-bg.png')",
          backgroundSize: "cover, cover",
          backgroundPosition: "center top, center top",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <Adaptable />
      </div>
      <Solutions />
      <Stats />
      <Footer
       
        ctaTitle="Find the right solution for your environment"
        ctaText="Explore how V-Watch Ai can help you improve visibility, strengthen compliance, and take full control of your operations."
        linkColumns={INDUSTRY_COLUMNS}
      />
    </div>
  );
}
