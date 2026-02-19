import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
              <span className="text-white text-lg md:text-xl font-serif">É</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl lg:text-2xl font-serif tracking-tight text-gray-900">Wego Elite</span>
              <span className="text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-gray-500 uppercase">Academic Excellence</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <a href="#about" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
              INSIGHTS
            </a>

            <a href="#programs" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
              PROGRAMS
            </a>

            <a href="#team" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
              FACULTY
            </a>

            <a
              href="https://lin.ee/XO9mGNt"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 lg:ml-6 px-6 lg:px-8 py-2.5 lg:py-3 bg-gray-900 text-white text-xs lg:text-sm tracking-wider hover:bg-gray-800 transition-all duration-300 touch-target"
            >
              INQUIRE
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 touch-target"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-100">
            <div className="space-y-1 pt-4">
              <a href="#about" className="block py-3 text-sm tracking-wide text-gray-600 touch-target">INSIGHTS</a>
              <a href="#programs" className="block py-3 text-sm tracking-wide text-gray-600 touch-target">PROGRAMS</a>
              <a href="#team" className="block py-3 text-sm tracking-wide text-gray-600 touch-target">FACULTY</a>

              <a
                href="https://lin.ee/XO9mGNt"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 px-8 py-4 bg-gray-900 text-white text-sm tracking-wider text-center touch-target"
              >
                INQUIRE
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
