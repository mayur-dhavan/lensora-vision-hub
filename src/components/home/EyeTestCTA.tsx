import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const EyeTestCTA = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Professional Eye Test Services</h2>
            <p className="text-lg opacity-90 mb-6">
              Our experienced optometrists at {BRAND_NAME} use state-of-the-art equipment to provide comprehensive eye examinations. Book your appointment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/eye-test">Book Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="mr-2 text-white opacity-80" />
                <span>30-minute comprehensive exam</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 text-white opacity-80" />
                <span>Same-day appointments available</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Our Eye Test Includes:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                  <span>Vision acuity assessment</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                  <span>Eye pressure measurement</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                  <span>Digital retina scan</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                  <span>Prescription determination</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                  <span>Personalized eyewear recommendations</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link to="/eye-test">Schedule Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EyeTestCTA;