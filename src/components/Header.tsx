import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative group">
            <div className="text-2xl font-bold text-white transition-all duration-300 transform group-hover:scale-105">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Anmol
              </span>
              <span className="text-white ml-3">Airi</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group px-6 py-3 text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Text */}
                <span className={`relative z-10 transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-blue-400' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg transform transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'scale-100 opacity-100' 
                    : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                }`}></div>
                
                {/* Glowing Border */}
                <div className={`absolute inset-0 border border-blue-400/30 rounded-lg transform transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'scale-100 opacity-100' 
                    : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                }`}></div>
                
                {/* Animated Underline */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-blue-400/50"
                     style={{
                       width: activeSection === item.id ? '80%' : '0%',
                       ...(activeSection !== item.id && {
                         width: '0%',
                         transition: 'width 0.3s ease-out'
                       })
                     }}
                     onMouseEnter={(e) => {
                       if (activeSection !== item.id) {
                         e.currentTarget.style.width = '80%';
                       }
                     }}
                     onMouseLeave={(e) => {
                       if (activeSection !== item.id) {
                         e.currentTarget.style.width = '0%';
                       }
                     }}
                ></div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                } -z-10`}></div>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-3 text-white hover:text-blue-400 transition-colors duration-300 group"
          >
            <div className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="pt-4 pb-2 border-t border-slate-700/50 mt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 transform hover:translate-x-2 ${
                    activeSection === item.id 
                      ? 'text-blue-400 bg-blue-500/10 border-l-2 border-blue-400' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg transform transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'scale-100 opacity-100' 
                      : 'scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                  }`}></div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;