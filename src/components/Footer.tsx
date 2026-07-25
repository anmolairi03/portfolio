import React from 'react';
import { Github, Linkedin, Mail, Code2, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const socials = [
    { href: 'https://github.com/anmolairi03/', icon: Github, label: 'GitHub' },
    { href: 'http://www.linkedin.com/in/anmol809', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/zeus408809/', icon: Code2, label: 'LeetCode' },
    { href: 'mailto:anmolandanay@gmail.com', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="bg-ink-base pt-10 pb-28" data-theme="core">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="neu-raised rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-white text-lg">
              Anmol Airi<span className="gold-text">.</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Mess → Ship · Applied AI &amp; backend · New Delhi
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="neu-interactive w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-gold-400"
              >
                <s.icon size={18} />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="neu-interactive w-11 h-11 rounded-xl flex items-center justify-center gold-text ml-1"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Anmol Airi · The build log is still open.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
