import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/common/PageHero";
import HelpCards from "@/components/contact/HelpCards";
import DirectContact from "@/components/contact/DirectContact";
import Footer from "@/components/layout/Footer";

export default function ContactUsPage() {
  return (
    <div className="relative bg-[#F2F8FE]">
      <Navbar active="Contact Us" />
      <PageHero
        bgImage="/contact/Subtract.png"
        heading="Get in Touch With Our Team"
        description="Whether you're exploring solutions, have questions, or need support we're here to help."
      />
      <HelpCards />
      <DirectContact />
      <Footer
        ctaTitle="Looking for a full walkthrough?"
        ctaText="If you're evaluating solutions or ready to explore implementation, we recommend booking a demo for a more detailed session."        ctaVariant="light"
      />
    </div>
  );
}
