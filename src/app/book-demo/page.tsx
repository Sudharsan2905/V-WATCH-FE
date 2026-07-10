import Navbar from "@/components/layout/Navbar";
import BookDemoHero from "@/components/book-demo/Hero";
import BookDemoContent from "@/components/book-demo/Content";
import ProcessSteps from "@/components/book-demo/ProcessSteps";
import Footer from "@/components/layout/Footer";

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
        ctaVariant="light"        isBookADemoVisible={false}
      />
    </div>
  );
}
