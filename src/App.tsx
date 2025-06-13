import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider, RequireAuth, RequireAdmin } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import EyeTest from "./pages/EyeTest";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminAppointments from "./pages/admin/Appointments";
import AdminCustomers from "./pages/admin/Customers";

const queryClient = new QueryClient();
// Use the environment variable for the Clerk publishable key
const CLERK_PUBLISHABLE_KEY = "pk_test_ZW5nYWdlZC1veXN0ZXItODQuY2xlcmsuYWNjb3VudHMuZGV2JA";

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/shop" element={<Layout><Shop /></Layout>} />
                <Route path="/shop/:category" element={<Layout><Shop /></Layout>} />
                <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/terms" element={<Layout><Terms /></Layout>} />
                <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
                <Route path="/returns" element={<Layout><Returns /></Layout>} />
                
                {/* Protected User Routes */}
                <Route path="/eye-test" element={<Layout><RequireAuth><EyeTest /></RequireAuth></Layout>} />
                <Route path="/wishlist" element={<Layout><RequireAuth><Wishlist /></RequireAuth></Layout>} />
                <Route path="/cart" element={<Layout><Cart /></Layout>} />
                <Route path="/checkout" element={<Layout><RequireAuth><Checkout /></RequireAuth></Layout>} />
                <Route path="/order/:id" element={<Layout><RequireAuth><OrderTracking /></RequireAuth></Layout>} />
                <Route path="/profile" element={<Layout><RequireAuth><Profile /></RequireAuth></Layout>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<RequireAdmin><AdminLayout><AdminDashboard /></AdminLayout></RequireAdmin>} />
                <Route path="/admin/products" element={<RequireAdmin><AdminLayout><AdminProducts /></AdminLayout></RequireAdmin>} />
                <Route path="/admin/orders" element={<RequireAdmin><AdminLayout><AdminOrders /></AdminLayout></RequireAdmin>} />
                <Route path="/admin/appointments" element={<RequireAdmin><AdminLayout><AdminAppointments /></AdminLayout></RequireAdmin>} />
                <Route path="/admin/customers" element={<RequireAdmin><AdminLayout><AdminCustomers /></AdminLayout></RequireAdmin>} />
                
                {/* Catch-all Route */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </CartProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;