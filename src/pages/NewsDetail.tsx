import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { supabase, type News, type Course } from '../lib/supabase';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      if (!slug) return;

      const { data, error } = await supabase
        .from('news')
        .select('id, slug, title, excerpt, content, image_url, category, published_date, author, author_image_url, tags, view_count, related_course_ids')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (data && !error) {
        setNews(data);

        await supabase
          .from('news')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id);

        if (data.related_course_ids && data.related_course_ids.length > 0) {
          const { data: coursesData } = await supabase
            .from('courses')
            .select('id, slug, title, subtitle, level, card_image_url')
            .in('id', data.related_course_ids)
            .eq('is_active', true);

          if (coursesData) {
            setRelatedCourses(coursesData);
          }
        }
      }
      setLoading(false);
    }

    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white animate-pulse">
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-12">
            <div className="h-4 w-24 bg-gray-200 mb-8" />
            <div className="max-w-3xl space-y-4">
              <div className="h-4 w-32 bg-gray-200" />
              <div className="h-16 bg-gray-200 w-full" />
              <div className="h-6 bg-gray-200 w-1/2" />
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-16">
          <div className="aspect-video bg-gray-200 mb-16" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 w-full" />
            <div className="h-6 bg-gray-200 w-full" />
            <div className="h-6 bg-gray-200 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">文章未找到</h1>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(news.published_date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm tracking-wider mb-8"
          >
            <ArrowLeft size={18} />
            返回首頁
          </Link>

          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 border border-gray-300 mb-6">
              <span className="text-gray-700 text-xs tracking-[0.3em] uppercase">{news.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm tracking-wider">{formattedDate}</span>
              </div>
              {news.author && (
                <div className="flex items-center gap-2">
                  <span className="text-sm tracking-wider">{news.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-16">
        <div className="mb-16">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-auto object-contain max-h-[800px] mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {news.excerpt && (
              <div className="text-2xl text-gray-600 font-light leading-relaxed border-l-2 border-gray-300 pl-8">
                {news.excerpt}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line font-light">
                {news.content.split('\n').map((line, idx) => {
                  const urlRegex = /(https?:\/\/[^\s]+)/g;
                  const parts = line.split(urlRegex);

                  return (
                    <div key={idx}>
                      {parts.map((part, partIdx) => {
                        if (part.match(urlRegex)) {
                          return (
                            <a
                              key={partIdx}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {part}
                            </a>
                          );
                        }
                        return part;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {news.tags && news.tags.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4 flex-wrap">
                  <Tag className="text-gray-400" size={18} />
                  {news.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 border border-gray-300 text-xs tracking-wider text-gray-600 hover:border-gray-900 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relatedCourses.length > 0 && (
              <div className="pt-16 border-t border-gray-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-16 bg-gray-300" />
                  <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">相關課程</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/courses/${course.slug}`}
                      className="group border border-gray-200 hover:border-gray-900 transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={course.card_image_url}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
                          {course.level}
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-light line-clamp-2">
                          {course.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {news.author && (
                <div className="bg-gray-50 p-8 border border-gray-200">
                  <h3 className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">作者</h3>
                  <div className="flex items-center gap-4">
                    {news.author_image_url && (
                      <img
                        src={news.author_image_url}
                        alt={news.author}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-gray-900 font-medium">{news.author}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">資訊</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <span className="text-gray-500">發布日期：</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">瀏覽次數：</span>
                    <span>{news.view_count || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">分類：</span>
                    <span>{news.category}</span>
                  </div>
                </div>
              </div>

              <a
                href="https://lin.ee/XO9mGNt"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-gray-900 text-white text-sm tracking-wider hover:bg-gray-800 transition-all duration-300 text-center"
              >
                聯絡我們
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
