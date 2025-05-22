
// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[] | any; // Handle both string[] and Json from Supabase
  stock: number;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
}

// Cart related types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// User related types
export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: Address | any; // Handle both Address and Json from Supabase
  role: 'customer' | 'admin' | string; // Allow string to handle any value from DB
  created_at?: string;
  updated_at?: string;
}

// Order related types
export interface OrderItem {
  id: string;
  product_id: string;
  order_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string; // Allow string to handle any value from DB
  total: number;
  shipping_address: Address | any; // Handle both Address and Json from Supabase
  payment_intent?: string;
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

// Appointment related types
export interface Appointment {
  id: string;
  user_id: string;
  appointment_date: string;
  status: 'scheduled' | 'completed' | 'cancelled' | string; // Allow string to handle any value from DB
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Review related types
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at?: string;
  user_profile?: {
    first_name?: string;
    last_name?: string;
  };
}

// Wishlist related types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at?: string;
}
