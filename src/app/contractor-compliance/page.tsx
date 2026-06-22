import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/common/PageHero";
import ComplianceControl from "@/components/contractor-compliance/ComplianceControl";
import HowItWorks from "@/components/contractor-compliance/HowItWorks";
import ConnectedSystem from "@/components/contractor-compliance/ConnectedSystem";
import TrustedBy from "@/components/contractor-compliance/TrustedBy";
import Footer from "@/components/layout/Footer";

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

export default function ContractorCompliancePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#F2F8FE]">
      <Navbar active="Resources" />
      <PageHero
        bgImage="/contractor-complaince/bg-contractor.webp"
        heading="Ensure Only Compliant Workers Enter Your Site"
        description="Track certifications, monitor safety pass expiry, and enforce compliance in real time — ensuring only authorised and qualified personnel are allowed to work."
        showBookADemo
      />
      <ComplianceControl />
      <HowItWorks />
      <ConnectedSystem />
      <TrustedBy />
      <Footer
        ctaTitle="Stay compliant. Stay in control."
        ctaText="See how V-Watch Ai helps you enforce contractor compliance, prevent risks, and maintain full visibility across your workforce."
        linkColumns={FOOTER_COLUMNS}
      />
    </div>
  );
}
