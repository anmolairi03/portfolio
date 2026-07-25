import React, { useEffect, useRef, useState } from 'react';

const WORDS = [
  'SHIP',
  'BUILD',
  'RAG',
  'AGENT',
  'PROOF',
  'PIPELINE',
  'MESS',
  'REASON',
  'INDEX',
  'ACT',
];

interface Floater {
  id: number;
  text: string;
  side: 'left' | 'right';
  y: number;
  opacity: number;
  life: number;
}

/**
 * Words that pop in from left/right as you scroll.
 */
const ScrollFlyText: React.FC = () => {
  const [items, setItems] = useState<Floater[]>([]);
  const lastY = useRef(0);
  const idRef = useRef(0);
  const cooldown = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastY.current);
      lastY.current = y;
      const now = performance.now();
      if (dy < 18 || now < cooldown.current) return;
      cooldown.current = now + 380;

      const side: 'left' | 'right' = Math.random() > 0.5 ? 'left' : 'right';
      const next: Floater = {
        id: ++idRef.current,
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        side,
        y: 18 + Math.random() * 64,
        opacity: 1,
        life: 1,
      };
      setItems((prev) => [...prev.slice(-5), next]);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = window.setInterval(() => {
      setItems((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.04, opacity: Math.max(0, p.life - 0.04) }))
          .filter((p) => p.life > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(tick);
    };
  }, []);

  return (
    <div className="scroll-fly" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className={`scroll-fly__word scroll-fly__word--${item.side}`}
          style={{ top: `${item.y}%`, opacity: item.opacity }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default ScrollFlyText;
