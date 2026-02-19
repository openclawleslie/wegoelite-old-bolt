/*
  # Add News Linking to Hero Slides

  ## Changes
  1. Add news_id column to hero_slides table
    - Links hero slides to news items
    - Optional field (allows both manual slides and news-linked slides)
  
  2. Add foreign key constraint
    - Ensures referential integrity
    - Links to news table
  
  3. Usage
    - If news_id is set: Hero slide automatically uses news data (title, image, link)
    - If news_id is null: Hero slide uses manual data (existing behavior)
  
  ## Notes
  - This allows dynamic hero banners linked to featured news
  - Featured news can be promoted to hero section without hardcoding
  - Maintains backward compatibility with existing manual slides
*/

-- Add news_id column to link hero slides to news items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hero_slides' AND column_name = 'news_id'
  ) THEN
    ALTER TABLE hero_slides 
    ADD COLUMN news_id uuid REFERENCES news(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_news_id ON hero_slides(news_id);

-- Add check constraint to ensure either manual content OR news link is provided
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE constraint_name = 'hero_slides_content_check'
  ) THEN
    ALTER TABLE hero_slides 
    ADD CONSTRAINT hero_slides_content_check 
    CHECK (
      (news_id IS NOT NULL) OR 
      (image_url IS NOT NULL AND image_url != '')
    );
  END IF;
END $$;
