import React, { useEffect, useRef } from 'react';

/**
 * Horizontal clay bands that drift opposite ways as you scroll —
 * content energy without competing with section copy.
 */
const ScrollDriftBands: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const t = h > 0 ? y / h : 0;
      root.style.setProperty('--drift', String(t));
      root.style.setProperty('--drift-px', `${y * 0.08}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="scroll-drift" aria-hidden="true">
      <span className="scroll-drift__band scroll-drift__band--a" />
      <span className="scroll-drift__band scroll-drift__band--b" />
      <span className="scroll-drift__band scroll-drift__band--c" />
    </div>
  );
};

export default ScrollDriftBands;
