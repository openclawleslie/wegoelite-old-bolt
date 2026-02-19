import { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Course } from '../lib/supabase';
import CourseModal from './CourseModal';

type TabLevel = '國小' | '國中' | '高中';

export default function CourseThemes() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabLevel>('國小');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const coursesPerPage = 5;

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('id, slug, title, subtitle, category, level, description, short_description, card_image_url, highlights, curriculum, outcomes, ages, duration, class_size, schedule_days, schedule_time, location, prerequisites, target_audience')
        .eq('is_active', true)
        .order('order_index');

      if (data && !error) {
        setCourses(data);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section id="programs" className="pt-6 md:pt-8 lg:pt-10 pb-10 md:pb-16 lg:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-8 md:mb-12">
            <div className="hidden md:flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-12 md:w-16 bg-gray-300" />
              <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase">Our Programs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 max-w-3xl leading-tight">
              Academic <span className="italic">Programs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border border-gray-200 p-6 md:p-8">
                <div className="h-6 bg-gray-200 w-24 mb-4" />
                <div className="h-3 bg-gray-200 w-20 mb-3" />
                <div className="h-8 bg-gray-200 w-full mb-3" />
                <div className="h-4 bg-gray-200 w-full mb-2" />
                <div className="h-4 bg-gray-200 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const tabs: TabLevel[] = ['國小', '國中', '高中'];

  const coursesByTab: Record<TabLevel, string[]> = {
    '國小': [
      '薇閣國小課輔班',
      '學姊英文小團班',
      '小獵豹（薇閣專班）',
      '薇閣升國七實力班',
      '學姐英文個人班'
    ],
    '國中': [
      '獵豹數學（薇閣專班）',
      '學姐英文（薇閣專班）',
      '鎮麟自然（薇閣專班）',
      '易學國文（薇閣專班）'
    ],
    '高中': [
      'TOEFL/SAT/AP 個人班',
      '海外留學諮詢'
    ]
  };

  const filteredCourses = courses.filter(course =>
    coursesByTab[activeTab].includes(course.title)
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  const handleTabChange = (tab: TabLevel) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section id="programs" className="pt-6 md:pt-8 lg:pt-10 pb-10 md:pb-16 lg:pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-8 md:mb-12">
          <div className="hidden md:flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-[1px] w-12 md:w-16 bg-gray-300" />
            <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase">Our Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 max-w-3xl leading-tight">
            Academic <span className="italic">Programs</span>
          </h2>
        </div>

        <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-light tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {displayedCourses.map((course, index) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="group cursor-pointer text-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <article className="border border-gray-200 p-6 md:p-8 hover:border-gray-400 transition-all duration-300">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-gray-100 text-xs tracking-wider text-gray-900 mb-4">
                    {course.category}
                  </span>
                  <p className="text-xs tracking-wider text-gray-400 uppercase mb-3">
                    {course.level}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-3 md:mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    {course.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-light leading-relaxed line-clamp-3">
                    {course.short_description || course.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs md:text-sm tracking-wider text-gray-600 group-hover:text-gray-900 transition-colors">
                    <span>LEARN MORE</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </article>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 border border-gray-300 transition-all ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:border-gray-900 hover:bg-gray-50'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 border border-gray-300 transition-all ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:border-gray-900 hover:bg-gray-50'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </div>

      <CourseModal
        course={selectedCourse!}
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
      />
    </section>
  );
}
