
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

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
            <BreadcrumbLink>Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b hidden md:grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <span className="font-medium">Product</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium">Price</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium">Quantity</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-medium">Subtotal</span>
              </div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="p-4 border-b last:border-0">
                <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/80x80"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4">
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-primary">
                        {item.name}
                      </Link>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-gray-600 mb-2 md:mb-0 md:text-center">
                    <span className="md:hidden font-medium text-gray-700 mr-2">Price:</span>
                    {formatCurrency(item.price)}
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 mb-2 md:mb-0 md:flex md:justify-center">
                    <span className="md:hidden font-medium text-gray-700 mr-2">Quantity:</span>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-2 font-medium md:text-right flex justify-between items-center md:block">
                    <span className="md:hidden font-medium text-gray-700">Subtotal:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{formatCurrency(item.price * item.quantity)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 bg-gray-50 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>

            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
