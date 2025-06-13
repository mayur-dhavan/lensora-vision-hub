import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Truck, Clock, MapPin, Package } from "lucide-react";

const Shipping = () => {
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
            <BreadcrumbLink>Shipping Information</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Pune City</h3>
                <p className="text-gray-600">Free delivery for orders above ₹2,000</p>
                <p className="text-sm text-gray-500">Delivery time: 1-2 business days</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Pune Metropolitan Area</h3>
                <p className="text-gray-600">₹50 delivery charge</p>
                <p className="text-sm text-gray-500">Delivery time: 2-3 business days</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Maharashtra (Other Cities)</h3>
                <p className="text-gray-600">₹100 delivery charge</p>
                <p className="text-sm text-gray-500">Delivery time: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Delivery Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Package className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-gray-600">Orders are processed within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Dispatch</h3>
                <p className="text-gray-600">You'll receive tracking details via SMS/Email</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-gray-600">Cash on Delivery available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Special Delivery Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Prescription Glasses</h3>
            <p className="text-gray-600 text-sm">
              Custom prescription glasses require 3-7 business days for preparation before shipping.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Contact Lenses</h3>
            <p className="text-gray-600 text-sm">
              Contact lenses are shipped in temperature-controlled packaging to maintain quality.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Fragile Items</h3>
            <p className="text-gray-600 text-sm">
              All eyewear is carefully packaged with protective materials to prevent damage.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Express Delivery</h3>
            <p className="text-gray-600 text-sm">
              Same-day delivery available within Pune for urgent orders (additional charges apply).
            </p>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-primary pl-4 mb-8">
        <h2 className="text-xl font-semibold mb-2">Important Notes</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Delivery times may vary during festivals and peak seasons</li>
          <li>• Someone must be available to receive the package</li>
          <li>• ID verification may be required for high-value orders</li>
          <li>• We'll attempt delivery 3 times before returning to our facility</li>
          <li>• For any delivery issues, contact us at +91 9876543210</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Need Help with Your Order?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </Link>
          <Link 
            to="/profile" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Track Your Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;