import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import HowItWorks from "@/components/contractor-compliance/HowItWorks";
import ConnectedSystem from "@/components/contractor-compliance/ConnectedSystem";
import ComplianceControl from "@/components/contractor-compliance/ComplianceControl";
import TechnologyPartners from "@/components/products/TechnologyPartners";

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
      {/* <TrustedBy /> */}
      {/* <TrustedBy
        trustTitle="Trusted in environments where compliance is critical "
        trustText="From construction sites to industrial facilities, organisations rely on V-Watch AI to ensure every worker meets safety and regulatory requirements. "
      /> */}

      <div className="relative pt-2 py-5 px-5 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
          <TechnologyPartners
            content={{
              title: "Trusted in environments where compliance is critical",
              description:
                "From construction sites to industrial facilities, organisations rely on V-Watch AI to ensure every worker meets safety and regulatory requirements.",
            }}
          />
        </div>
      <Footer
        ctaTitle="Stay compliant. Stay in control."
        ctaText="See how V-Watch AI helps you enforce contractor compliance, prevent risks, and maintain full visibility across your workforce."      />
    </div>
  );
}
