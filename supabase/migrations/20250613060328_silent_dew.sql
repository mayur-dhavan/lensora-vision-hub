/*
  # Fix infinite recursion in RLS policies

  1. Security Functions
    - Create `is_admin()` function with SECURITY DEFINER to bypass RLS
    - This prevents infinite recursion when checking admin status

  2. Policy Updates
    - Update admin policies for products, orders, and appointments
    - Replace direct user_profiles queries with is_admin() function calls

  3. Changes Made
    - Modified existing admin policies to use the new function
    - Ensures RLS policies don't create circular dependencies
*/

-- Create a security definer function to check admin status
-- This bypasses RLS on user_profiles table to prevent infinite recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Drop existing admin policies that cause recursion
DROP POLICY IF EXISTS "Admins can manage all products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;

-- Recreate admin policies using the is_admin() function
CREATE POLICY "Admins can manage all products"
  ON public.products
  FOR ALL
  USING (is_admin());

CREATE POLICY "Admins can manage all orders"
  ON public.orders
  FOR ALL
  USING (is_admin());

CREATE POLICY "Admins can manage all appointments"
  ON public.appointments
  FOR ALL
  USING (is_admin());