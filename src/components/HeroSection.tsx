import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type HeroSlide } from '../lib/supabase';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      const { data, error } = await supabase
        .from('hero_slides')
        .select(`
          id,
          image_url,
          alt_text,
          title,
          description,
          news_id,
          news:news_id (
            id,
            slug,
            title,
            excerpt,
            image_url,
            category
          )
        `)
        .eq('is_active', true)
        .order('order_index')
        .limit(5);

      if (data && !error) {
        setSlides(data);
      }
      setLoading(false);
    }

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading || slides.length === 0) {
    return (
      <section className="relative w-full bg-gray-900 overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      </section>
    );
  }

  const slide = slides[currentSlide];
  const isNewsLinked = slide.news_id && slide.news;

  const image = isNewsLinked ? slide.news.image_url : slide.image_url;
  const title = isNewsLinked ? slide.news.title : slide.title;
  const description = isNewsLinked ? slide.news.excerpt : slide.description;
  const category = isNewsLinked ? slide.news.category : null;
  const newsSlug = isNewsLinked ? slide.news.slug : null;

  const content = (
    <>
      <div className="absolute inset-0">
        <img
          key={slide.id}
          src={image}
          alt={slide.alt_text || title}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      <div className="relative h-full flex items-end">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 w-full pb-16 md:pb-20">
          <div className="max-w-3xl">
            {isNewsLinked && (
              <div className="inline-block px-8 py-4 bg-white text-gray-900 text-sm md:text-base tracking-wide hover:bg-gray-100 transition-colors font-light">
                {title}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className="relative w-full bg-gray-900 overflow-hidden aspect-video">
      {isNewsLinked ? (
        <Link to={`/news/${newsSlug}`} className="block h-full">
          {content}
        </Link>
      ) : (
        content
      )}

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>
    </section>
  );
}
