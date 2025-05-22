
import { useEffect } from "react";
import BenefitsSection from "../components/home/BenefitsSection";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Lensora</h1>
        <p className="text-xl mb-12">Your premier destination for quality eyewear</p>
      </div>
      <BenefitsSection />
    </div>
  );
};

export default Index;
