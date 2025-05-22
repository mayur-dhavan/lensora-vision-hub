
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Eye, ShoppingBag, Calendar, Check } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Lensora</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are dedicated to providing premium eyewear and exceptional eye care services to customers throughout India.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1582142839970-2b3dbfab7512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Our store" 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="mb-4 text-gray-700">
            LensHub Eyewear was founded in 2010 with a simple mission: to provide high-quality eyewear at reasonable prices, paired with exceptional customer service and professional eye care.
          </p>
          <p className="mb-4 text-gray-700">
            Starting as a small optical shop in Pune, we've grown into a trusted name in the eyewear industry, serving thousands of satisfied customers across the region.
          </p>
          <p className="text-gray-700">
            Our journey has been guided by our commitment to eye health, style, and customer satisfaction. We believe that quality eyewear isn't just about improving vision—it's about enhancing life.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Eye className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Care</h3>
            <p className="text-gray-600">
              We prioritize the health of your eyes with comprehensive examinations and personalized care from our experienced optometrists.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ShoppingBag className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We source our frames and lenses from trusted manufacturers who share our commitment to quality and durability.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
            <p className="text-gray-600">
              We believe in treating each customer as an individual, offering personalized recommendations based on your unique needs.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Dr. Rahul Sharma" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold">Dr. Rahul Sharma</h3>
            <p className="text-gray-600">Chief Optometrist</p>
          </div>
          <div className="text-center">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Priya Singh" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold">Priya Singh</h3>
            <p className="text-gray-600">Store Manager</p>
          </div>
          <div className="text-center">
            <img 
              src="https://randomuser.me/api/portraits/men/26.jpg" 
              alt="Vikram Patel" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold">Vikram Patel</h3>
            <p className="text-gray-600">Customer Experience</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Lensora?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Wide Selection</h3>
              <p className="text-gray-600">From designer frames to budget-friendly options, we have eyewear for every style and need.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Comprehensive Eye Exams</h3>
              <p className="text-gray-600">Our thorough eye exams ensure your prescription is accurate and your eyes are healthy.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Expert Fitting</h3>
              <p className="text-gray-600">We ensure your frames fit perfectly for both comfort and optical performance.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold mb-1">After-Sales Service</h3>
              <p className="text-gray-600">We provide adjustments, repairs, and warranties to keep your eyewear in perfect condition.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience Lensora?</h2>
        <p className="mb-6 text-gray-600">
          Visit our store or shop online for the latest eyewear collections and professional eye care services.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/shop">Shop Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/eye-test">Book Eye Test</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
