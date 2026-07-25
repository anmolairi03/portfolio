import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { STORY_CHAPTERS } from '../story/chapters';
import ThreeAvatar from './ThreeAvatar';
import TravelScrollWord from './TravelScrollWord';

const chapter = STORY_CHAPTERS[0];

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      id="hero"
      data-theme="core"
      className="min-h-[100svh] flex items-center relative pt-28 pb-24 overflow-hidden"
    >
      <TravelScrollWord word={chapter.word} />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(233, 172, 63, 0.08), transparent 45%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <p
              className={`font-mono text-xs sm:text-sm gold-text mb-5 tracking-[0.18em] uppercase transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {chapter.eyebrow}
            </p>

            <h1
              className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[0.92] tracking-tight mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Messy data.
              <br />
              Shipped systems.
              <br />
              <span className="gold-text">That&apos;s the log.</span>
            </h1>

            <p
              className={`text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              I&apos;m <span className="text-white font-medium">Anmol Airi</span>. CSE at MAIT.
              Applied AI and backend — messy data into systems that ship.
            </p>

            <div
              className={`flex flex-wrap gap-4 mb-10 transition-all duration-700 delay-[400ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group neu-interactive px-7 py-4 rounded-2xl font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500 flex items-center gap-2"
                style={{ boxShadow: '6px 6px 12px #191b21, -6px -6px 12px #2d313b' }}
              >
                Begin the story
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="neu-interactive px-7 py-4 rounded-2xl font-semibold text-gray-200 flex items-center gap-2"
              >
                Skip to what shipped
                <ArrowRight className="w-5 h-5 gold-text" />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className={`inline-flex items-center gap-2 text-sm text-gray-500 hover:gold-text transition-colors ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Mail className="w-4 h-4" />
              New Delhi · Open to roles
            </button>
          </div>

          {/* Waving 3D character — primary hero visual */}
          <div className="relative flex justify-center items-center">
            <div
              className={`relative rounded-full p-4 sm:p-6 neu-inset transition-all duration-1000 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <ThreeAvatar mousePosition={mousePosition} onWave={() => {}} />
            </div>
            <p className="absolute -bottom-10 left-0 right-0 text-center font-mono text-[10px] tracking-[0.2em] text-gray-600">
              CLICK TO WAVE · SCROLL TO CONTINUE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
