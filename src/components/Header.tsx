import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'journey', label: 'Story' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        className={`container mx-auto rounded-2xl transition-all duration-500 ${
          isScrolled ? 'neu-raised' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group"
          >
            <span className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center font-display font-bold gold-text">
              A
            </span>
            <span className="font-display font-bold text-lg text-white hidden sm:block">
              Anmol<span className="gold-text">.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'neu-inset gold-text'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="/Anmol_Airi_Resume_Data_Analyst.pdf"
            download="Anmol_Airi_Resume.pdf"
            className="hidden md:inline-flex neu-interactive px-5 py-2.5 rounded-xl text-sm font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500"
            style={{ boxShadow: '5px 5px 10px #1b1d23, -5px -5px 10px #2b2f37' }}
          >
            Résumé
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden neu-interactive w-10 h-10 rounded-xl flex items-center justify-center text-gray-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-[28rem] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1.5 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'neu-inset gold-text'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Anmol_Airi_Resume_Data_Analyst.pdf"
              download="Anmol_Airi_Resume.pdf"
              className="mt-2 text-center px-4 py-3 rounded-xl text-sm font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500"
            >
              Download résumé
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
