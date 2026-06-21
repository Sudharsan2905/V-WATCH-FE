import Navbar from "@/components/layout/Navbar";
import WorkforceHero from "@/components/workforce-management/Hero";
import Overview from "@/components/workforce-management/Overview";
import OperationalData from "@/components/workforce-management/OperationalData";
import TechnologyPartners from "@/components/products/TechnologyPartners";
import Footer from "@/components/layout/Footer";

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: ["Dashboard", "BI Reporting", "System Integrators"],
  },
  { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
  { heading: "Company", links: ["About Us", "Contact", "Career"] },
];

export const metadata = {
  title: "Workforce Management | V-Watch Ai",
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
        <div className="relative rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
          <TechnologyPartners
            title="Built for teams managing large and dynamic workforces"
            subtitle="From construction sites to industrial operations, V-Watch Ai simplifies workforce administration and reduces manual workload."
          />
        </div>
      </div>
      <Footer
        ctaTitle="Bring your workforce operations into one system"
        ctaText="V-Watch Ai unifies attendance, claims, leave, and payroll — so your team spends less time on admin and more on the work that matters."
        linkColumns={FOOTER_COLUMNS}
      />
    </div>
  );
}
