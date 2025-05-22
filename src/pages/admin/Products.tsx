
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { Edit, Trash2, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-lg bg-gray-100 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No products available</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Stock</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <img
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : "https://via.placeholder.com/50x50"
                          }
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="p-4 font-medium">{product.name}</td>
                      <td className="p-4 text-gray-600">{product.category}</td>
                      <td className="p-4">{formatCurrency(product.price)}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProducts;
