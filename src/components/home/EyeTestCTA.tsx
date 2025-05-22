
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EyeTestCTA = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-2">
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576765608622-067973a79f53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80" 
                alt="Eye examination" 
                className="w-full h-full object-cover rounded-xl"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
          
          <div className="lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Professional Eye Examination
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Regular eye tests are important not just for clear vision, but also for detecting early signs of health issues. Our skilled optometrists use the latest technology to provide comprehensive eye health assessments.
            </p>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-navy-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Full eye health assessment</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-navy-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Precise prescription measurement</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-navy-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Digital retinal imaging</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-navy-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Personalized recommendations</span>
              </li>
            </ul>
            <Link to="/eye-test">
              <Button size="lg" className="bg-navy-800 hover:bg-navy-700">
                Book Your Eye Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EyeTestCTA;
