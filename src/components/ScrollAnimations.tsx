import { useEffect, useRef } from 'react';
import { subscribeScrollTick } from '../hooks/scrollTick';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate' | 'bounceLeft' | 'bounceRight';
  delay?: number;
}

/**
 * Scroll-linked drift: content starts off-screen and settles into place
 * as the block enters the viewport.
 */
export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animationType = 'fadeUp',
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const amp = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.75 : 1;
    let lastKey = '';

    return subscribeScrollTick(() => {
      const rect = element.getBoundingClientRect();
      const view = window.innerHeight || 1;
      // Skip far-away nodes
      if (rect.bottom < -view || rect.top > view * 2.2) return;

      const start = view * 1.15;
      const end = view * 0.38;
      const raw = (start - rect.top) / (start - end);
      const t = Math.min(1, Math.max(0, raw - delay / 2000));
      const eased = t * t * (3 - 2 * t);
      const key = eased.toFixed(3);
      if (key === lastKey) return;
      lastKey = key;

      let x = 0;
      let y = 0;
      let scale = 1;
      let rot = 0;

      switch (animationType) {
        case 'bounceLeft':
        case 'fadeLeft':
          x = (1 - eased) * -28 * amp;
          y = (1 - eased) * 1.5;
          break;
        case 'bounceRight':
        case 'fadeRight':
          x = (1 - eased) * 28 * amp;
          y = (1 - eased) * 1.5;
          break;
        case 'fadeUp':
          y = (1 - eased) * 8 * amp;
          break;
        case 'scale':
          scale = 1 - (1 - eased) * 0.16 * amp;
          y = (1 - eased) * 3 * amp;
          break;
        case 'rotate':
          rot = (1 - eased) * -6 * amp;
          scale = 1 - (1 - eased) * 0.08 * amp;
          break;
        default:
          y = (1 - eased) * 5 * amp;
      }

      element.style.opacity = String(0.12 + eased * 0.88);
      element.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale}) rotate(${rot}deg)`;
    });
  }, [animationType, delay]);

  return (
    <div
      ref={elementRef}
      className={`scroll-animate scroll-animate--linked ${animationType} ${className}`}
    >
      {children}
    </div>
  );
};
