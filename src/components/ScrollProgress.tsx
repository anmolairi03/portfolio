import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'journey', label: 'Story' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
];

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);

      const focusLine = window.innerHeight * 0.45;
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= focusLine) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <aside className="scroll-rail" aria-label="Portfolio story progress">
      <div className="scroll-rail__meta">
        <span>ANMOL / THE BUILD LOG</span>
        <span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
      </div>

      <div className="scroll-rail__track">
        <div
          className="scroll-rail__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="scroll-rail__segments">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className={`scroll-rail__segment ${
                activeId === section.id ? 'is-active' : ''
              }`}
              onClick={() =>
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label={`Go to ${section.label}`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ScrollProgress;
