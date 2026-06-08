import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/common/Hero";
import FragmentedOps from "@/components/common/FragmentedOps";
import UnifiedSystem from "@/components/home/UnifiedSystem";
import FeatureGrid from "@/components/home/FeatureGrid";
import Industries from "@/components/home/Industries";
import BuiltToScale from "@/components/home/BuiltToScale";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative bg-[#030515]">
      <Navbar />
      <Hero />
      <FragmentedOps />
      <UnifiedSystem />
      <FeatureGrid />
      <Industries />
      <BuiltToScale />
      <Footer />
    </div>
  );
}
