import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, RotateCcw, Shield, Clock, CheckCircle } from "lucide-react";

const Returns = () => {
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
            <BreadcrumbLink>Returns & Exchanges</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">30-Day Return Window</h3>
          <p className="text-gray-600 text-sm">Return or exchange items within 30 days of purchase</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Quality Guarantee</h3>
          <p className="text-gray-600 text-sm">All products are quality checked before shipping</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Easy Process</h3>
          <p className="text-gray-600 text-sm">Simple return process with free pickup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Eligible Items</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Sunglasses and non-prescription eyewear</li>
                <li>• Unopened contact lens packages</li>
                <li>• Accessories and cases</li>
                <li>• Prescription glasses (within 7 days if unsatisfied)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Condition Requirements</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Items must be in original condition</li>
                <li>• All original packaging and tags included</li>
                <li>• No scratches or damage</li>
                <li>• Original receipt or order confirmation</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Exchange Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Size/Style Exchange</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Free exchange for different size or color</li>
                <li>• Subject to availability</li>
                <li>• One exchange per item</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Prescription Changes</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Free lens replacement within 30 days</li>
                <li>• Valid prescription required</li>
                <li>• Frame must be in good condition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Return/Exchange</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
            <h3 className="font-medium mb-1">Contact Us</h3>
            <p className="text-gray-600 text-xs">Call or email to initiate return</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
            <h3 className="font-medium mb-1">Pack Items</h3>
            <p className="text-gray-600 text-xs">Pack in original packaging</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
            <h3 className="font-medium mb-1">Schedule Pickup</h3>
            <p className="text-gray-600 text-xs">We'll arrange free pickup</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
            <h3 className="font-medium mb-1">Get Refund</h3>
            <p className="text-gray-600 text-xs">Refund processed in 3-5 days</p>
          </div>
        </div>
      </div>

      <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg mb-8">
        <h3 className="font-medium text-yellow-800 mb-2">Special Conditions</h3>
        <ul className="space-y-1 text-yellow-700 text-sm">
          <li>• Custom prescription lenses cannot be returned unless defective</li>
          <li>• Contact lenses cannot be returned once opened for hygiene reasons</li>
          <li>• Sale items may have different return conditions</li>
          <li>• Refunds will be processed to the original payment method</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Need to Return Something?</h2>
        <p className="text-gray-600 mb-6">Contact our customer service team to start your return or exchange</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+919876543210" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Call: +91 9876543210
          </a>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Email Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Returns;