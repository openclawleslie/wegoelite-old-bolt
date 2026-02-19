import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award } from 'lucide-react';
import { supabase, type Course } from '../lib/supabase';

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      if (!slug) return;

      const { data, error } = await supabase
        .from('courses')
        .select('id, slug, title, subtitle, level, description, image_url, highlights, curriculum, outcomes, ages, duration, class_size, schedule_days, schedule_time, location, prerequisites, target_audience')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (data && !error) {
        setCourse(data);
      }
      setLoading(false);
    }

    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white animate-pulse">
        <div className="relative h-[50vh] md:h-[70vh] min-h-[400px] md:min-h-[600px] bg-gray-700" />
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-8 bg-gray-200 w-3/4" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 w-full" />
                <div className="h-6 bg-gray-200 w-full" />
                <div className="h-6 bg-gray-200 w-2/3" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-100 p-10 border border-gray-200 h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">課程未找到</h1>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] md:h-[70vh] min-h-[400px] md:min-h-[600px] bg-gray-900 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative h-full flex flex-col justify-between max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm tracking-wider"
          >
            <ArrowLeft size={18} />
            返回首頁
          </Link>

          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 border border-white/30 backdrop-blur-sm mb-8">
              <span className="text-white/90 text-xs tracking-[0.3em] uppercase">{course.level}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-2xl text-white/80 font-light">
              {course.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-16 bg-gray-300" />
                <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">課程簡介</span>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                {course.description}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-16 bg-gray-300" />
                <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">課程特色</span>
              </div>
              <ul className="space-y-6">
                {course.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0" />
                    <span className="text-gray-700 font-light leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-16 bg-gray-300" />
                <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">課程大綱</span>
              </div>
              <div className="space-y-6">
                {course.curriculum.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-gray-200 pl-8 py-4">
                    <p className="text-gray-800 font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-16 bg-gray-300" />
                <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">學習成果</span>
              </div>
              <ul className="space-y-6">
                {course.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Award className="text-gray-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 font-light leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-gray-50 p-10 border border-gray-200">
                <h3 className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-8">課程資訊</h3>

                <div className="space-y-8 mb-12">
                  {course.ages && (
                    <div className="flex items-start gap-4">
                      <Users className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">適合年級</p>
                        <p className="text-gray-900">{course.ages}</p>
                      </div>
                    </div>
                  )}

                  {course.duration && (
                    <div className="flex items-start gap-4">
                      <Clock className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">課程期間</p>
                        <p className="text-gray-900">{course.duration}</p>
                      </div>
                    </div>
                  )}

                  {course.class_size && (
                    <div className="flex items-start gap-4">
                      <Users className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">班級人數</p>
                        <p className="text-gray-900">{course.class_size}</p>
                      </div>
                    </div>
                  )}

                  {course.schedule_days && (
                    <div className="flex items-start gap-4">
                      <Clock className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">上課日期</p>
                        <p className="text-gray-900">{course.schedule_days}</p>
                      </div>
                    </div>
                  )}

                  {course.schedule_time && (
                    <div className="flex items-start gap-4">
                      <Clock className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">上課時間</p>
                        <p className="text-gray-900">{course.schedule_time}</p>
                      </div>
                    </div>
                  )}

                  {course.location && (
                    <div className="flex items-start gap-4">
                      <Award className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">上課地點</p>
                        <p className="text-gray-900">{course.location}</p>
                      </div>
                    </div>
                  )}

                  {course.prerequisites && (
                    <div className="flex items-start gap-4">
                      <Award className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">報名條件</p>
                        <p className="text-gray-900">{course.prerequisites}</p>
                      </div>
                    </div>
                  )}

                  {course.target_audience && (
                    <div className="flex items-start gap-4">
                      <Users className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase mb-1">適合對象</p>
                        <p className="text-gray-900">{course.target_audience}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <a
                    href="https://lin.ee/XO9mGNt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-8 py-4 bg-gray-900 text-white text-sm tracking-wider hover:bg-gray-800 transition-all duration-300 text-center"
                  >
                    立即諮詢
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
