-- ==============================================================================
-- MDS FRESH PRODUCE — SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. STORES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'Vegetables', 'Fruits', 'Vegetables & Fruits'
    location TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    alt_phone TEXT,
    whatsapp TEXT,
    map_url TEXT,
    opening_hours TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast store lookups
CREATE INDEX IF NOT EXISTS idx_stores_slug ON public.stores(slug);
CREATE INDEX IF NOT EXISTS idx_stores_active ON public.stores(is_active);

-- ------------------------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Leafy Vegetables', 'Seasonal Fruits', etc.
    type TEXT NOT NULL CHECK (type IN ('vegetable', 'fruit')),
    description TEXT,
    price NUMERIC DEFAULT NULL, -- NULL if unlisted, NEVER force 0
    unit TEXT DEFAULT 'kg', -- 'kg', 'bundle', 'piece', 'box'
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_type_available ON public.products(type, is_available);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_store ON public.products(store_id);

-- ------------------------------------------------------------------------------
-- 3. ENQUIRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    business_name TEXT,
    phone TEXT NOT NULL,
    location TEXT,
    store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL,
    enquiry_type TEXT NOT NULL DEFAULT 'general' CHECK (enquiry_type IN ('retail', 'wholesale', 'general')),
    product_requirement TEXT,
    quantity TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON public.enquiries(enquiry_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- ------------------------------------------------------------------------------
-- 4. GALLERY TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'All', -- 'Vegetables', 'Fruits', 'Stores', 'Wholesale', 'Daily Operations'
    store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_active ON public.gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);

-- ------------------------------------------------------------------------------
-- 5. BUSINESS SETTINGS TABLE (Key-Value)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_business_settings_key ON public.business_settings(key);

-- ------------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Stores: Public can read active stores, Authenticated admin has full access
CREATE POLICY "Allow public read on active stores"
    ON public.stores FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin full management of stores"
    ON public.stores FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Products: Public can read available products, Authenticated admin has full access
CREATE POLICY "Allow public read on available products"
    ON public.products FOR SELECT
    USING (is_available = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin full management of products"
    ON public.products FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Enquiries: Public can INSERT enquiries only. Authenticated admin can SELECT, UPDATE, DELETE
CREATE POLICY "Allow public to insert enquiries"
    ON public.enquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admin to manage enquiries"
    ON public.enquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Gallery: Public can read active gallery items, Authenticated admin has full access
CREATE POLICY "Allow public read on active gallery items"
    ON public.gallery FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin full management of gallery"
    ON public.gallery FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Business Settings: Public can read, Authenticated admin can modify
CREATE POLICY "Allow public read on business settings"
    ON public.business_settings FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated admin full management of settings"
    ON public.business_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 7. SUPABASE STORAGE BUCKET CONFIGURATION
-- ------------------------------------------------------------------------------
-- Note: Insert storage bucket row if storage schema is available
INSERT INTO storage.buckets (id, name, public)
VALUES ('mds-images', 'mds-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to mds-images bucket
CREATE POLICY "Public Access to mds-images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'mds-images');

-- Authenticated admin upload/manage access to mds-images
CREATE POLICY "Admin Upload Access to mds-images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'mds-images');

CREATE POLICY "Admin Update/Delete Access to mds-images"
    ON storage.objects FOR ALL
    TO authenticated
    USING (bucket_id = 'mds-images')
    WITH CHECK (bucket_id = 'mds-images');

-- ------------------------------------------------------------------------------
-- 8. INITIAL STORE SEED DATA (Authentic, No Fabrications)
-- ------------------------------------------------------------------------------
INSERT INTO public.stores (slug, name, type, location, description, phone, alt_phone, whatsapp, opening_hours, is_active)
VALUES
    (
        'thuckalay-market',
        'MDS Vegetable Shop',
        'Vegetables',
        'Thuckalay Market',
        'Fresh vegetables for everyday household customers and bulk commercial requirements.',
        '+91 94889 37666',
        '+91 94433 91966',
        '919488937666',
        'https://maps.app.goo.gl/K6yDcq6st2rwRyWB7',
        '6:30 AM – 10:00 PM',
        true
    ),
    (
        'nagercoil-market',
        'MDS Vegetable Shop',
        'Vegetables',
        'Nagercoil Market',
        'Vegetable supply for households, grocery shops and commercial buyers across the region.',
        'Vegetable Market Nagercoil, Puthukudierupu, Nagercoil, Tamil Nadu 629001',
        '+91 94889 37666',
        '+91 94433 91966',
        '919488937666',
        'https://www.google.com/maps/place/Vegetable+Market+Nagercoil,+Puthukudierupu,+Nagercoil,+Tamil+Nadu+629001/@8.1915724,77.4288807,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f12ebe3a1951:0x70f5796f8d6e1c36!8m2!3d8.1915307!4d77.4316496!16s%2Fg%2F11b8t8szy7',
        '7:00 AM – 10:00 PM',
        true
    ),
    (
        'thuckalay-fruits',
        'MDS Fruit Shop',
        'Fruits',
        'Near Thuckalay Bus Stand',
        'Fresh fruit selection for everyday customers, special occasions, and business requirements.',
        '+91 94889 37666',
        '+91 94433 91966',
        '919488937666',
        'https://maps.app.goo.gl/1KTzmb3CX7FNMCbZ7',
        '6:30 AM – 9:30 PM',
        true
    )
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    location = EXCLUDED.location,
    phone = EXCLUDED.phone,
    alt_phone = EXCLUDED.alt_phone,
    whatsapp = EXCLUDED.whatsapp,
    map_url = EXCLUDED.map_url,
    opening_hours = EXCLUDED.opening_hours;

-- Initial Business Settings
INSERT INTO public.business_settings (key, value)
VALUES
    ('business_name', 'MDS'),
    ('tagline', 'Fresh Produce • Since Nearly 50 Years'),
    ('experience', 'Nearly 50 Years of Freshness & Trust'),
    ('general_phone', '+91 94889 37666'),
    ('general_whatsapp', '919488937666'),
    ('optional_phone', '+91 94433 91966'),
    ('general_email', 'contact@mdsfresh.example'),
    ('general_address', 'Thuckalay & Nagercoil Markets, Kanyakumari District'),
    ('business_hours', 'Daily early morning to late evening')
ON CONFLICT (key) DO NOTHING;
