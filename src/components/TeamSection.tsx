import { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Faculty } from '../lib/supabase';

export default function TeamSection() {
  const [selectedSubject, setSelectedSubject] = useState('english');
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchFaculty() {
      const { data, error } = await supabase
        .from('faculty')
        .select('id, name, credentials, role, subject, specialization, experience, image_url, video_url, video_thumbnail_url')
        .eq('is_active', true)
        .order('order_index');

      if (data && !error) {
        setFaculty(data);
      }
      setLoading(false);
    }

    fetchFaculty();
  }, []);

  const subjects = [
    { key: 'founder', label: 'Founder', icon: '⭐' },
    { key: 'english', label: '學姐英文', icon: '📚' },
    { key: 'math-leopard', label: '獵豹數學', icon: '🔢' },
    { key: 'science-zhenlin', label: '鎮麟自然', icon: '🔬' }
  ];

  const currentTeam = faculty.filter(member => member.subject === selectedSubject);

  const handleSubjectChange = (subjectKey: string) => {
    if (subjectKey === selectedSubject) return;

    setIsTransitioning(true);
    setCurrentIndex(0);
    setTimeout(() => {
      setSelectedSubject(subjectKey);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTeam.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTeam.length) % currentTeam.length);
  };

  if (loading) {
    return (
      <section id="team" className="py-10 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-8 md:mb-12">
            <div className="hidden md:flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-12 md:w-16 bg-gray-300" />
              <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase">Faculty</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 max-w-3xl leading-tight">
              Instructors & <span className="italic">Mentors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-gray-200 mb-4" />
                <div className="h-6 bg-gray-200 w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-10 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-8 md:mb-12">
          <div className="hidden md:flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-[1px] w-12 md:w-16 bg-gray-300" />
            <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase">Faculty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 max-w-3xl leading-tight">
            Instructors & <span className="italic">Mentors</span>
          </h2>
        </div>

        <div className="flex gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16 border-b border-gray-200/60 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {subjects.map((subject) => (
            <button
              key={subject.key}
              onClick={() => handleSubjectChange(subject.key)}
              className={`pb-3 md:pb-4 lg:pb-5 px-1 md:px-2 text-xs md:text-sm lg:text-base tracking-wide transition-all duration-500 relative flex items-center gap-2 md:gap-3 group flex-shrink-0 touch-target ${
                selectedSubject === subject.key
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <span className={`text-base md:text-lg lg:text-xl transition-transform duration-500 ${
                selectedSubject === subject.key ? 'scale-110' : 'scale-100 group-hover:scale-105'
              }`}>
                {subject.icon}
              </span>
              <span className="font-light whitespace-nowrap">{subject.label}</span>
              {selectedSubject === subject.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700" />
              )}
            </button>
          ))}
        </div>

        <div className={`transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {/* Founder: Large special card */}
          {selectedSubject === 'founder' && currentTeam.length > 0 && (
            <div className="hidden md:block max-w-5xl mx-auto">
              {currentTeam.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-white elegant-shadow hover-lift overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-gray-100">
                    <img
                      src={member.image_url}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />

                    {member.video_url && (
                      <a
                        href={member.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="text-gray-900 ml-1" size={32} fill="currentColor" />
                        </div>
                      </a>
                    )}
                  </div>

                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-3">
                        {member.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 mb-2">{member.credentials}</p>
                      <p className="text-xs md:text-sm tracking-wider text-gray-400 uppercase">{member.role}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 pb-6 md:pb-8 border-b border-gray-100">
                      <div>
                        <p className="text-xs md:text-sm tracking-wider text-gray-400 uppercase mb-2">專長</p>
                        <p className="text-base md:text-lg text-gray-700">{member.specialization}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm tracking-wider text-gray-400 uppercase mb-2">經歷</p>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">{member.experience}</p>
                      </div>
                    </div>

                    {member.video_url && (
                      <div className="pt-6 md:pt-8">
                        <a
                          href={member.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 md:gap-4 text-sm md:text-base tracking-wider text-gray-600 hover:text-gray-900 transition-colors group/link touch-target"
                        >
                          {member.video_thumbnail_url && (
                            <img
                              src={member.video_thumbnail_url}
                              alt="Video preview"
                              className="w-16 h-12 rounded object-cover"
                            />
                          )}
                          <span>創辦人介紹</span>
                          <Play size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop: Grid view for other subjects */}
          {selectedSubject !== 'founder' && (
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentTeam.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-white elegant-shadow hover-lift overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={member.image_url}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {member.video_url && (
                      <a
                        href={member.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="text-gray-900 ml-1" size={24} fill="currentColor" />
                        </div>
                      </a>
                    )}
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="mb-4 md:mb-6">
                      <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">{member.credentials}</p>
                      <p className="text-[10px] md:text-xs tracking-wider text-gray-400 uppercase">{member.role}</p>
                    </div>

                    <div className="space-y-3 md:space-y-4 pb-4 md:pb-6 border-b border-gray-100">
                      <div>
                        <p className="text-[10px] md:text-xs tracking-wider text-gray-400 uppercase mb-1">專長</p>
                        <p className="text-sm md:text-base text-gray-700 line-clamp-2">{member.specialization}</p>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs tracking-wider text-gray-400 uppercase mb-1">教學經驗</p>
                        <p className="text-sm md:text-base text-gray-700">{member.experience}</p>
                      </div>
                    </div>

                    {member.video_url && (
                      <div className="pt-4 md:pt-6">
                        <a
                          href={member.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 md:gap-3 text-xs md:text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors group/link touch-target"
                        >
                          {member.video_thumbnail_url && (
                            <img
                              src={member.video_thumbnail_url}
                              alt="Video preview"
                              className="w-12 h-9 rounded object-cover"
                            />
                          )}
                          <span>教師介紹</span>
                          <Play size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile: Carousel view */}
          <div className="md:hidden relative">
            {currentTeam.length > 0 && (
              <div className="bg-white elegant-shadow overflow-hidden">
                <div className={`relative overflow-hidden bg-gray-100 ${
                  selectedSubject === 'founder' ? 'aspect-[16/9]' : 'aspect-[3/4]'
                }`}>
                  <img
                    src={currentTeam[currentIndex].image_url}
                    alt={currentTeam[currentIndex].name}
                    loading="lazy"
                    className={`w-full h-full transition-transform duration-700 ${
                      selectedSubject === 'founder' ? 'object-contain' : 'object-cover'
                    }`}
                  />

                  {/* Navigation buttons overlaying the image */}
                  {currentTeam.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all rounded-full shadow-lg active:scale-95"
                        aria-label="Previous instructor"
                      >
                        <ChevronLeft size={24} className="text-gray-900" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all rounded-full shadow-lg active:scale-95"
                        aria-label="Next instructor"
                      >
                        <ChevronRight size={24} className="text-gray-900" />
                      </button>
                    </>
                  )}

                  {currentTeam[currentIndex].video_url && (
                    <a
                      href={currentTeam[currentIndex].video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Play className="text-gray-900 ml-1" size={24} fill="currentColor" />
                      </div>
                    </a>
                  )}
                </div>

                <div className={selectedSubject === 'founder' ? 'p-8' : 'p-6'}>
                  <div className={selectedSubject === 'founder' ? 'mb-8' : 'mb-6'}>
                    <h3 className={`font-serif text-gray-900 mb-2 ${
                      selectedSubject === 'founder' ? 'text-3xl' : 'text-2xl'
                    }`}>
                      {currentTeam[currentIndex].name}
                    </h3>
                    <p className={selectedSubject === 'founder' ? 'text-base text-gray-500 mb-1' : 'text-sm text-gray-500 mb-1'}>
                      {currentTeam[currentIndex].credentials}
                    </p>
                    <p className="text-xs tracking-wider text-gray-400 uppercase">{currentTeam[currentIndex].role}</p>
                  </div>

                  <div className={`space-y-4 pb-6 border-b border-gray-100 ${
                    selectedSubject === 'founder' ? 'space-y-6' : 'space-y-4'
                  }`}>
                    <div>
                      <p className="text-xs tracking-wider text-gray-400 uppercase mb-1">專長</p>
                      <p className={selectedSubject === 'founder' ? 'text-lg text-gray-700' : 'text-base text-gray-700'}>
                        {currentTeam[currentIndex].specialization}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-wider text-gray-400 uppercase mb-1">
                        {selectedSubject === 'founder' ? '經歷' : '教學經驗'}
                      </p>
                      <p className={`text-gray-700 leading-relaxed ${
                        selectedSubject === 'founder' ? 'text-lg' : 'text-base'
                      }`}>
                        {currentTeam[currentIndex].experience}
                      </p>
                    </div>
                  </div>

                  {currentTeam[currentIndex].video_url && (
                    <div className="pt-6">
                      <a
                        href={currentTeam[currentIndex].video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {currentTeam[currentIndex].video_thumbnail_url && (
                          <img
                            src={currentTeam[currentIndex].video_thumbnail_url}
                            alt="Video preview"
                            className="w-12 h-9 rounded object-cover"
                          />
                        )}
                        <span>{selectedSubject === 'founder' ? '創辦人介紹' : '教師介紹'}</span>
                        <Play size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dot indicators */}
            {currentTeam.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {currentTeam.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-gray-900'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to instructor ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
