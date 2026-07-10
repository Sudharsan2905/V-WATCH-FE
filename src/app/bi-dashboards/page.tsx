import Navbar from "@/components/layout/Navbar";
import BiDashboardsHero from "@/components/bi-dashboards/Hero";
import IntelligenceLayer from "@/components/bi-dashboards/IntelligenceLayer";
import IntegratorNetwork from "@/components/bi-dashboards/IntegratorNetwork";
import DashboardShowcase from "@/components/bi-dashboards/DashboardShowcase";
import Footer from "@/components/layout/Footer";

export default function BiDashboardsPage() {
  return (
    <div className="relative bg-[#F2F8FE]">
      <Navbar active="Platform" />
      <BiDashboardsHero />  
      <IntelligenceLayer />
      <IntegratorNetwork />
      <DashboardShowcase />
      <Footer
        ctaTitle="Turn your data into operational advantage"
        ctaText="See how V-Watch Ai and Power BI can help you gain full visibility, improve performance, and make smarter decisions across your operations."        ctaVariant="dark"
      />
    </div>
  );
}
