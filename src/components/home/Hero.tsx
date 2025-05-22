
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-navy-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
            See the World in Perfect Clarity
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover premium eyewear that combines style, comfort, and precision. 
            From fashion-forward frames to cutting-edge lens technology.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/shop">
              <Button size="lg" className="bg-navy-800 hover:bg-navy-700">
                Shop Collection
              </Button>
            </Link>
            <Link to="/eye-test">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Book Eye Test
              </Button>
            </Link>
          </div>
          
          {/* Features banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display font-medium text-lg">Premium Quality</div>
              <p className="text-sm opacity-75">High-grade materials</p>
            </div>
            <div className="text-center">
              <div className="font-display font-medium text-lg">Expert Eye Care</div>
              <p className="text-sm opacity-75">Professional testing</p>
            </div>
            <div className="text-center">
              <div className="font-display font-medium text-lg">Custom Fitting</div>
              <p className="text-sm opacity-75">Perfect for your face</p>
            </div>
            <div className="text-center">
              <div className="font-display font-medium text-lg">1-Year Warranty</div>
              <p className="text-sm opacity-75">On all frames</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
