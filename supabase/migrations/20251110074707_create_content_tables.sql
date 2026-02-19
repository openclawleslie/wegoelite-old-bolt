/*
  # Content Management System for EduElite

  1. New Tables
    - `hero_slides`
      - `id` (uuid, primary key)
      - `image_url` (text) - URL to the slide image
      - `alt_text` (text) - Alt text for accessibility
      - `order_index` (integer) - Display order
      - `is_active` (boolean) - Whether the slide is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `courses`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Course name
      - `subtitle` (text) - Course tagline
      - `category` (text) - Category label (e.g., "Foundation", "Advanced")
      - `level` (text) - Academic level
      - `description` (text) - Full course description
      - `ages` (text) - Age range
      - `duration` (text) - Course duration
      - `class_size` (text) - Class size range
      - `image_url` (text) - Hero image URL
      - `card_image_url` (text) - Card/thumbnail image URL
      - `highlights` (jsonb) - Array of highlight points
      - `curriculum` (jsonb) - Array of curriculum items
      - `outcomes` (jsonb) - Array of learning outcomes
      - `order_index` (integer) - Display order
      - `is_active` (boolean) - Whether the course is visible
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `faculty`
      - `id` (uuid, primary key)
      - `name` (text) - Teacher name
      - `credentials` (text) - Academic credentials
      - `role` (text) - Position/role
      - `subject` (text) - Subject area (science, math, english)
      - `specialization` (text) - Area of expertise
      - `experience` (text) - Years of experience
      - `image_url` (text) - Profile photo URL
      - `video_url` (text) - Introduction video URL
      - `video_thumbnail_url` (text) - Video thumbnail
      - `order_index` (integer) - Display order
      - `is_active` (boolean) - Whether visible
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `news`
      - `id` (uuid, primary key)
      - `title` (text) - Article title
      - `category` (text) - News category
      - `excerpt` (text) - Short description
      - `content` (text) - Full article content
      - `image_url` (text) - Article image URL
      - `published_date` (date) - Publication date
      - `is_active` (boolean) - Whether visible
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for all active content
    - No public write access (will be handled through admin interface or API)
*/

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active hero slides"
  ON hero_slides FOR SELECT
  TO public
  USING (is_active = true);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  level text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  ages text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  class_size text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  card_image_url text NOT NULL,
  highlights jsonb DEFAULT '[]'::jsonb,
  curriculum jsonb DEFAULT '[]'::jsonb,
  outcomes jsonb DEFAULT '[]'::jsonb,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active courses"
  ON courses FOR SELECT
  TO public
  USING (is_active = true);

-- Create faculty table
CREATE TABLE IF NOT EXISTS faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  credentials text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  subject text NOT NULL,
  specialization text NOT NULL DEFAULT '',
  experience text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  video_url text NOT NULL DEFAULT '',
  video_thumbnail_url text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active faculty"
  ON faculty FOR SELECT
  TO public
  USING (is_active = true);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  published_date date DEFAULT CURRENT_DATE,
  is_active boolean DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active news"
  ON news FOR SELECT
  TO public
  USING (is_active = true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_active_order ON hero_slides(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_courses_active_order ON courses(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_faculty_active_subject ON faculty(is_active, subject, order_index);
CREATE INDEX IF NOT EXISTS idx_news_active_order ON news(is_active, published_date DESC, order_index);
