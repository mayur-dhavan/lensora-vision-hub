import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Heart, Menu, X, Search, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { BRAND_NAME } from "@/lib/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      console.log("Header: Starting sign out process...");
      await signOut();
      console.log("Header: Sign out completed");
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account."
      });
      
      // Navigate to home page
      navigate("/");
      
      // Close mobile menu if open
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Header: Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+91 98765 43210</span>
              </div>
              <span>Mon-Sat: 10AM-8PM</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Free Eye Test Available</span>
              <Link to="/eye-test" className="hover:underline font-medium">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">{BRAND_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Shop
            </Link>
            <Link to="/eye-test" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Eye Test
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <>
                <Link to="/wishlist" className="hidden md:flex relative">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/profile" className="hidden md:flex">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSignOut}
                  className="hidden md:flex"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login" className="hidden md:flex">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/eye-test" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Eye Test
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <div className="pt-2 flex flex-col space-y-2">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-5 w-5 mr-2" />
                      My Account
                    </Button>
                  </Link>
                  <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;