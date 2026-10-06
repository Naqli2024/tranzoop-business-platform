import { useEffect } from "react";
import "../../../assets/styles/landingPage.css";
import PromisesSection from "./PromisesSection";
import ProductsSection from "./ProductsSection";
import HowItWorksSection from "./HowItWorksSection";
import CopilotSection from "./CopilotSection";
import BusinessOwners from "./BusinessOwners";
import VisionSection from "./VisionSection";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";
import FooterSection from "./FooterSection";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import DigitalOfficeSection from "./DigitalOfficeSection";

const LandingPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.14 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <HeroSection />
      {/* <AboutSection /> */}
      <ProductsSection />
      <DigitalOfficeSection/>
      <PromisesSection />
      <HowItWorksSection />
      <CopilotSection />
      <BusinessOwners />
      <VisionSection />
      <Testimonials />
      <FAQSection />
      <FooterSection />
    </main>
  );
};

export default LandingPage;
