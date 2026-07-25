import React from 'react';
import { STORY_CHAPTERS } from '../story/chapters';

interface ScrollProgressProps {
  progress: number;
  activeId: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ progress, activeId }) => {
  return (
    <aside className="scroll-rail" aria-label="Build log progress">
      <div className="scroll-rail__meta">
        <span>ANMOL / MESS → SHIP</span>
        <span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
      </div>

      <div className="scroll-rail__track">
        <div className="scroll-rail__fill" style={{ transform: `scaleX(${progress})` }} />
        <div
          className="scroll-rail__segments"
          style={{ gridTemplateColumns: `repeat(${STORY_CHAPTERS.length}, 1fr)` }}
        >
          {STORY_CHAPTERS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className={`scroll-rail__segment ${activeId === section.id ? 'is-active' : ''}`}
              onClick={() =>
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label={`Go to ${section.label}`}
              aria-current={activeId === section.id ? 'true' : undefined}
            >
              <span>{String(index).padStart(2, '0')}</span>
              <strong>{section.rail}</strong>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ScrollProgress;
