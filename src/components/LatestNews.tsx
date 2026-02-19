import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type News } from '../lib/supabase';

export default function LatestNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('news')
        .select('id, slug, title, excerpt, image_url, category, published_date')
        .eq('is_active', true)
        .order('published_date', { ascending: false })
        .limit(12);

      if (data && !error) {
        setNews(data);
      }
      setLoading(false);
    }

    fetchNews();
  }, []);

  const visibleNews = news.slice(0, displayCount);
  const hasMore = news.length > displayCount;

  const loadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  if (loading) {
    return (
      <section id="news" className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-8 md:mb-12">
            <div className="hidden md:flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-12 md:w-16 bg-gray-300" />
              <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase">Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 max-w-3xl leading-tight">
              Latest <span className="italic">News</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/9] bg-gray-200 mb-4 md:mb-6" />
                <div className="h-3 bg-gray-200 w-1/3 mb-2 md:mb-3" />
                <div className="h-6 bg-gray-200 w-full mb-2" />
                <div className="h-4 bg-gray-200 w-full mb-2" />
                <div className="h-4 bg-gray-200 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-8 md:mb-12">
          <div className="hidden md:flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-[1px] w-12 md:w-16 bg-gray-300" />
            <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase">Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 max-w-3xl leading-tight">
            Latest <span className="italic">News</span>
          </h2>
        </div>

        {/* Desktop: 3x2 Grid (6 items) */}
        {/* Mobile: Vertical Stack (single column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleNews.map((item, index) => (
            <Link
              key={item.id}
              to={`/news/${item.slug || item.id}`}
              className="group cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <article className="h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 mb-4 md:mb-6">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 md:top-6 left-4 md:left-6">
                    <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-white/90 backdrop-blur-sm text-xs tracking-wider text-gray-900">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-[10px] md:text-xs tracking-wider text-gray-400 uppercase mb-2 md:mb-3">
                    {new Date(item.published_date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-gray-900 mb-2 md:mb-3 group-hover:translate-x-2 transition-transform duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed line-clamp-2 md:line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-10 md:mt-12">
            <button
              onClick={loadMore}
              className="px-8 md:px-10 py-3 md:py-4 border-2 border-gray-900 text-gray-900 text-sm tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 touch-target"
            >
              LOAD MORE NEWS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
