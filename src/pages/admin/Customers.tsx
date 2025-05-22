
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("role", "customer")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      {loading ? (
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-100 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No customers available</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Joined</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">
                        {customer.first_name} {customer.last_name}
                      </td>
                      <td className="p-4 text-gray-600">{customer.email}</td>
                      <td className="p-4">{customer.phone || "Not provided"}</td>
                      <td className="p-4">
                        {customer.created_at
                          ? formatDistanceToNow(new Date(customer.created_at), {
                              addSuffix: true,
                            })
                          : "Unknown"}
                      </td>
                      <td className="p-4">
                        <Link
                          to={`#view-customer-${customer.id}`}
                          className="text-primary hover:underline"
                        >
                          View Profile
                        </Link>
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

export default AdminCustomers;
