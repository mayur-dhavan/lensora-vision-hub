
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || "https://via.placeholder.com/300x300"
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleAddToWishlist = () => {
    // This will be implemented when we add wishlist functionality
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0] || "https://via.placeholder.com/300x300"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="pt-4 flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="text-gray-500 text-sm mt-1">{product.category}</div>
        <div className="mt-2 font-bold text-lg">{formatCurrency(product.price)}</div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full gap-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center"
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
