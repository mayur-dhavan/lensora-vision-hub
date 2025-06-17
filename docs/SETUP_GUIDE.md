# LensHub Authentication & Admin Setup Guide

## Issues Fixed

### 1. Authentication Callback Handling
- ✅ Created dedicated `/auth/callback` route
- ✅ Added `AuthCallback` component to handle OAuth redirects
- ✅ Fixed Google sign-in redirect URL configuration
- ✅ Improved error handling for authentication flows

### 2. Admin User Setup
- ✅ Created `/admin-setup` page for making users admin
- ✅ Added SQL script for manual admin creation
- ✅ Fixed admin role checking and permissions

### 3. Database Schema Improvements
- ✅ Added proper foreign key constraints
- ✅ Added performance indexes
- ✅ Fixed email verification tracking
- ✅ Added cascading deletes for data integrity

### 4. Error Handling Improvements
- ✅ Better checkout error handling with rollback
- ✅ Improved TypeScript types for auth functions
- ✅ Added proper loading states and user feedback

## Setup Instructions

### 1. Configure Supabase Auth Settings

In your Supabase dashboard, go to Authentication > Settings and add these redirect URLs:

**For Development:**
```
http://localhost:8080/auth/callback
```

**For Production:**
```
https://your-domain.com/auth/callback
```

### 2. Run Database Migrations

Apply the schema fixes by running this SQL in your Supabase SQL editor:

```sql
-- Run the migration file
-- File: supabase/migrations/20250617000001_fix_schema_issues.sql
```

### 3. Create Your First Admin User

**Option A: Using the Admin Setup Page**
1. Register a user account normally
2. Visit `http://localhost:8080/admin-setup`
3. Enter the user's email to grant admin access

**Option B: Using SQL (Recommended for first admin)**
1. Register a user account normally
2. Run this SQL in Supabase SQL editor:
```sql
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://xovhsekglutordhgsggs.supabase.co/auth/v1/callback`
6. Copy the Client ID and Client Secret to Supabase Auth settings

### 5. Test Authentication

1. Try email/password registration
2. Try Google OAuth login
3. Verify user profiles are created automatically
4. Test admin dashboard access

## Common Issues & Solutions

### Google Login Not Working
- Check redirect URLs in both Google Console and Supabase
- Ensure the callback route is properly configured
- Verify OAuth credentials are correctly set in Supabase

### Admin Dashboard Access Denied
- Ensure user role is set to 'admin' in user_profiles table
- User needs to sign out and back in after role change
- Check that admin policies are working in Supabase

### Order Placement Fails
- Ensure user has at least one address
- Check that all foreign key constraints are satisfied
- Verify cart items are valid products

## File Changes Made

### New Files Created:
- `src/pages/AuthCallback.tsx` - Handles OAuth redirects
- `src/pages/AdminSetup.tsx` - Admin user management
- `docs/create-admin-user.sql` - Manual admin creation script
- `supabase/migrations/20250617000001_fix_schema_issues.sql` - Schema fixes

### Modified Files:
- `src/App.tsx` - Added new routes
- `src/contexts/AuthContext.tsx` - Fixed callback URL and types
- `src/pages/Checkout.tsx` - Improved error handling

## Next Steps

1. Test all authentication flows thoroughly
2. Create product categories and sample products
3. Test the complete checkout and order management flow
4. Set up email templates for order confirmations
5. Configure payment processing (if moving beyond COD)

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase logs for database errors
3. Ensure all environment variables are correctly set
4. Verify your Supabase project permissions and RLS policies
