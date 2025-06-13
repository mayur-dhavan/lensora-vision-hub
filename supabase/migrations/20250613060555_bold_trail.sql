/*
  # Fix RLS Policy Infinite Recursion

  1. Problem
    - Multiple policies on various tables are causing infinite recursion
    - Both `is_admin()` function calls and direct user_profiles queries exist
    - This creates circular dependencies when fetching data

  2. Solution
    - Remove duplicate policies that cause conflicts
    - Standardize on direct user_profiles queries instead of is_admin() function
    - Ensure clean, non-recursive policy structure

  3. Tables Updated
    - products: Remove duplicate admin policies
    - orders: Remove duplicate admin policies  
    - appointments: Remove duplicate admin policies
    - categories: Keep existing policies (they look clean)
    - user_profiles: Keep existing policies (they are the base)
*/

-- Drop problematic policies that use is_admin() function to avoid recursion

-- Products table - remove is_admin() policy, keep the direct user_profiles query
DROP POLICY IF EXISTS "Admins can manage all products" ON products;

-- Orders table - remove is_admin() policy, keep the direct user_profiles query  
DROP POLICY IF EXISTS "Admins can manage all orders" ON orders;

-- Appointments table - remove is_admin() policy, keep the direct user_profiles query
DROP POLICY IF EXISTS "Admins can manage all appointments" ON appointments;

-- Ensure we have clean, non-recursive policies for admin access
-- These policies use direct queries to user_profiles without function calls

-- Products: Admin access policy (using direct query)
CREATE POLICY "Admin can manage all products"
  ON products
  FOR ALL
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

-- Orders: Admin access policy (using direct query)  
CREATE POLICY "Admin can manage all orders"
  ON orders
  FOR ALL
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

-- Appointments: Admin access policy (using direct query)
CREATE POLICY "Admin can manage all appointments" 
  ON appointments
  FOR ALL
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );