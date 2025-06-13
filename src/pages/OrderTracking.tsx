import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Package, Check, Truck, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Order, OrderItem, Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface OrderWithItems extends Order {
  items: (OrderItem & { product: Product })[];
}

interface OrderStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status?: 'complete' | 'current' | 'upcoming' | 'cancelled';
}

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id || !user) return;

      try {
        setLoading(true);

        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (orderError) throw orderError;
        if (!orderData) throw new Error("Order not found");

        // Fetch order items with product details
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            *,
            product:product_id (*)
          `)
          .eq('order_id', id);

        if (itemsError) throw itemsError;

        // Create properly typed order data
        const orderWithItems = {
          ...orderData,
          status: orderData.status as Order['status'],
          items: itemsData as any
        };
        
        setOrder(orderWithItems as OrderWithItems);

      } catch (err: any) {
        console.error('Error fetching order:', err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  const getOrderSteps = () => {
    const steps: OrderStep[] = [
      { id: 'pending', label: 'Order Placed', icon: <ShoppingBag className="h-6 w-6" /> },
      { id: 'processing', label: 'Processing', icon: <Package className="h-6 w-6" /> },
      { id: 'shipped', label: 'Shipped', icon: <Truck className="h-6 w-6" /> },
      { id: 'delivered', label: 'Delivered', icon: <Check className="h-6 w-6" /> }
    ];

    if (!order) return steps;

    const statusMap: {[key: string]: number} = {
      'pending': 0,
      'processing': 1,
      'shipped': 2,
      'delivered': 3,
      'cancelled': -1
    };

    const currentStatusIndex = statusMap[order.status] ?? 0;
    
    return steps.map((step, index) => ({
      ...step,
      status: 
        order.status === 'cancelled' ? 'cancelled' :
        index < currentStatusIndex ? 'complete' :
        index === currentStatusIndex ? 'current' :
        'upcoming'
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="mb-6">{error || "The order you're looking for doesn't exist or you don't have permission to view it."}</p>
          <Button asChild>
            <Link to="/profile">Back to My Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderSteps = getOrderSteps();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">My Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Order #{id?.slice(0, 8)}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Order Details</h1>

          {/* Order Status */}
          {order.status !== 'cancelled' ? (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="relative">
                {/* Progress line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
                
                {/* Steps */}
                <div className="relative flex justify-between">
                  {orderSteps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                          step.status === 'complete' ? 'bg-green-500 text-white' :
                          step.status === 'current' ? 'bg-primary text-white' :
                          'bg-white border-2 border-gray-200 text-gray-400'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="mt-2 text-center">
                        <div className={`font-medium ${
                          step.status === 'complete' ? 'text-green-600' :
                          step.status === 'current' ? 'text-primary' :
                          'text-gray-500'
                        }`}>
                          {step.label}
                        </div>
                        {step.status === 'current' && (
                          <div className="text-xs text-gray-500 mt-1">In progress</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Order Cancelled</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>This order has been cancelled. If you have any questions, please contact our customer support.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
            <div className="border rounded-lg overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start p-4 border-b last:border-b-0">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.product.images?.[0] || "https://via.placeholder.com/80x80"}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary">
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                    <div className="text-sm text-gray-500">Price per item: {formatCurrency(item.price)}</div>
                  </div>
                  <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <Card>
              <div className="p-4">
                <p className="font-medium">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                </p>
                <p>{order.shipping_address.street}</p>
                <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                <p>India</p>
                {order.shipping_address.phone && <p className="mt-2">{order.shipping_address.phone}</p>}
              </div>
            </Card>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium">{id?.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">{new Date(order.created_at!).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span 
                  className={`font-medium ${
                    order.status === 'delivered' ? 'text-green-600' : 
                    order.status === 'cancelled' ? 'text-red-600' : 
                    'text-primary'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span>{formatCurrency(order.total * 0.18)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>{formatCurrency(order.total * 1.18)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button asChild className="w-full">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <Button variant="outline" className="w-full">
                  Cancel Order
                </Button>
              )}
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">Need Help?</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;