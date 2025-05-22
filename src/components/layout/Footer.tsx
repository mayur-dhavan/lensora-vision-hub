
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Lensora</h3>
            <p className="text-gray-300 mb-4">
              Premium eyewear for every style and need. Visit our store for eye checkups and personalized recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-primary transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/eye-test" className="text-gray-300 hover:text-primary transition-colors">Book Eye Test</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Help & Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Help & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Visit Us</h3>
            <p className="text-gray-300 mb-2">
              LensHub Eyewear
            </p>
            <p className="text-gray-300 mb-2">
              Opposite Bank Of Maharashtra,<br />
              Sinhgad College Road, Pune
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Phone:</strong> +91 9876543210
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> info@lensora.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Lensora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
