import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-serif">É</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif tracking-tight text-white">Wego Elite</span>
                <span className="text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-gray-500 uppercase">Academic Excellence</span>
              </div>
            </Link>
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-6 md:mb-8 max-w-md">
              Dedicated to cultivating intellectual curiosity and academic distinction since 2023. Where tradition meets innovation in pursuit of excellence.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase mb-4 md:mb-6">Institution</h4>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-400 font-light">
              <li><a href="#team" className="hover:text-white transition-colors">Faculty</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase mb-4 md:mb-6">Connect</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 md:mt-1 text-gray-500 md:w-[18px] md:h-[18px]" />
                <a href="https://maps.app.goo.gl/ScDdTaahsYS4faAN9" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-gray-400 font-light hover:text-white transition-colors">
                  112, Taipei City, Beitou District, Section 1, Zhongyang N Rd, 72號2樓
                </a>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <Phone size={16} className="flex-shrink-0 text-gray-500 md:w-[18px] md:h-[18px]" />
                <a href="tel:02-2898-3300" className="text-sm md:text-base text-gray-400 font-light hover:text-white transition-colors">
                  02-2898-3300
                </a>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <Mail size={16} className="flex-shrink-0 text-gray-500 md:w-[18px] md:h-[18px]" />
                <a href="mailto:info@wegoelite.com.tw" className="text-sm md:text-base text-gray-400 font-light hover:text-white transition-colors">
                  info@wegoelite.com.tw
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="text-gray-500 text-xs md:text-sm font-light">
              © 2024 Wego Elite Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
