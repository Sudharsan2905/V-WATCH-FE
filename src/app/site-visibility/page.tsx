"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SiteVisibilityHero from "@/components/site-visibility/Hero"
import SiteVisibilityTrustedLogos from "@/components/site-visibility/TrustedLogos"
import SiteVisibilityProblem from "@/components/site-visibility/Problem"
import SiteVisibilityPlatform from "@/components/site-visibility/Platform"
import SiteVisibilityModules from "@/components/site-visibility/Modules"
import SiteVisibilityHowItWorks from "@/components/site-visibility/HowItWorks"
import SiteVisibilityBusinessBenefits from "@/components/site-visibility/BusinessBenefits"
import SiteVisibilityWalkthrough from "@/components/site-visibility/Walkthrough"

const siteVisibilitypage = () => {
  // console.log("siteVisibilitypage rendered")
  return (
    <div className="relative overflow-x-clip bg-[#E2EDFA]">
      <Navbar active="" />
      <SiteVisibilityHero />
      <SiteVisibilityTrustedLogos />
      <SiteVisibilityProblem />
      <SiteVisibilityPlatform />
      <SiteVisibilityModules />
      <SiteVisibilityHowItWorks />
      <SiteVisibilityBusinessBenefits />
      <SiteVisibilityWalkthrough />

      <Footer
        ctaTitle="See Everything That Matters. Control Everything That Moves."
        ctaText="V-Watch Ai unify people, vehicles, deliveries and compliance into one intelligent site operations platform."
        isBookADemoVisible={false}
      />
    </div>
  )
}

export default siteVisibilitypage
