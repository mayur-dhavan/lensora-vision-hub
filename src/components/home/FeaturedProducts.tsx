
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";

// Featured products data - showcasing real eyewear
const products = [
  {
    id: "1",
    name: "Classic Aviator Prescription",
    price: 4500,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Prescription Glasses",
    description: "Timeless aviator frames with prescription lenses. Perfect blend of style and functionality.",
    stock: 25
  },
  {
    id: "2",
    name: "Ray-Ban Style Aviator Sunglasses",
    price: 3500,
    image: "https://images.unsplash.com/photo-1608539733412-77361e942bae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Sunglasses",
    description: "Classic aviator sunglasses with polarized lenses and 100% UV protection.",
    stock: 40
  },
  {
    id: "3",
    name: "Round Vintage Frames",
    price: 3200,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Prescription Glasses",
    description: "Vintage-inspired round frames made from premium acetate with comfortable fit.",
    stock: 18
  },
  {
    id: "4",
    name: "Cat-Eye Designer Sunglasses",
    price: 5500,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Sunglasses",
    description: "Elegant cat-eye sunglasses with designer details and gradient lenses.",
    stock: 15
  },
  {
    id: "5",
    name: "Computer Blue Light Glasses",
    price: 2200,
    image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Blue Light Glasses",
    description: "Stylish computer glasses with blue light filtering technology.",
    stock: 45
  },
  {
    id: "6",
    name: "Premium Reading Glasses +2.0",
    price: 1800,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Reading Glasses",
    description: "Premium reading glasses with blue light filtering and superior lens quality.",
    stock: 35
  }
];

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addToCart } = useCart();

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        toast({
          title: "Added to Wishlist",
          description: "Item has been added to your wishlist"
        });
        return [...prev, productId];
      }
    });
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Add the quantity property
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular eyewear picks, chosen for style, comfort and quality
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-md">
              <div className="relative group">
                <Link to={`/product/${product.id}`}>
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <button 
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                  />
                </button>
              </div>
              
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="font-medium text-lg mt-2">{formatCurrency(product.price)}</p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  onClick={() => handleAddToCart(product)} 
                  className="w-full"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
