# CareerRater Database Schema

## Overview
This document describes the Supabase database schema for CareerRater.

## Tables

### 1. `companies`
Stores all company information (both seed data and user-added companies).

```sql
CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  logo TEXT,
  industry TEXT,
  location TEXT,
  employees TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  added_by UUID REFERENCES auth.users(id),
  is_verified BOOLEAN DEFAULT FALSE
);

-- Add indexes
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_domain ON companies(domain);
CREATE INDEX idx_companies_industry ON companies(industry);
```

### 2. `reviews`
Stores anonymous employee reviews for companies.

```sql
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Overall rating
  overall_rating DECIMAL(2,1) CHECK (overall_rating >= 0 AND overall_rating <= 5),
  
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
  employment_status TEXT, -- current, former
  years_worked TEXT, -- e.g., "1-2 years", "3-5 years"
  
  -- Anonymous tracking (we don't expose user_id to frontend)
  is_anonymous BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_reviews_company ON reviews(company_id);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
```

### 3. `company_stats`
Materialized view or table for quick company rating lookups (auto-updated via triggers).

```sql
CREATE TABLE company_stats (
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
```

## Row Level Security (RLS) Policies

### Companies Table
```sql
-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Anyone can read companies
CREATE POLICY "Companies are viewable by everyone"
  ON companies FOR SELECT
  USING (true);

-- Authenticated users can insert companies
CREATE POLICY "Authenticated users can add companies"
  ON companies FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update companies they added (or admins can update verified ones)
CREATE POLICY "Users can update their own companies"
  ON companies FOR UPDATE
  USING (auth.uid() = added_by);
```

### Reviews Table
```sql
-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews (but user_id is never exposed to maintain anonymity)
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Authenticated users can insert reviews
CREATE POLICY "Authenticated users can write reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- Users can update their own reviews (within time limit, optionally)
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);
```

### Company Stats Table
```sql
-- Enable RLS
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can read stats
CREATE POLICY "Company stats are viewable by everyone"
  ON company_stats FOR SELECT
  USING (true);
```

## Triggers

### Update company_stats when review is added/updated/deleted

```sql
-- Function to update company stats
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
    COUNT(*) as total_reviews,
    AVG(overall_rating) as average_rating,
    AVG(work_life_balance) as avg_work_life_balance,
    AVG(compensation) as avg_compensation,
    AVG(management) as avg_management,
    AVG(career_growth) as avg_career_growth,
    AVG(culture) as avg_culture,
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
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_stats_on_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();

CREATE TRIGGER update_stats_on_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();

CREATE TRIGGER update_stats_on_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();
```

## Usage Notes

1. **Anonymity**: While we store `user_id` in reviews (for user management), we NEVER expose it in the frontend. All reviews appear anonymous.

2. **Company Verification**: `is_verified` flag indicates if a company is from our seed data (verified) vs user-added.

3. **Stats Auto-Update**: The `company_stats` table is automatically updated via triggers whenever reviews change.

4. **Soft Delete**: If you want to implement soft delete later, add `deleted_at` columns.

## Migration from Seed Data

After creating tables, we'll insert the 100 companies from `companies.json` with `is_verified = TRUE` and `added_by = NULL`.
