import Navbar from "@/components/layout/Navbar";
import WorkforceHero from "@/components/workforce-management/Hero";
import Overview from "@/components/workforce-management/Overview";
import OperationalData from "@/components/workforce-management/OperationalData";
import ConnectedTo from "@/components/workforce-management/ConnectedTo";
import FeatureHighlight from "@/components/workforce-management/FeatureHighlight";
import TechnologyPartners from "@/components/products/TechnologyPartners";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Workforce Management | V-Watch AI",
  description:
    "Automate payroll, claims, and leave management using real-time workforce data — reducing manual work, improving accuracy, and keeping operations running efficiently.",
};

export default function WorkforceManagementPage() {
  return (
    <div className="relative overflow-x-clip bg-[#F2F8FE]">
      <Navbar active="Platform" />
      <WorkforceHero />
      {/* Shared continuous surface lifting off the hero, fading to #F2F8FE. */}
      <div className="relative -mt-9 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_320px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
        <Overview />
        <OperationalData />
        <ConnectedTo />
        <FeatureHighlight />

        <div className="pt-2 py-5 relative rounded-t-[40px] shadow-[inset_0px_18px_50px_10px_#0075B433]">
          <TechnologyPartners
            content={{
              title: "Built for teams managing large and dynamic workforces",
              description:
                "From construction sites to industrial operations, V-Watch AI simplifies workforce administration and reduces manual workload.",
            }}
          />
        </div>
      </div>
      <Footer
        ctaTitle="Simplify your workforce operations"
        ctaText="See how V-Watch AI helps you automate payroll, manage claims, and streamline workforce administration all in one system."
      />
    </div>
  );
}
