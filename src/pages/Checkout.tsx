import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/types";
import AddressForm from "@/components/address/AddressForm";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });

      if (error) throw error;
      
      const addressList = data as Address[];
      setAddresses(addressList);
      
      // Auto-select default address
      const defaultAddress = addressList.find(addr => addr.is_default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const handlePlaceOrder = async () => {
    if (!user || !selectedAddress) {
      toast({
        title: "Missing Information",
        description: "Please select a delivery address",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some items before checking out.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create order - convert Address to Json format
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          status: "pending",
          total: total,
          shipping_address: JSON.parse(JSON.stringify(selectedAddress)), // Convert to Json
        })
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Order items creation error:", itemsError);
        // Try to clean up the order if items creation fails
        await supabase.from("orders").delete().eq("id", order.id);
        throw new Error(`Failed to create order items: ${itemsError.message}`);
      }

      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      
      navigate(`/order/${order.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showAddressForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AddressForm
          onSuccess={() => {
            setShowAddressForm(false);
            fetchAddresses();
          }}
          onCancel={() => setShowAddressForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Address */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">No addresses found</p>
                  <Button onClick={() => setShowAddressForm(true)}>
                    Add New Address
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedAddress?.id === address.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {address.first_name} {address.last_name}
                              {address.is_default && (
                                <Badge variant="secondary" className="ml-2">Default</Badge>
                              )}
                            </p>
                            <p className="text-sm text-gray-600">{address.street}</p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.postal_code}
                            </p>
                            {address.phone && (
                              <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                            )}
                          </div>
                          <input
                            type="radio"
                            checked={selectedAddress?.id === address.id}
                            onChange={() => setSelectedAddress(address)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddressForm(true)}
                    className="w-full"
                  >
                    Add New Address
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Payment Method:</strong> Cash on Delivery (COD)
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Pay when your order is delivered to your doorstep
                </p>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress || loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;