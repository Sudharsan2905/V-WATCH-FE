import Navbar from "@/components/layout/Navbar";
import HrmsHero from "@/components/hrms/Hero";
import HrmsAudience from "@/components/hrms/Audience";
import HrmsOverview from "@/components/hrms/Overview";
import HrmsFeatures from "@/components/hrms/Features";
import HrmsPlanStructure from "@/components/hrms/PlanStructure";
import HrmsGetStarted from "@/components/hrms/GetStarted";
import HrmsFAQ from "@/components/hrms/FAQ";
import HrmsTrialForm from "@/components/hrms/TrialForm";
import Footer from "@/components/layout/Footer";

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: ["DSA Access", "RTLS Tracking", "SMS Workflow", "HRMS Management"],
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

// export const metadata = {
//   title: "HRMS | V-Watch AI",
//   description:
//     "A unified HR system that connects workforce management with task execution — assign, track, verify, and reward work using real data from your site.",
// };

export default function HrmsPage() {
  return (
    <div className="relative overflow-x-clip bg-[#f6fbfe]">
      <Navbar active="" />
      <HrmsHero />

      <div className="-mt-[2px] relative bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_320px)]">
        <HrmsOverview />
        <HrmsFeatures />
        <HrmsAudience />
        <HrmsPlanStructure />
        <HrmsGetStarted />
        <HrmsFAQ />
      </div>

      <HrmsTrialForm />

      <Footer showHeader={false} showCta={false} linkColumns={FOOTER_COLUMNS} />
    </div>
  );
}
