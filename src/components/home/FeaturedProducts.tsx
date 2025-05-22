
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

// We'll need a simplified version without the useCart hook for now
// Mock featured products data
const mockProducts = [
  {
    id: "1",
    name: "Avant-Garde Round",
    price: 129,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    category: "sunglasses",
    description: "Classic round frames with a modern twist, perfect for everyday wear.",
    stock: 15
  },
  {
    id: "2",
    name: "Crystal Aviator",
    price: 149,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    category: "sunglasses",
    description: "Iconic aviator shape with crystal clear lenses and gold-tone frames.",
    stock: 8
  },
  {
    id: "3",
    name: "Modern Rectangle",
    price: 169,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    category: "prescription",
    description: "Contemporary rectangular frames with spring hinges for extra comfort.",
    stock: 12
  },
  {
    id: "4",
    name: "Retro Clubmaster",
    price: 159,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    category: "sunglasses",
    description: "Vintage-inspired browline frames with polarized lenses for maximum UV protection.",
    stock: 7
  }
];

// Simple ProductCard component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 product-card-shadow group">
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-navy-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
        <div className="font-semibold">${product.price}</div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // In a real app, we would fetch from an API
    setProducts(mockProducts);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular styles and bestsellers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button className="bg-navy-800 hover:bg-navy-700">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
