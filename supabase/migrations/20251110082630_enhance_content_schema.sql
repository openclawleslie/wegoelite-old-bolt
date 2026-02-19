/*
  # Enhanced Content Management Schema

  ## Overview
  This migration enhances the content management system with comprehensive fields for better flexibility and content richness.

  ## 1. Hero Slides Enhancements
    - Add title and description for overlay text
    - Add link_url for clickable slides
    - Add button_text for call-to-action
    - Add display_duration for custom timing

  ## 2. Courses Enhancements
    - Add short_description for preview text
    - Add gallery_images for multiple course photos
    - Add pricing information (price, currency, discount)
    - Add schedule details (days, time, location)
    - Add enrollment info (capacity, enrolled_count, waitlist_enabled)
    - Add prerequisites and target_audience
    - Add instructor_ids to link with faculty
    - Add tags for categorization
    - Add seo fields (meta_title, meta_description, keywords)
    - Add status field (draft, published, archived, sold_out)

  ## 3. Faculty Enhancements
    - Add bio field for detailed description
    - Add education array for academic background
    - Add achievements array
    - Add social_links (LinkedIn, etc.)
    - Add email and phone for contact
    - Add languages spoken
    - Add availability status
    - Add featured flag

  ## 4. News Enhancements
    - Add author information
    - Add slug for SEO-friendly URLs
    - Add tags for categorization
    - Add featured flag
    - Add view_count for analytics
    - Add related_courses link

  ## 5. New Tables
    - course_schedules: Detailed schedule information
    - testimonials: Student/parent reviews
    - faqs: Frequently asked questions
    - site_settings: Global site configuration
    - enrollment_inquiries: Contact form submissions

  ## 6. Indexes and Performance
    - Add composite indexes for common queries
    - Add full-text search indexes where applicable
*/

-- Enhance hero_slides table
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS title text DEFAULT '';
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS description text DEFAULT '';
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS link_url text DEFAULT '';
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS button_text text DEFAULT '';
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS display_duration integer DEFAULT 5000;

-- Enhance courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS short_description text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS price numeric(10,2) DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS currency text DEFAULT 'TWD';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS discount_price numeric(10,2);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS schedule_days text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS schedule_time text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS location text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS capacity integer DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS enrolled_count integer DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS waitlist_enabled boolean DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS prerequisites text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS target_audience text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_ids jsonb DEFAULT '[]'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS meta_title text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS meta_description text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS keywords text DEFAULT '';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS status text DEFAULT 'published';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS start_date date;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS end_date date;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Enhance faculty table
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS bio text DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS education jsonb DEFAULT '[]'::jsonb;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS achievements jsonb DEFAULT '[]'::jsonb;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}'::jsonb;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS email text DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS phone text DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '["中文"]'::jsonb;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'available';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS teaching_philosophy text DEFAULT '';

-- Enhance news table
ALTER TABLE news ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE news ADD COLUMN IF NOT EXISTS author text DEFAULT '';
ALTER TABLE news ADD COLUMN IF NOT EXISTS author_image_url text DEFAULT '';
ALTER TABLE news ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb;
ALTER TABLE news ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
ALTER TABLE news ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0;
ALTER TABLE news ADD COLUMN IF NOT EXISTS related_course_ids jsonb DEFAULT '[]'::jsonb;
ALTER TABLE news ADD COLUMN IF NOT EXISTS meta_title text DEFAULT '';
ALTER TABLE news ADD COLUMN IF NOT EXISTS meta_description text DEFAULT '';

-- Add unique constraint on news slug if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'news_slug_unique'
  ) THEN
    ALTER TABLE news ADD CONSTRAINT news_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Create course_schedules table
CREATE TABLE IF NOT EXISTS course_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  day_of_week text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  room text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE course_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active course schedules"
  ON course_schedules FOR SELECT
  TO public
  USING (is_active = true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  student_name text NOT NULL,
  student_image_url text DEFAULT '',
  parent_name text DEFAULT '',
  rating integer DEFAULT 5,
  content text NOT NULL,
  year integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (is_active = true);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active FAQs"
  ON faqs FOR SELECT
  TO public
  USING (is_active = true);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

-- Create enrollment_inquiries table
CREATE TABLE IF NOT EXISTS enrollment_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  student_name text NOT NULL,
  parent_name text DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL,
  grade_level text DEFAULT '',
  message text DEFAULT '',
  source text DEFAULT 'website',
  status text DEFAULT 'new',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE enrollment_inquiries ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view inquiries (for admin use)
CREATE POLICY "Authenticated users can view inquiries"
  ON enrollment_inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can create an inquiry
CREATE POLICY "Anyone can create inquiries"
  ON enrollment_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- Add composite indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_courses_status_featured ON courses(status, featured, order_index);
CREATE INDEX IF NOT EXISTS idx_courses_tags ON courses USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_faculty_subject_featured ON faculty(subject, featured, order_index);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_featured_published ON news(featured, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_course_featured ON testimonials(course_id, is_featured, order_index);
CREATE INDEX IF NOT EXISTS idx_course_schedules_course ON course_schedules(course_id, day_of_week);

-- Insert default site settings
INSERT INTO site_settings (key, value, description)
VALUES 
  ('site_name', '"薇閣學姐補習班 & 獵豹數學"', 'Website name'),
  ('contact_email', '"info@example.com"', 'Main contact email'),
  ('contact_phone', '"+886-2-xxxx-xxxx"', 'Main contact phone'),
  ('line_url', '"https://lin.ee/XO9mGNt"', 'LINE contact URL'),
  ('address', '"台北市中正區xx路xx號"', 'Physical address'),
  ('business_hours', '{"weekday": "14:00-21:00", "weekend": "09:00-18:00"}', 'Business hours'),
  ('social_media', '{"facebook": "", "instagram": "", "youtube": ""}', 'Social media links')
ON CONFLICT (key) DO NOTHING;
