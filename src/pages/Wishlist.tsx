import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ShoppingCart, Trash, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import { WishlistItem, Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

const Wishlist = () => {
  const { addToCart } = useCart();
  const { user } = useUser();
  const [wishlistItems, setWishlistItems] = useState<(WishlistItem & { product: Product })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          product:product_id (*)
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to load wishlist items",
          variant: "destructive"
        });
      } else {
        setWishlistItems(data as any);
      }
      setLoading(false);
    };

    fetchWishlistItems();
  }, [user]);

  const removeFromWishlist = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    } else {
      setWishlistItems((prev) => prev.filter(item => item.id !== id));
      toast({
        title: "Item Removed",
        description: "Item has been removed from your wishlist"
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || "https://via.placeholder.com/300x300"
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });
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

  if (wishlistItems.length === 0) {
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
              <BreadcrumbLink>Wishlist</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="mb-6">Start adding items to your wishlist while shopping.</p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

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
            <BreadcrumbLink>Wishlist</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b hidden md:grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <span className="font-medium">Product</span>
          </div>
          <div className="col-span-2 text-center">
            <span className="font-medium">Price</span>
          </div>
          <div className="col-span-4 text-right">
            <span className="font-medium">Actions</span>
          </div>
        </div>

        {wishlistItems.map((item) => (
          <div key={item.id} className="p-4 border-b last:border-0">
            <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
              {/* Product Info */}
              <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.product.images?.[0] || "https://via.placeholder.com/80x80"}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="ml-4">
                  <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500">{item.product.category}</p>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-2 text-gray-600 mb-4 md:mb-0 md:text-center">
                <span className="md:hidden font-medium text-gray-700 mr-2">Price:</span>
                {formatCurrency(item.product.price)}
              </div>

              {/* Actions */}
              <div className="md:col-span-4 md:text-right flex space-x-2 md:justify-end">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAddToCart(item.product)}
                  disabled={item.product.stock <= 0}
                >
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  {item.product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-gray-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default Wishlist;
