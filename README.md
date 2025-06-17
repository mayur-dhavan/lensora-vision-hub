# LensHub - Complete Eyewear E-commerce Solution

## 🎉 Authentication Issues FIXED!

### ✅ Issues Resolved:
1. **OAuth Callback Handling**: Added dedicated `/auth/callback` route with proper session handling
2. **Google Sign-In Configuration**: Fixed redirect URL to use specific callback endpoint
3. **Admin User Setup**: Created `/admin-setup` page for easy admin user creation
4. **TypeScript Errors**: Removed all `any` types and added proper typing
5. **Auth Context Improvements**: Enhanced error handling and user profile creation

## Overview
LensHub is a modern, full-featured eyewear e-commerce application built with React, TypeScript, and Supabase. It includes customer-facing features, admin dashboard, appointment booking, and complete order management.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ or Bun
- Supabase account
- Google OAuth credentials (for Google Sign-In)

### 1. Clone and Install
```powershell
cd d:\Projects\LensHub\lensora-vision-hub
bun install
```

### 2. Supabase Configuration

#### OAuth Setup:
1. Go to Supabase Dashboard → Authentication → Settings
2. Add these URLs to "Additional Redirect URLs":
   - `http://localhost:8080/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)

#### Google OAuth:
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs in Google Console:
   - `https://xovhsekglutordhgsggs.supabase.co/auth/v1/callback`
4. Add Google OAuth credentials in Supabase:
   - Dashboard → Authentication → Settings → Auth Providers → Google
   - Enable Google provider and add Client ID & Secret

### 3. Create First Admin User
1. Start the application: `bun run dev`
2. Register a new user account
3. Visit `/admin-setup` page
4. Enter the email of the user you want to make admin
5. Click "Make Admin"

### 4. Run the Application
```powershell
bun run dev
```

Visit `http://localhost:8080`

## 📱 Features

### Customer Features:
- ✅ User registration/login with email or Google
- ✅ Product browsing with categories and search
- ✅ Shopping cart and wishlist
- ✅ Address management
- ✅ Order tracking
- ✅ Eye test appointment booking
- ✅ User profile management

### Admin Features:
- ✅ Product management
- ✅ Order management
- ✅ Appointment management
- ✅ Customer management
- ✅ Category management
- ✅ Inventory tracking
- ✅ Admin dashboard with statistics

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4f94d6e8-340a-46b2-9020-a773807363d4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
