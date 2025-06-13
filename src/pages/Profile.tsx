import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, User, Package, Calendar, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { UserProfile, Order, Appointment } from "@/types";
import AddressList from "@/components/address/AddressList";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching user data for:", user.id);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          // If profile doesn't exist, create one
          if (profileError.code === 'PGRST116') {
            const { data: newProfile, error: createError } = await supabase
              .from('user_profiles')
              .insert({
                id: user.id,
                email: user.email!,
                first_name: user.user_metadata?.first_name || '',
                last_name: user.user_metadata?.last_name || '',
                role: 'customer'
              })
              .select()
              .single();

            if (createError) {
              console.error('Error creating profile:', createError);
            } else {
              setProfile(newProfile as UserProfile);
            }
          }
        } else if (profileData) {
          console.log("Profile data:", profileData);
          setProfile(profileData as UserProfile);
        }

        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        } else {
          console.log("Orders data:", ordersData);
          setOrders(ordersData as Order[]);
        }

        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
          .order('appointment_date', { ascending: false });

        if (appointmentsError) {
          console.error('Error fetching appointments:', appointmentsError);
        } else {
          console.log("Appointments data:", appointmentsData);
          setAppointments(appointmentsData as Appointment[]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="mb-6">You need to be signed in to view your profile.</p>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
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
            <BreadcrumbLink>My Account</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <User className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold">My Account</h2>
              </div>
              <div className="flex flex-col space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Information
                </Button>
                <Button
                  variant={activeTab === "addresses" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveTab("addresses")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  My Addresses
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  Order History
                </Button>
                <Button
                  variant={activeTab === "appointments" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveTab("appointments")}
                >
                  Appointments
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                >
                  <Link to="/wishlist" className="w-full h-full block text-left">
                    <Heart className="w-4 h-4 mr-2 inline" />
                    Wishlist
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                >
                  <Link to="/shop" className="w-full h-full block text-left">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-500 uppercase text-sm">Full Name</div>
                    <div className="font-medium text-lg">
                      {profile?.first_name || user.user_metadata?.first_name || ''} {profile?.last_name || user.user_metadata?.last_name || ''}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 uppercase text-sm">Email Address</div>
                    <div className="font-medium text-lg">{user.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 uppercase text-sm">Phone Number</div>
                    <div className="font-medium text-lg">{profile?.phone || user.phone || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 uppercase text-sm">Account Type</div>
                    <div className="font-medium text-lg capitalize">{profile?.role || 'customer'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 uppercase text-sm">Member Since</div>
                    <div className="font-medium text-lg">
                      {user.created_at ? formatDate(user.created_at) : 'N/A'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "addresses" && <AddressList />}

          {activeTab === "orders" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Order History</h2>
                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Order Number
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-5 py-5 border-b text-sm">
                              #{order.id.slice(0, 8)}
                            </td>
                            <td className="px-5 py-5 border-b text-sm">
                              {order.created_at ? formatDate(order.created_at) : 'N/A'}
                            </td>
                            <td className="px-5 py-5 border-b text-sm">
                              {formatCurrency(order.total)}
                            </td>
                            <td className="px-5 py-5 border-b text-sm">
                              <span className="capitalize">{order.status}</span>
                            </td>
                            <td className="px-5 py-5 border-b text-sm">
                              <Button asChild variant="outline" size="sm">
                                <Link to={`/order/${order.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Package className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-gray-500">No orders found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "appointments" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
                {appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Service Type
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="px-5 py-5 border-b text-sm">
                              {formatDate(appointment.appointment_date)}
                            </td>
                            <td className="px-5 py-5 border-b text-sm capitalize">
                              {appointment.appointment_type?.replace('_', ' ')}
                            </td>
                            <td className="px-5 py-5 border-b text-sm">
                              {appointment.duration} mins
                            </td>
                            <td className="px-5 py-5 border-b text-sm">
                              <span className="capitalize">{appointment.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-gray-500">No appointments found.</p>
                    <Button asChild className="mt-4">
                      <Link to="/eye-test">Book an Appointment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;