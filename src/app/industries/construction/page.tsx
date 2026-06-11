import Navbar from "@/components/layout/Navbar";
import IndustriesHero from "@/components/industries/Hero";
import Challenges from "@/components/industries/Challenges";
import OnePlatform from "@/components/industries/OnePlatform";
import WhyChoose from "@/components/industries/WhyChoose";
import Environments from "@/components/industries/Environments";
import Connected from "@/components/industries/Connected";
import UseCases from "@/components/industries/UseCases";
import Footer from "@/components/layout/Footer";
import { constructionContent } from "@/data/industries/construction";

export default function ConstructionPage() {
  const {
    hero,
    challenges,
    onePlatform,
    whyChoose,
    environments,
    connected,
    useCases,
    footer,
  } = constructionContent;

  return (
    <div className="relative">
      <Navbar active="Industries" />
      <IndustriesHero hero={hero} />
      <Challenges challenges={challenges} />
      <OnePlatform onePlatform={onePlatform} />
      <Environments environments={environments} />
      <Connected connected={connected} />
      <WhyChoose whyChoose={whyChoose} />
      <UseCases useCases={useCases} />
      <Footer
        ctaTitle={footer.ctaTitle}
        ctaText={footer.ctaText}
        linkColumns={footer.linkColumns}
      />
    </div>
  );
}
