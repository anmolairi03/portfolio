import React, { useEffect, useRef } from 'react';
import { subscribeScrollTick } from '../hooks/scrollTick';

interface TravelScrollWordProps {
  word: string;
  className?: string;
}

/**
 * Faint right-side section word — drifts in from off-screen right into place.
 */
const TravelScrollWord: React.FC<TravelScrollWordProps> = ({ word, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const travel = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 42 : 56;
    let lastKey = '';

    return subscribeScrollTick(() => {
      const section = el.closest('section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight || 1;
      if (rect.bottom < -view || rect.top > view * 2.4) return;

      const start = view * 1.1;
      const end = view * 0.22;
      const t = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const eased = t * t * (3 - 2 * t);
      const key = eased.toFixed(3);
      if (key === lastKey) return;
      lastKey = key;

      el.style.transform = `translate3d(${(1 - eased) * travel}vw, 0, 0)`;
      el.style.setProperty('--travel-t', String(eased));
    });
  }, [word]);

  return (
    <div ref={ref} className={`scroll-word scroll-word--travel ${className}`} aria-hidden="true">
      {word}
    </div>
  );
};

export default TravelScrollWord;
