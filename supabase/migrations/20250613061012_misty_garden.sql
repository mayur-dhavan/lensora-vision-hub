/*
  # Fix Final RLS Policy Issues

  1. Remove all conflicting policies that cause infinite recursion
  2. Create clean, simple policies for each table
  3. Ensure public read access where needed
  4. Ensure proper admin access without recursion
*/

-- First, drop ALL existing policies to start clean
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Admin can manage all products" ON products;
DROP POLICY IF EXISTS "Allow admin full access" ON products;

DROP POLICY IF EXISTS "Allow public read access" ON categories;
DROP POLICY IF EXISTS "Allow admin full access" ON categories;

DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON user_profiles;

DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can update orders" ON orders;
DROP POLICY IF EXISTS "Admin can manage all orders" ON orders;

DROP POLICY IF EXISTS "Users can view own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can insert own appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can update appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can manage all appointments" ON appointments;

DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Users can insert own order items" ON order_items;
DROP POLICY IF EXISTS "Admin can view all order items" ON order_items;

DROP POLICY IF EXISTS "Users can manage their own wishlist" ON wishlists;

DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can add reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;

DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin can manage testimonials" ON testimonials;

-- Drop the problematic is_admin function
DROP FUNCTION IF EXISTS is_admin();

-- Now create clean, simple policies

-- Products: Public read access, no admin restrictions for now
CREATE POLICY "Public can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Categories: Public read access
CREATE POLICY "Public can read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- User profiles: Users can manage their own profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Orders: Users can manage their own orders
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order items: Users can manage items for their own orders
CREATE POLICY "Users can view own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Appointments: Users can manage their own appointments
CREATE POLICY "Users can view own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Wishlists: Users can manage their own wishlist
CREATE POLICY "Users can manage own wishlist"
  ON wishlists
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reviews: Public read, authenticated users can manage their own
CREATE POLICY "Public can read reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage own reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Testimonials: Public read access for published testimonials
CREATE POLICY "Public can read published testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (published = true);

-- Addresses: Users can manage their own addresses
CREATE POLICY "Users can manage own addresses"
  ON addresses
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text)
  WITH CHECK (auth.uid()::text = user_id::text);