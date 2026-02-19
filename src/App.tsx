import { useState } from 'react';
import { ChevronDown, Menu, X, BookOpen, Users, Calendar, Globe } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LatestNews from './components/LatestNews';
import CourseThemes from './components/CourseThemes';
import About from './components/About';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="pt-16 md:pt-20 lg:pt-24">
        <HeroSection />
        <About />
        <CourseThemes />
        <TeamSection />
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}

export default App;
