-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.addresses (
  user_id uuid NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'shipping'::text,
  country text NOT NULL DEFAULT 'India'::text,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT addresses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.appointments (
  appointment_type text DEFAULT 'eye_checkup'::text,
  duration integer DEFAULT 30,
  patient_name text,
  patient_age integer,
  contact_number text,
  symptoms text,
  user_id uuid,
  appointment_date timestamp with time zone NOT NULL,
  notes text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  status text DEFAULT 'scheduled'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.categories (
  name text NOT NULL UNIQUE,
  description text,
  image text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.order_items (
  order_id uuid,
  product_id uuid,
  quantity integer NOT NULL,
  price numeric NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.orders (
  tracking_id text,
  estimated_delivery_date date,
  courier_partner text,
  user_id uuid,
  total numeric NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_intent text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  status text DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.products (
  low_stock_threshold integer DEFAULT 5,
  sku text,
  weight numeric,
  dimensions jsonb,
  meta_title text,
  meta_description text,
  slug text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  stock integer NOT NULL DEFAULT 0,
  featured boolean DEFAULT false,
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reviews (
  product_id uuid,
  user_id uuid,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.testimonials (
  name text NOT NULL,
  role text,
  content text NOT NULL,
  avatar text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  phone text,
  address jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  role text DEFAULT 'customer'::text,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.wishlists (
  user_id uuid,
  product_id uuid,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT wishlists_pkey PRIMARY KEY (id),
  CONSTRAINT wishlists_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);