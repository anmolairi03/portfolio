import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  side: 'left' | 'right';
}

const COLORS = ['#be332b', '#e6dac6', '#e9e5da', '#e9ac3f', '#23262e', '#fff8e8', '#a83325', '#b4552a'];

/**
 * Colored bouncy orbs that surge when you scroll.
 */
const ScrollOrbs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const velocityRef = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const spawn = (forceSide?: 'left' | 'right'): Orb => {
      const side: 'left' | 'right' = forceSide ?? (Math.random() > 0.5 ? 'left' : 'right');
      const r = 10 + Math.random() * 28;
      return {
        side,
        x: side === 'left' ? -r - 10 : canvas.width + r + 10,
        y: Math.random() * canvas.height,
        vx: (side === 'left' ? 1 : -1) * (1.1 + Math.random() * 2.2),
        vy: (Math.random() - 0.5) * 2.4,
        r,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    orbsRef.current = Array.from({ length: 14 }, () => spawn());

    const onScroll = () => {
      const y = window.scrollY;
      velocityRef.current = Math.min(4, Math.abs(y - lastY.current) / 16);
      lastY.current = y;
      // Burst a couple extra orbs on fast scroll
      if (velocityRef.current > 1.6 && orbsRef.current.length < 22) {
        orbsRef.current.push(spawn('left'), spawn('right'));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0;
    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      velocityRef.current *= 0.96;
      const boost = 0.55 + velocityRef.current * 1.8;

      orbsRef.current = orbsRef.current.filter((orb) => {
        orb.x += orb.vx * boost;
        orb.y += orb.vy * boost;

        if (orb.y - orb.r < 0) {
          orb.y = orb.r;
          orb.vy *= -1;
        }
        if (orb.y + orb.r > h) {
          orb.y = h - orb.r;
          orb.vy *= -1;
        }

        const mid = w * 0.5;
        if (orb.side === 'left' && orb.x > mid * 0.48) {
          orb.vx *= -0.92;
          orb.x = mid * 0.48;
          orb.vy += (Math.random() - 0.5) * 1.2;
        }
        if (orb.side === 'right' && orb.x < mid * 1.52) {
          orb.vx *= -0.92;
          orb.x = mid * 1.52;
          orb.vy += (Math.random() - 0.5) * 1.2;
        }

        if (orb.x < -100 || orb.x > w + 100) {
          return false;
        }

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.globalAlpha = 0.62;
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(orb.x - orb.r * 0.28, orb.y - orb.r * 0.28, orb.r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      while (orbsRef.current.length < 12) {
        orbsRef.current.push(spawn());
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="scroll-orbs" aria-hidden="true" />;
};

export default ScrollOrbs;
