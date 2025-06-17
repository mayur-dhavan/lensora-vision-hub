-- Create the first admin user
-- Run this script in your Supabase SQL editor after a user has registered

-- Replace 'your-email@example.com' with the actual email of the user you want to make admin
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Verify the admin user was created
SELECT id, email, role, first_name, last_name 
FROM public.user_profiles 
WHERE role = 'admin';
