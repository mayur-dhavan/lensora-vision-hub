import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  Users, 
  Calendar, 
  ClipboardList, 
  LogOut, 
  Menu, 
  X,
  Package,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BRAND_NAME } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully"
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <Link to="/admin" className="flex items-center">
            <span className="text-2xl font-bold text-primary">{BRAND_NAME} Admin</span>
          </Link>
        </div>
        <nav className="flex flex-col p-4">
          <div className="space-y-2">
            <Link to="/admin">
              <Button 
                variant={isActive("/admin") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/products">
              <Button 
                variant={isActive("/admin/products") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Products
              </Button>
            </Link>
            <Link to="/admin/inventory">
              <Button 
                variant={isActive("/admin/inventory") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Package className="mr-2 h-4 w-4" />
                Inventory
              </Button>
            </Link>
            <Link to="/admin/orders">
              <Button 
                variant={isActive("/admin/orders") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </Link>
            <Link to="/admin/appointments">
              <Button 
                variant={isActive("/admin/appointments") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Eye Tests
              </Button>
            </Link>
            <Link to="/admin/customers">
              <Button 
                variant={isActive("/admin/customers") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Customers
              </Button>
            </Link>
            <Link to="/admin/categories">
              <Button 
                variant={isActive("/admin/categories") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Categories
              </Button>
            </Link>
          </div>

          <div className="mt-auto pt-4 border-t">
            <Link to="/" className="block mb-2">
              <Button variant="outline" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                View Store
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;