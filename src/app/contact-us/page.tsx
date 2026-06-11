import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/common/PageHero";
import HelpCards from "@/components/contact/HelpCards";
import DirectContact from "@/components/contact/DirectContact";
import Footer from "@/components/layout/Footer";

const CONTACT_COLUMNS = [
  { heading: "Platform", links: ["Dashboard", "BI Reporting", "System Integrators"] },
  { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
  { heading: "Company", links: ["About Us", "Contact"] },
];

export default function ContactUsPage() {
  return (
    <div className="relative bg-[#F2F8FE]">
      <Navbar active="Contact Us" />
      <PageHero
        bgImage="/contact/Subtract.png"
        badge="Connect & Contact Us"
        heading="Get in Touch With Our Team"
        description="Whether you're exploring solutions, have questions, or need support we're here to help."
      />
      <HelpCards />
      <DirectContact />
      <Footer
        ctaTitle="Looking for a full walkthrough?"
        ctaText="If you're evaluating solutions or ready to explore implementation, we recommend booking a demo for a more detailed session."
        linkColumns={CONTACT_COLUMNS}
        ctaVariant="light"
        showCtaButton={false}
      />
    </div>
  );
}
