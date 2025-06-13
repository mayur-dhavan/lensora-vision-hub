import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/constants";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="relative h-[70vh] w-full bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    Premium Eyewear for Every Style
                  </h1>
                  <p className="text-xl text-white/80 mb-8">
                    Discover our collection of designer frames and sunglasses at {BRAND_NAME}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="font-medium">
                      <Link to="/shop">Shop Now</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                      <Link to="/eye-test">Book Eye Test</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div 
                className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center hidden lg:block" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')" }}
              ></div>
            </div>
          </CarouselItem>
          
          <CarouselItem>
            <div className="relative h-[70vh] w-full bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    Professional Eye Care Services
                  </h1>
                  <p className="text-xl text-white/80 mb-8">
                    Comprehensive eye exams with state-of-the-art equipment at {BRAND_NAME}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="font-medium">
                      <Link to="/eye-test">Book Appointment</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                      <Link to="/about">Our Services</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div 
                className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center hidden lg:block" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551909353-2a7a78401906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')" }}
              ></div>
            </div>
          </CarouselItem>
          
          <CarouselItem>
            <div className="relative h-[70vh] w-full bg-gradient-to-r from-amber-700 to-orange-600 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    New Season Sunglasses
                  </h1>
                  <p className="text-xl text-white/80 mb-8">
                    Protect your eyes in style with our latest collection at {BRAND_NAME}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="font-medium">
                      <Link to="/shop/sunglasses">Explore Collection</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-amber-700">
                      <Link to="/shop">View All Products</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div 
                className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center hidden lg:block" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')" }}
              ></div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          <CarouselPrevious className="relative left-0 translate-x-0 h-8 w-8" />
          <CarouselNext className="relative right-0 translate-x-0 h-8 w-8" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;