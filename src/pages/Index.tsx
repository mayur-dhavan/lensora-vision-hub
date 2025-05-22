
import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EyeTestCTA from "@/components/home/EyeTestCTA";
import NewsletterSignup from "@/components/home/NewsletterSignup";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryHighlights />
      <FeaturedProducts />
      <BenefitsSection />
      <TestimonialsSection />
      <EyeTestCTA />
      <NewsletterSignup />
    </div>
  );
};

export default Index;
