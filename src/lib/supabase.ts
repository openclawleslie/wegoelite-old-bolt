import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      'Cache-Control': 'max-age=60'
    }
  }
});

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  description: string;
  short_description: string;
  ages: string;
  duration: string;
  class_size: string;
  image_url: string;
  card_image_url: string;
  gallery_images: string[];
  highlights: string[];
  curriculum: string[];
  outcomes: string[];
  price: number;
  currency: string;
  discount_price?: number;
  schedule_days: string;
  schedule_time: string;
  location: string;
  capacity: number;
  enrolled_count: number;
  waitlist_enabled: boolean;
  prerequisites: string;
  target_audience: string;
  instructor_ids: string[];
  tags: string[];
  meta_title: string;
  meta_description: string;
  keywords: string;
  status: string;
  start_date?: string;
  end_date?: string;
  featured: boolean;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Faculty = {
  id: string;
  name: string;
  credentials: string;
  role: string;
  subject: string;
  specialization: string;
  experience: string;
  bio: string;
  image_url: string;
  video_url: string;
  video_thumbnail_url: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  achievements: string[];
  social_links: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  email: string;
  phone: string;
  languages: string[];
  availability_status: string;
  featured: boolean;
  teaching_philosophy: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type HeroSlide = {
  id: string;
  image_url: string;
  alt_text: string;
  title: string;
  description: string;
  link_url: string;
  button_text: string;
  display_duration: number;
  order_index: number;
  is_active: boolean;
  news_id?: string;
  news?: News;
  created_at: string;
  updated_at: string;
};

export type News = {
  id: string;
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  author_image_url: string;
  published_date: string;
  tags: string[];
  featured: boolean;
  view_count: number;
  related_course_ids: string[];
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type CourseSchedule = {
  id: string;
  course_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  course_id?: string;
  student_name: string;
  student_image_url: string;
  parent_name: string;
  rating: number;
  content: string;
  year: number;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  course_id?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: any;
  description: string;
  updated_at: string;
};

export type EnrollmentInquiry = {
  id: string;
  course_id?: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  grade_level: string;
  message: string;
  source: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
};
