import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/common/PageHero";
import WhenEmergencyHappens from "@/components/real-time-headcount/WhenEmergencyHappens";
import HeadcountFeatureGrid from "@/components/real-time-headcount/HeadcountFeatureGrid";
import PoweredByData from "@/components/real-time-headcount/PoweredByData";
import Footer from "@/components/layout/Footer";
import TechnologyPartners from "@/components/products/TechnologyPartners";

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: ["Dashboard", "BI Reporting", "System Integrators"],
  },
  {
    heading: "Industries",
    links: ["Construction", "Industrial", "Commercial"],
  },
  { heading: "Company", links: ["About Us", "Contact"] },
];

export default function RealTimeHeadcountPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#F2F8FE]">
      <Navbar active="Resources" />
      <PageHero
        bgImage="/real-time-headcount/Home.png"
        heading="Know Who's Safe. Instantly."
        description="Get real-time visibility of every person on-site during emergencies enabling faster decisions, accurate headcounts, and safer evacuations when it matters most."
        showBookADemo
      />
      <WhenEmergencyHappens />
      <HeadcountFeatureGrid />
      <PoweredByData />
      <div className="relative pt-2 py-5 px-5 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
        <TechnologyPartners
          content={{
            title: "Used in environments where safety is non-negotiable ",
            description:
              "From construction sites to industrial operations, V-Watch AI supports emergency response with real-time visibility and accurate data. ",
          }}
        />
      </div>
      <Footer
        ctaTitle="Be prepared when it matters most"
        ctaText="See how V-Watch AI helps you respond faster, act smarter, and protect your workforce during critical situations."
        linkColumns={FOOTER_COLUMNS}
      />
    </div>
  );
}
