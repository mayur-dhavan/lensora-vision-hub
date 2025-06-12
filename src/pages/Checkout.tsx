
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Address } from "@/types";
import { Truck, CreditCard, MapPin } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'shipping',
    first_name: '',
    last_name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }

    fetchAddresses();
  }, [user, cart, navigate]);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      
      setAddresses(data || []);
      if (data && data.length > 0) {
        setSelectedAddress(data[0].id!);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal >= 1000 ? 0 : 50; // Free shipping above ₹1000
    return {
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping
    };
  };

  const handlePlaceOrder = async () => {
    if (!user) return;

    const shippingAddress = selectedAddress 
      ? addresses.find(addr => addr.id === selectedAddress)
      : newAddress;

    if (!shippingAddress || !shippingAddress.street) {
      toast({
        title: "Address Required",
        description: "Please select or add a shipping address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const totals = calculateTotal();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: totals.total,
          shipping_address: shippingAddress,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update product stock
      for (const item of cart) {
        const { error: stockError } = await supabase.rpc('update_product_stock', {
          product_id: item.id,
          quantity_sold: item.quantity
        });
        
        if (stockError) {
          console.error('Error updating stock:', stockError);
        }
      }

      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id.slice(0, 8)} has been placed. You will pay ₹${totals.total.toFixed(2)} on delivery.`
      });

      navigate(`/order/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "Failed to place your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotal();

  return (
    <>
      <SEOHead
        title="Checkout"
        description="Complete your purchase at Lenshub Eyewear. Cash on Delivery available."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Address */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.length > 0 && (
                    <div>
                      <Label>Select Saved Address</Label>
                      <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an address" />
                        </SelectTrigger>
                        <SelectContent>
                          {addresses.map((address) => (
                            <SelectItem key={address.id!} value={address.id!}>
                              {address.first_name} {address.last_name} - {address.street}, {address.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Separator />
                  <p className="font-medium">Or enter a new address:</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={newAddress.first_name}
                        onChange={(e) => setNewAddress({...newAddress, first_name: e.target.value})}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={newAddress.last_name}
                        onChange={(e) => setNewAddress({...newAddress, last_name: e.target.value})}
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <Label>Street Address</Label>
                    <Input
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      placeholder="House number, street name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Postal Code</Label>
                    <Input
                      value={newAddress.postal_code}
                      onChange={(e) => setNewAddress({...newAddress, postal_code: e.target.value})}
                      placeholder="411001"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg bg-primary/5">
                    <Truck className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery (COD)</h3>
                      <p className="text-sm text-gray-600">Pay when your order is delivered to your doorstep</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Currently, we only accept Cash on Delivery. Online payment options will be available soon.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>{formatCurrency(totals.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)}</span>
                    </div>
                    {totals.shipping === 0 && (
                      <p className="text-xs text-green-600">🎉 Free shipping on orders above ₹1000!</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(totals.total)}</span>
                  </div>

                  <Button 
                    onClick={handlePlaceOrder} 
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? 'Placing Order...' : `Place Order - ${formatCurrency(totals.total)}`}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    By placing your order, you agree to our terms and conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
