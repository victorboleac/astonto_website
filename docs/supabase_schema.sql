-- ====================================================================
-- ASTONTO Website — Supabase Database Schema
-- Run this script first in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ====================================================================

-- 1. Site Configuration Table
CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Pricing Tiers Table
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NULL,
  price_prefix TEXT DEFAULT '',
  price_label TEXT NOT NULL,
  monthly_option TEXT,
  billing_label TEXT NOT NULL,
  best_fit TEXT,
  description TEXT NOT NULL,
  included JSONB NOT NULL DEFAULT '[]'::jsonb,
  credit_policy TEXT,
  disclaimer TEXT,
  commercial_terms JSONB DEFAULT '[]'::jsonb,
  scope_boundaries JSONB DEFAULT '{}'::jsonb,
  cta_text TEXT NOT NULL,
  cta_href TEXT NOT NULL,
  highlighted BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Content Articles Table (Research, Resources, Industries, Comparisons)
CREATE TABLE IF NOT EXISTS content_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category_type TEXT NOT NULL CHECK (category_type IN ('research', 'resources', 'industries', 'comparisons')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  author TEXT DEFAULT 'ASTONTO Research Team',
  reviewer TEXT DEFAULT 'Victor Boleac',
  status TEXT DEFAULT 'published',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  modified_at TIMESTAMPTZ DEFAULT NOW(),
  reading_time TEXT DEFAULT '5 min read',
  methodology_version TEXT DEFAULT 'PULSE v1.0',
  reliability TEXT DEFAULT 'High' CHECK (reliability IN ('High', 'Medium', 'Indicative')),
  evidence_refs JSONB DEFAULT '[]'::jsonb,
  noindex BOOLEAN DEFAULT FALSE,
  category_label TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop any existing legacy status check constraint
ALTER TABLE content_articles DROP CONSTRAINT IF EXISTS content_articles_status_check;
ALTER TABLE content_articles ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Indices for Fast Queries
CREATE INDEX IF NOT EXISTS idx_articles_slug ON content_articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON content_articles(category_type);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);

-- Enable Row Level Security (RLS)
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access, restrict write access to authenticated users
DROP POLICY IF EXISTS "Allow all access on site_config" ON site_config;
DROP POLICY IF EXISTS "Allow all access on pricing_tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Allow all access on faqs" ON faqs;
DROP POLICY IF EXISTS "Allow all access on content_articles" ON content_articles;
DROP POLICY IF EXISTS "Allow public read access on site_config" ON site_config;
DROP POLICY IF EXISTS "Allow public read access on pricing_tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Allow public read access on faqs" ON faqs;
DROP POLICY IF EXISTS "Allow public read access on content_articles" ON content_articles;
DROP POLICY IF EXISTS "Allow authenticated write on site_config" ON site_config;
DROP POLICY IF EXISTS "Allow authenticated write on pricing_tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Allow authenticated write on faqs" ON faqs;
DROP POLICY IF EXISTS "Allow authenticated write on content_articles" ON content_articles;

-- 1. Public Read Policies
CREATE POLICY "Allow public read access on site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Allow public read access on pricing_tiers" ON pricing_tiers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on content_articles" ON content_articles FOR SELECT USING (true);

-- 2. Authenticated Write Policies (Insert, Update, Delete for logged in admins)
CREATE POLICY "Allow authenticated write on site_config" ON site_config FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write on pricing_tiers" ON pricing_tiers FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write on faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write on content_articles" ON content_articles FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 3. Storage Bucket Configuration for Article Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Article Images" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Storage Access" ON storage.objects;
CREATE POLICY "Public Read Article Images" ON storage.objects FOR SELECT USING (bucket_id = 'article-images');
CREATE POLICY "Allow All Storage Access" ON storage.objects FOR ALL USING (bucket_id = 'article-images') WITH CHECK (bucket_id = 'article-images');


