import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/common/PageHero";
import BiometricVerification from "@/components/facial-recognition/BiometricVerification";
import HowItWorksNew from "@/components/facial-recognition/HowItWorksNew";
import TrustedBy from "@/components/visitor-management/TrustedBy";
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

export default function FacialRecognitionPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#F2F8FE]">
      <Navbar active="Resources" />
      <PageHero
        bgImage="/facial-recognition.png"
        heading="Eliminate Unauthorised Access with Facial Recognition"
        description="Use facial recognition to verify identity instantly, prevent fraud, and maintain full control over who enters and moves within your operations — without cards, passes, or manual checks."
        showBookADemo
      />
      <BiometricVerification />
      <HowItWorksNew />
      {/* <TrustedBy
        trustTitle="Trusted by teams operating in high-security environments"
        trustText="From construction sites to critical facilities, organizations rely on V-Watch AI to secure access and ensure accountability."
      /> */}

      <div className="relative pt-2 px-5 rounded-t-[40px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8FE_220px)] shadow-[inset_0px_18px_50px_10px_#0075B433]">
          <TechnologyPartners
            content={{
              title: "Trusted by teams operating in high-security environments",
              subtitle:
                "From construction sites to critical facilities, organizations rely on V-Watch AI to secure access and ensure accountability.",
            }}
          />
        </div>
      <Footer
        ctaTitle="Secure your site with verified identity"
        ctaText="See how V-Watch AI helps you enforce contractor compliance, prevent risks, and maintain full visibility across your workforce."
        linkColumns={FOOTER_COLUMNS}
      />
    </div>
  );
}
