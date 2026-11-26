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
import SeoKeywords from "@/components/common/SeoKeywords";
import { buildPageMetadata, type PageSeo } from "@/lib/seo";

// SEO for the "Construction Site Management" keyword tab. Same approach as
// /home: meta tags + JSON-LD + a screen-reader-only keyword list. No visible
// text on the page is changed.
const SEO: PageSeo = {
  path: "/pre-construction",
  name: "V-Watch Atlas",
  title: "VWatch Atlas | Construction Site Management Software",
  description:
    "VWatch Atlas is construction site management software for contractors. Manage workforce, vendors, site access, safety and quality on one platform.",
  heading: "V-Watch Atlas construction site management topics",
  keywords: [
    "construction site management software",
    "construction site management system",
    // CONFIRM with client: nothing on the site says monitoring is a service.
    "construction monitoring services",
    "contractors management software",
    // CONFIRM with client: the site never says "web-based".
    "web-based construction management software",
    "construction management software for contractors",
    "construction vendor management software",
    "construction labor management software",
    "construction management software for general contractors",
    "construction contractor software",
    "project management software for contractors",
    "general contractor software",
    // CONFIRM with client: RAMS is not mentioned anywhere on the site.
    "construction rams software",
    // CONFIRM with client: the site says "quality assurance", not a QMS.
    "construction quality management system software",
    "construction subcontractor management software",
  ],
};

export const metadata = buildPageMetadata(SEO);

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
      <SeoKeywords {...SEO} />
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
