import Navbar from "@/components/layout/Navbar";
import BookDemoHero from "@/components/book-demo/Hero";
import BookDemoContent from "@/components/book-demo/Content";
import ProcessSteps from "@/components/book-demo/ProcessSteps";
import Footer from "@/components/layout/Footer";

const FOOTER_COLUMNS = [
  { heading: "Platform", links: ["Dashboard", "BI Reporting", "System Integrators"] },
  { heading: "Industries", links: ["Construction", "Industrial", "Commercial"] },
  { heading: "Company", links: ["About Us", "Contact"] },
];

export default function BookDemoPage() {
  return (
    <div className="relative bg-white">
      <Navbar />
      <BookDemoHero />
      <BookDemoContent />
      <ProcessSteps />
      <Footer
        ctaTitle="Take the next step with confidence."
        ctaText="See how V-Watch AI helps streamline operations, improve visibility, and give your team greater control across every site and workflow."
        ctaVariant="light"
        linkColumns={FOOTER_COLUMNS}
        isBookADemoVisible={false}
      />
    </div>
  );
}
