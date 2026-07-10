import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/about/HeroSection";
import WhatWeSee from "@/components/about/WhatWeSee";
import OurVision from "@/components/about/OurVision";
import OurApproach from "@/components/about/OurApproach";
import VWatchAIPlatform from "@/components/about/VWatchAIPlatform";
import WhyWeBuilt from "@/components/about/WhyWeBuilt";
import WhatMakesUsDifferent from "@/components/about/WhatMakesUsDifferent";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="relative bg-[#F5FBFF] overflow-x-hidden">
      <Navbar active="About Us" />
      <HeroSection />
      <WhatWeSee />
      <OurVision />
      <OurApproach />
      <VWatchAIPlatform />
      <WhyWeBuilt />
      <WhatMakesUsDifferent />
      <Footer
        ctaTitle="See how V-Watch Ai works for your operations"
        ctaText="Discover how a connected platform can give you full visibility, stronger control, and better decision-making across your organization."        ctaVariant="light"
      />
    </div>
  );
}
