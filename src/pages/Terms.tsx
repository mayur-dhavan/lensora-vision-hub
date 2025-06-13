import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Terms = () => {
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
            <BreadcrumbLink>Terms & Conditions</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      
      <div className="prose max-w-none">
        <p className="mb-6">
          Welcome to Lenshub Eyewear. These terms and conditions outline the rules and regulations 
          for the use of our website and services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the terms and 
          provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Products and Services</h2>
        <p className="mb-4">
          Lenshub Eyewear provides eyewear products including prescription glasses, sunglasses, 
          contact lenses, and professional eye examination services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
        <p className="mb-4">
          All orders are subject to availability and confirmation of the order price. We currently 
          accept Cash on Delivery (COD) as the primary payment method.
        </p>

        <h2 className="text-2xl font-semibold mb-4">4. Delivery</h2>
        <p className="mb-4">
          We deliver within Pune and surrounding areas. Delivery times may vary based on product 
          availability and location.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Returns and Exchanges</h2>
        <p className="mb-4">
          We offer returns and exchanges within 30 days of purchase, subject to our return policy. 
          Products must be in original condition with all packaging.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Privacy Policy</h2>
        <p className="mb-4">
          Your privacy is important to us. Please review our Privacy Policy to understand how we 
          collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">
          Lenshub Eyewear shall not be liable for any indirect, incidental, special, consequential, 
          or punitive damages resulting from your use of our products or services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms & Conditions, please contact us at:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Lenshub Eyewear</strong></p>
          <p>Opposite Bank Of Maharashtra</p>
          <p>Sinhgad College Road, Pune</p>
          <p>Phone: +91 9876543210</p>
          <p>Email: info@lenshubeywear.com</p>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Terms;