-- CareerRater Database Schema Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/kbbtyctwffzmfdzjyac/sql

-- =====================================================
-- STEP 1: Create Companies Table
-- =====================================================

CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  logo TEXT,
  industry TEXT,
  location TEXT,
  employees TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_verified BOOLEAN DEFAULT FALSE
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_domain ON companies(domain);
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);
CREATE INDEX IF NOT EXISTS idx_companies_location ON companies(location);

-- =====================================================
-- STEP 2: Create Reviews Table
-- =====================================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Overall rating
  overall_rating DECIMAL(2,1) CHECK (overall_rating >= 0 AND overall_rating <= 5) NOT NULL,
  
  -- Category ratings
  work_life_balance DECIMAL(2,1) CHECK (work_life_balance >= 0 AND work_life_balance <= 5),
  compensation DECIMAL(2,1) CHECK (compensation >= 0 AND compensation <= 5),
  management DECIMAL(2,1) CHECK (management >= 0 AND management <= 5),
  career_growth DECIMAL(2,1) CHECK (career_growth >= 0 AND career_growth <= 5),
  culture DECIMAL(2,1) CHECK (culture >= 0 AND culture <= 5),
  
  -- Review content
  title TEXT,
  pros TEXT,
  cons TEXT,
  advice_to_management TEXT,
  
  -- Metadata
  job_title TEXT,
  employment_status TEXT CHECK (employment_status IN ('current', 'former')),
  years_worked TEXT,
  
  -- Anonymous tracking (we don't expose user_id to frontend)
  is_anonymous BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_reviews_company ON reviews(company_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- =====================================================
-- STEP 3: Create Company Stats Table
-- =====================================================

CREATE TABLE IF NOT EXISTS company_stats (
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE PRIMARY KEY,
  total_reviews INT DEFAULT 0,
  average_rating DECIMAL(2,1) DEFAULT 0,
  avg_work_life_balance DECIMAL(2,1) DEFAULT 0,
  avg_compensation DECIMAL(2,1) DEFAULT 0,
  avg_management DECIMAL(2,1) DEFAULT 0,
  avg_career_growth DECIMAL(2,1) DEFAULT 0,
  avg_culture DECIMAL(2,1) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- STEP 4: Create Function to Update Company Stats
-- =====================================================

CREATE OR REPLACE FUNCTION update_company_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Recalculate stats for the affected company
  INSERT INTO company_stats (
    company_id,
    total_reviews,
    average_rating,
    avg_work_life_balance,
    avg_compensation,
    avg_management,
    avg_career_growth,
    avg_culture,
    updated_at
  )
  SELECT 
    company_id,
    COUNT(*)::INT as total_reviews,
    ROUND(AVG(overall_rating), 1) as average_rating,
    ROUND(AVG(work_life_balance), 1) as avg_work_life_balance,
    ROUND(AVG(compensation), 1) as avg_compensation,
    ROUND(AVG(management), 1) as avg_management,
    ROUND(AVG(career_growth), 1) as avg_career_growth,
    ROUND(AVG(culture), 1) as avg_culture,
    NOW() as updated_at
  FROM reviews
  WHERE company_id = COALESCE(NEW.company_id, OLD.company_id)
  GROUP BY company_id
  ON CONFLICT (company_id) 
  DO UPDATE SET
    total_reviews = EXCLUDED.total_reviews,
    average_rating = EXCLUDED.average_rating,
    avg_work_life_balance = EXCLUDED.avg_work_life_balance,
    avg_compensation = EXCLUDED.avg_compensation,
    avg_management = EXCLUDED.avg_management,
    avg_career_growth = EXCLUDED.avg_career_growth,
    avg_culture = EXCLUDED.avg_culture,
    updated_at = NOW();
    
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 5: Create Triggers
-- =====================================================

DROP TRIGGER IF EXISTS update_stats_on_insert ON reviews;
CREATE TRIGGER update_stats_on_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();

DROP TRIGGER IF EXISTS update_stats_on_update ON reviews;
CREATE TRIGGER update_stats_on_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();

DROP TRIGGER IF EXISTS update_stats_on_delete ON reviews;
CREATE TRIGGER update_stats_on_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();

-- =====================================================
-- STEP 6: Enable Row Level Security (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 7: Create RLS Policies for Companies
-- =====================================================

-- Anyone can view companies
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
CREATE POLICY "Companies are viewable by everyone"
  ON companies FOR SELECT
  USING (true);

-- Authenticated users can add companies
DROP POLICY IF EXISTS "Authenticated users can add companies" ON companies;
CREATE POLICY "Authenticated users can add companies"
  ON companies FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update companies they added
DROP POLICY IF EXISTS "Users can update their own companies" ON companies;
CREATE POLICY "Users can update their own companies"
  ON companies FOR UPDATE
  USING (auth.uid() = added_by);

-- =====================================================
-- STEP 8: Create RLS Policies for Reviews
-- =====================================================

-- Anyone can view reviews (anonymously)
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Authenticated users can write reviews
DROP POLICY IF EXISTS "Authenticated users can write reviews" ON reviews;
CREATE POLICY "Authenticated users can write reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- Users can update their own reviews
DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- STEP 9: Create RLS Policies for Company Stats
-- =====================================================

-- Anyone can view company stats
DROP POLICY IF EXISTS "Company stats are viewable by everyone" ON company_stats;
CREATE POLICY "Company stats are viewable by everyone"
  ON company_stats FOR SELECT
  USING (true);

-- =====================================================
-- STEP 10: Create Updated At Trigger Function
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to tables
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION QUERIES (Optional - run after migration)
-- =====================================================

-- Check tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('companies', 'reviews', 'company_stats');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('companies', 'reviews', 'company_stats');

-- Check policies exist
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public';
