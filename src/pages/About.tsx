import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { BRAND_NAME, BUSINESS_INFO } from "@/lib/constants";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">About {BRAND_NAME} Eyewear</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, {BRAND_NAME} Eyewear started as a small family-owned optical store in {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city}. 
            Our passion for quality eyewear and personalized customer service quickly made us a favorite among locals.
          </p>
          <p className="mb-4">
            Over the years, we've grown to become one of the most trusted eyewear retailers in {BUSINESS_INFO.address.city}, known for our 
            extensive collection of prescription glasses, sunglasses, and contact lenses from leading brands around the world.
          </p>
          <p>
            In 2023, we launched our online store to bring the {BRAND_NAME} experience to customers beyond our physical location, 
            while maintaining the same level of quality and service that has defined us for over a decade.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1582142407894-ec8cecd358b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt={`${BRAND_NAME} Eyewear store`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Mission</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl italic">
            "To provide high-quality, stylish eyewear that enhances vision and confidence, 
            backed by exceptional customer service and expert eye care advice."
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose {BRAND_NAME}?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-primary text-xl font-bold mb-3">Quality Products</div>
            <p>We curate our collection from reputable brands known for durability and style.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-primary text-xl font-bold mb-3">Expert Advice</div>
            <p>Our team of licensed optometrists ensures you get the perfect eyewear for your needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-primary text-xl font-bold mb-3">After-Sales Support</div>
            <p>From adjustments to repairs, we're here to keep your eyewear in perfect condition.</p>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="mb-3 mx-auto h-40 w-40 rounded-full overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Dr. Rajesh Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Dr. Rajesh Sharma</h3>
            <p className="text-gray-500">Founder & Chief Optometrist</p>
          </div>
          <div className="text-center">
            <div className="mb-3 mx-auto h-40 w-40 rounded-full overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Dr. Priya Agarwal"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Dr. Priya Agarwal</h3>
            <p className="text-gray-500">Senior Optometrist</p>
          </div>
          <div className="text-center">
            <div className="mb-3 mx-auto h-40 w-40 rounded-full overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="Vikram Patel"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Vikram Patel</h3>
            <p className="text-gray-500">Store Manager</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">Visit Our Store</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              <strong>Address:</strong><br />
              {BUSINESS_INFO.name}<br />
              {BUSINESS_INFO.address.street}<br />
              {BUSINESS_INFO.address.area}<br />
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.pincode}
            </p>
            <p className="mb-4">
              <strong>Hours:</strong><br />
              {BUSINESS_INFO.hours.weekdays}<br />
              Sunday: Closed
            </p>
            <p className="mb-4">
              <strong>Contact:</strong><br />
              Phone: {BUSINESS_INFO.contact.phone}<br />
              Email: {BUSINESS_INFO.contact.email}
            </p>
          </div>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <iframe
              title={`${BRAND_NAME} Eyewear Location`}
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5722767083785!2d73.8256442!3d18.4577875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI3JzI4LjAiTiA3M8KwNDknMzIuMyJF!5e0!3m2!1sen!2sin!4v1621422833651!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;