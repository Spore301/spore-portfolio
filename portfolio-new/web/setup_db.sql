-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_role TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    visible BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content_md TEXT NOT NULL,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    content_blocks JSONB DEFAULT '[]'::jsonb
);

-- Homepage Sections Table
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g. 'hero', 'projects', 'testimonials', 'experience', 'blogs'
    visible BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add sample homepage sections to start with
INSERT INTO public.homepage_sections (name, type, display_order, visible) VALUES
('Hero', 'hero', 1, true),
('Experience', 'experience', 2, true),
('Testimonials', 'testimonials', 3, true),
('Selected Works', 'projects', 4, true),
('Blogs', 'blogs', 5, false)
ON CONFLICT DO NOTHING;

-- RLS Policies
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read-only access to testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to homepage_sections" ON public.homepage_sections FOR SELECT USING (true);

-- Allow full access to authenticated users (admins)
CREATE POLICY "Allow full access for authenticated users (testimonials)" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access for authenticated users (blogs)" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access for authenticated users (homepage_sections)" ON public.homepage_sections FOR ALL USING (auth.role() = 'authenticated');
