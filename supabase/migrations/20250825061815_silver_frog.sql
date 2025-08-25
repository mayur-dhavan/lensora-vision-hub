/*
  # Add Sample Eyewear Products

  1. New Data
    - Sample categories (Prescription Glasses, Sunglasses, Reading Glasses, Contact Lenses)
    - Sample products with real eyewear data
    - Proper product images and descriptions
  
  2. Data Structure
    - Categories with descriptions and images
    - Products with multiple images, proper pricing, and stock levels
    - SEO-friendly slugs and metadata
*/

-- Insert categories
INSERT INTO categories (name, description, image) VALUES
('Prescription Glasses', 'Stylish prescription eyewear for clear vision and modern style', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Sunglasses', 'Premium sunglasses with UV protection for style and eye safety', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Reading Glasses', 'Comfortable reading glasses for enhanced near vision', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Contact Lenses', 'High-quality contact lenses for clear, comfortable vision', 'https://images.unsplash.com/photo-1587258695597-5065ce5c1c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Blue Light Glasses', 'Computer glasses with blue light filtering technology', 'https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category, images, stock, featured, sku, meta_title, meta_description, slug) VALUES
-- Prescription Glasses
('Classic Aviator Prescription', 'Timeless aviator frames with prescription lenses. Perfect blend of style and functionality with lightweight titanium construction.', 4500, 'Prescription Glasses', '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 25, true, 'AVT-001', 'Classic Aviator Prescription Glasses - Lenshub', 'Premium aviator prescription glasses with titanium frames', 'classic-aviator-prescription'),

('Round Vintage Frames', 'Vintage-inspired round frames made from premium acetate. Comfortable nose pads and adjustable temples for perfect fit.', 3200, 'Prescription Glasses', '["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 18, true, 'RVF-002', 'Round Vintage Prescription Frames - Lenshub', 'Stylish round vintage prescription frames in premium acetate', 'round-vintage-frames'),

('Modern Rectangle Frames', 'Contemporary rectangular frames perfect for professional settings. Durable construction with spring hinges.', 2800, 'Prescription Glasses', '["https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 30, false, 'MRF-003', 'Modern Rectangle Prescription Frames - Lenshub', 'Professional rectangular prescription frames with spring hinges', 'modern-rectangle-frames'),

-- Sunglasses
('Ray-Ban Style Aviator Sunglasses', 'Classic aviator sunglasses with polarized lenses and 100% UV protection. Metal frame with comfortable nose pads.', 3500, 'Sunglasses', '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1608539733412-77361e942bae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 40, true, 'RBA-004', 'Ray-Ban Style Aviator Sunglasses - Lenshub', 'Premium aviator sunglasses with polarized lenses and UV protection', 'rayban-style-aviator-sunglasses'),

('Wayfarer Classic Sunglasses', 'Iconic wayfarer design with gradient lenses. Perfect for everyday wear with timeless appeal.', 2900, 'Sunglasses', '["https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 35, true, 'WFC-005', 'Wayfarer Classic Sunglasses - Lenshub', 'Iconic wayfarer sunglasses with gradient lenses', 'wayfarer-classic-sunglasses'),

('Sport Wrap Sunglasses', 'High-performance sports sunglasses with impact-resistant lenses. Perfect for outdoor activities and sports.', 4200, 'Sunglasses', '["https://images.unsplash.com/photo-1608539733412-77361e942bae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 22, false, 'SWS-006', 'Sport Wrap Sunglasses - Lenshub', 'High-performance sports sunglasses with impact-resistant lenses', 'sport-wrap-sunglasses'),

('Cat-Eye Designer Sunglasses', 'Elegant cat-eye sunglasses with designer details. Premium acetate construction with gradient lenses.', 5500, 'Sunglasses', '["https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 15, true, 'CED-007', 'Cat-Eye Designer Sunglasses - Lenshub', 'Elegant cat-eye designer sunglasses with premium acetate construction', 'cat-eye-designer-sunglasses'),

-- Reading Glasses
('Comfort Reading Glasses +1.5', 'Lightweight reading glasses with anti-reflective coating. Perfect for comfortable reading sessions.', 1200, 'Reading Glasses', '["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 50, false, 'CRG-008', 'Comfort Reading Glasses +1.5 - Lenshub', 'Lightweight reading glasses with anti-reflective coating', 'comfort-reading-glasses-1-5'),

('Premium Reading Glasses +2.0', 'Premium reading glasses with blue light filtering. Stylish frames with superior lens quality.', 1800, 'Reading Glasses', '["https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 35, true, 'PRG-009', 'Premium Reading Glasses +2.0 - Lenshub', 'Premium reading glasses with blue light filtering technology', 'premium-reading-glasses-2-0'),

-- Contact Lenses
('Daily Disposable Contact Lenses', 'Comfortable daily disposable contact lenses. 30 lenses per box with excellent moisture retention.', 800, 'Contact Lenses', '["https://images.unsplash.com/photo-1587258695597-5065ce5c1c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 100, true, 'DDC-010', 'Daily Disposable Contact Lenses - Lenshub', 'Comfortable daily disposable contact lenses with moisture retention', 'daily-disposable-contact-lenses'),

('Monthly Contact Lenses', 'High-quality monthly contact lenses with superior comfort. 6 lenses per box with excellent oxygen permeability.', 1500, 'Contact Lenses', '["https://images.unsplash.com/photo-1587258695597-5065ce5c1c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 75, false, 'MCL-011', 'Monthly Contact Lenses - Lenshub', 'High-quality monthly contact lenses with superior comfort', 'monthly-contact-lenses'),

-- Blue Light Glasses
('Computer Blue Light Glasses', 'Stylish computer glasses with blue light filtering technology. Reduces eye strain from digital screens.', 2200, 'Blue Light Glasses', '["https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 45, true, 'CBL-012', 'Computer Blue Light Glasses - Lenshub', 'Stylish computer glasses with blue light filtering technology', 'computer-blue-light-glasses'),

('Gaming Blue Light Glasses', 'Specialized gaming glasses with enhanced blue light protection. Designed for extended screen time and gaming sessions.', 2800, 'Blue Light Glasses', '["https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 28, false, 'GBL-013', 'Gaming Blue Light Glasses - Lenshub', 'Specialized gaming glasses with enhanced blue light protection', 'gaming-blue-light-glasses');