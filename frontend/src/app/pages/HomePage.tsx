import { useEffect } from "react";
import { useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { PurificationProcess } from "../components/PurificationProcess";
import { ProductShowcase } from "../components/ProductShowcase";
import { QualityCertification } from "../components/QualityCertification";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { DistributionSection } from "../components/DistributionSection";
import { BottleCustomizer } from "../components/BottleCustomizer";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PurificationProcess />
      <ProductShowcase />
      <QualityCertification />
      <WhyChooseUs />
      <BottleCustomizer />
      <DistributionSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
