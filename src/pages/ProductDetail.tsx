import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ShoppingCart, Heart, Star, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Handle the case where images might be a string or any other type
        const productData: Product = {
          ...data,
          images: Array.isArray(data.images) ? data.images : []
        };
        
        setProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setSelectedImage(productData.images[0]);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0] || "https://via.placeholder.com/300x300"
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      return newQuantity < 1 ? 1 : Math.min(newQuantity, product?.stock || 10);
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
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
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/shop/${product.category.toLowerCase()}`}>
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden aspect-square">
            <img
              src={selectedImage || product.images[0] || "https://via.placeholder.com/600x600"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnail images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`border rounded cursor-pointer aspect-square ${
                    selectedImage === image ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="h-5 w-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">(12 reviews)</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold mb-4 text-primary">
            {formatCurrency(product.price)}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-6">
            <p>{product.description}</p>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
            >
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
