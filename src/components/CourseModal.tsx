import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { Course } from '../lib/supabase';

interface CourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-sm shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-8 md:p-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gray-100 text-xs tracking-wider text-gray-900 mb-4">
              {course.category}
            </span>
            <p className="text-xs tracking-wider text-gray-400 uppercase mb-2">
              {course.level}
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 leading-tight">
            {course.title}
          </h2>

          <div className="prose prose-gray max-w-none">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-12">
              {course.short_description || course.description}
            </p>

            {course.full_description && (
              <div
                className="text-base text-gray-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: course.full_description }}
              />
            )}

            <div className="mt-12 bg-gray-50 p-8 rounded-sm">
              <h3 className="text-xl font-serif text-gray-900 mb-8">課程資訊</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {course.ages && (
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider text-gray-500 uppercase">適合年級</p>
                    <p className="text-gray-900 text-base">{course.ages}</p>
                  </div>
                )}

                {course.class_size && (
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider text-gray-500 uppercase">班級人數</p>
                    <p className="text-gray-900 text-base">{course.class_size}</p>
                  </div>
                )}

                {course.duration && (
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider text-gray-500 uppercase">課程期間</p>
                    <p className="text-gray-900 text-base">{course.duration}</p>
                  </div>
                )}

                {course.schedule_days && (
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider text-gray-500 uppercase">上課日期</p>
                    <p className="text-gray-900 text-base">{course.schedule_days}</p>
                  </div>
                )}

                {course.schedule_time && (
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider text-gray-500 uppercase">上課時間</p>
                    <p className="text-gray-900 text-base">{course.schedule_time}</p>
                  </div>
                )}

                {course.location && (
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider text-gray-500 uppercase">上課地點</p>
                    <p className="text-gray-900 text-base">{course.location}</p>
                  </div>
                )}
              </div>
            </div>

            {(course.prerequisites || course.target_audience) && (
              <div className="mt-12 space-y-8">
                {course.target_audience && (
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-4">適合對象</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{course.target_audience}</p>
                  </div>
                )}

                {course.prerequisites && (
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-4">報名條件</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{course.prerequisites}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <a
              href="https://lin.ee/XO9mGNt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-8 py-3 bg-gray-900 text-white text-sm tracking-wider hover:bg-gray-800 transition-colors text-center"
            >
              立即諮詢
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-8 py-3 border border-gray-300 text-gray-900 text-sm tracking-wider hover:border-gray-900 transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
