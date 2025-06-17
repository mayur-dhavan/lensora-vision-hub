-- Fix schema issues and add missing constraints
-- This migration ensures all foreign key constraints are properly set

-- Add missing foreign key constraint for addresses table
DO $$ 
BEGIN
  -- Check if the foreign key constraint exists, if not add it
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'addresses_user_id_fkey' 
    AND table_name = 'addresses'
  ) THEN
    ALTER TABLE public.addresses 
    ADD CONSTRAINT addresses_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.user_profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ensure user_profiles.id matches auth.users.id constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'user_profiles_id_fkey' 
    AND table_name = 'user_profiles'
  ) THEN
    ALTER TABLE public.user_profiles 
    ADD CONSTRAINT user_profiles_id_fkey 
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- Add email verification check
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;

-- Update existing users' email verification status based on auth.users
UPDATE public.user_profiles 
SET email_verified = (
  SELECT COALESCE(au.email_confirmed_at IS NOT NULL, false) 
  FROM auth.users au 
  WHERE au.id = user_profiles.id
);

-- Add trigger to automatically verify email when user confirms
CREATE OR REPLACE FUNCTION update_email_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE public.user_profiles 
    SET email_verified = true 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_email_confirmed'
  ) THEN
    CREATE TRIGGER on_auth_user_email_confirmed
      AFTER UPDATE ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION update_email_verification();
  END IF;
END $$;
