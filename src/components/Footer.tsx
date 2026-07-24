import React from 'react';
import { Heart, Github, Linkedin, Mail, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            <p>&copy; 2024 Anmol Airi. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/anmolairi03/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Github size={20} />
            </a>
            <a href="http://www.linkedin.com/in/anmol809" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Linkedin size={20} />
            </a>
            <a href="https://leetcode.com/anmolairi03" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Code size={20} />
            </a>
            <a href="mailto:anmolandanay@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;