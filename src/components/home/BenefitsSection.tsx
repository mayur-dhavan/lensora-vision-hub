import { Eye, Shield, Truck, Award } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Eye />,
      title: "Expert Eye Care",
      description: "Professional eye examinations using the latest equipment for accurate prescriptions."
    },
    {
      icon: <Shield />,
      title: "Quality Guaranteed",
      description: "Premium materials, precise craftsmanship, and durable frames built to last."
    },
    {
      icon: <Truck />,
      title: "Fast Delivery",
      description: "Expedited shipping options and local pickup available for your convenience."
    },
    {
      icon: <Award />,
      title: "Satisfaction Warranty",
      description: "One-year warranty on all frames and 30-day satisfaction guarantee."
    }
  ];

  return (
    <section className="py-16 bg-navy-50 hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Why Choose {BRAND_NAME}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to providing exceptional service and products that enhance your vision and style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-navy-100 text-navy-700 rounded-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;