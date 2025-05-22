import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Search } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { Product, Category } from "@/types";

const Shop = () => {
  const { category: categoryParam } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      
      if (data) {
        setCategories(data);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      let query = supabase.from("products").select("*");
      
      if (categoryParam) {
        query = query.eq("category", categoryParam);
      }
      
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }
      
      if (data) {
        // Process each product to ensure the images field is an array
        const processedProducts: Product[] = data.map(item => ({
          ...item,
          images: Array.isArray(item.images) ? item.images : []
        }));
        
        setProducts(processedProducts);
      }
      
      setLoading(false);
    };
    
    fetchProducts();
  }, [categoryParam, searchQuery]);

  const getCategoryName = () => {
    if (!categoryParam) return "All Products";
    return categories.find(cat => cat.name.toLowerCase() === categoryParam.toLowerCase())?.name || categoryParam;
  };

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
          {categoryParam && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{getCategoryName()}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">{getCategoryName()}</h1>
        
        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link to="/shop">
          <Badge variant={!categoryParam ? "default" : "outline"} className="cursor-pointer px-4 py-2">
            All
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link to={`/shop/${category.name.toLowerCase()}`} key={category.id}>
            <Badge 
              variant={categoryParam === category.name.toLowerCase() ? "default" : "outline"} 
              className="cursor-pointer px-4 py-2"
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
          <Button onClick={() => setSearchQuery("")}>Clear filters</Button>
        </div>
      )}
    </div>
  );
};

export default Shop;
