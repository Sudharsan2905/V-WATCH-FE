import Navbar from "@/components/layout/Navbar";
import MaintenanceHero from "@/components/maintenance-ticketing/Hero";
import WorkflowSection from "@/components/maintenance-ticketing/WorkflowSection";
import FeatureGrid from "@/components/maintenance-ticketing/FeatureGrid";
import StepProcess from "@/components/maintenance-ticketing/StepProcess";
import TechnologyPartners from "@/components/products/TechnologyPartners";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Maintenance & Ticketing | V-Watch AI",
  description:
    "Manage maintenance requests, assign service tasks, and track resolution in one system ensuring every issue is addressed, recorded, and resolved efficiently.",
};

export default function MaintenanceTicketingPage() {
  return (
    <div className="relative bg-[#F2F8FE]">
      <Navbar active="Resources" />
      <MaintenanceHero />
      <div className="relative -mt-9 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_320px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
        <WorkflowSection />
        <FeatureGrid />
        <StepProcess />
        <div className="relative pt-2 pb-5 px-5 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
          <TechnologyPartners
            content={{
              title: "Built for operations that cannot afford downtime",
              description:
                "Used across construction, facilities, and industrial environments to manage maintenance workflows efficiently and reliably.",
            }}
          />
        </div>
      </div>
      <Footer
        ctaTitle="Resolve every issue before it becomes a breakdown"
        ctaText="V-Watch AI centralizes your maintenance workflow — from ticket creation to resolution — so nothing falls through the cracks."      />
    </div>
  );
}
