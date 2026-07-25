import React, { useEffect, useRef } from 'react';

interface BlobSpec {
  id: string;
  w: number;
  h: number;
  color: string;
  opacity: number;
  radius: string;
  homeX: number;
  homeY: number;
}

const SPECS: BlobSpec[] = [
  {
    id: 'a',
    w: 150,
    h: 120,
    color: '#e64238',
    opacity: 0.5,
    radius: '42% 58% 55% 45% / 48% 42% 58% 52%',
    homeX: 0.78,
    homeY: 0.18,
  },
  {
    id: 'b',
    w: 110,
    h: 110,
    color: '#fff0ba',
    opacity: 0.42,
    radius: '55% 45% 48% 52% / 42% 58% 42% 58%',
    homeX: 0.12,
    homeY: 0.72,
  },
  {
    id: 'c',
    w: 90,
    h: 72,
    color: '#97251f',
    opacity: 0.48,
    radius: '48% 52% 45% 55% / 55% 45% 55% 45%',
    homeX: 0.28,
    homeY: 0.32,
  },
  {
    id: 'd',
    w: 78,
    h: 88,
    color: '#ff8a7a',
    opacity: 0.4,
    radius: '60% 40% 55% 45% / 40% 60% 40% 60%',
    homeX: 0.88,
    homeY: 0.62,
  },
];

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  homeX: number;
  homeY: number;
  cruise: number;
  el: HTMLButtonElement;
  dragging: boolean;
  pointerId: number | null;
  grabX: number;
  grabY: number;
  lastX: number;
  lastY: number;
  lastT: number;
}

/** Keep-moving clay blobs with home regions — drag and throw. */
const ClayBlobs: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('.clay-blob'));
    const bodies: Body[] = [];

    const rootPoint = (clientX: number, clientY: number) => {
      const r = root.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const applyTransform = (body: Body, scale = 1) => {
      body.el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) scale(${scale})`;
    };

    const clamp = (body: Body, rw: number, rh: number) => {
      body.x = Math.min(Math.max(0, body.x), Math.max(0, rw - body.w));
      body.y = Math.min(Math.max(0, body.y), Math.max(0, rh - body.h));
    };

    const layout = () => {
      const rw = root.clientWidth;
      const rh = root.clientHeight;
      buttons.forEach((el, i) => {
        const spec = SPECS[i];
        if (!spec) return;
        let body = bodies[i];
        if (!body) {
          const angle = (i / SPECS.length) * Math.PI * 2 + Math.random();
          const cruise = 1.3 + Math.random() * 0.8;
          body = {
            x: spec.homeX * Math.max(0, rw - spec.w),
            y: spec.homeY * Math.max(0, rh - spec.h),
            vx: Math.cos(angle) * cruise,
            vy: Math.sin(angle) * cruise,
            w: spec.w,
            h: spec.h,
            homeX: spec.homeX,
            homeY: spec.homeY,
            cruise,
            el,
            dragging: false,
            pointerId: null,
            grabX: 0,
            grabY: 0,
            lastX: 0,
            lastY: 0,
            lastT: 0,
          };
          bodies[i] = body;
          el.style.width = `${spec.w}px`;
          el.style.height = `${spec.h}px`;
          el.style.borderRadius = spec.radius;
          el.style.background = spec.color;
          el.style.opacity = String(spec.opacity);
        } else {
          clamp(body, rw, rh);
        }
        applyTransform(body);
      });
    };

    layout();

    const onDown = (e: PointerEvent) => {
      const body = bodies.find((b) => b.el === e.currentTarget);
      if (!body) return;
      e.preventDefault();
      const p = rootPoint(e.clientX, e.clientY);
      body.dragging = true;
      body.pointerId = e.pointerId;
      body.grabX = p.x - body.x;
      body.grabY = p.y - body.y;
      body.vx = 0;
      body.vy = 0;
      body.lastX = p.x;
      body.lastY = p.y;
      body.lastT = performance.now();
      body.el.setPointerCapture(e.pointerId);
      body.el.classList.add('is-held');
      body.el.style.zIndex = '6';
    };

    const onMove = (e: PointerEvent) => {
      const body = bodies.find((b) => b.el === e.currentTarget);
      if (!body || !body.dragging || body.pointerId !== e.pointerId) return;
      const p = rootPoint(e.clientX, e.clientY);
      const rw = root.clientWidth;
      const rh = root.clientHeight;
      body.x = p.x - body.grabX;
      body.y = p.y - body.grabY;
      clamp(body, rw, rh);
      const now = performance.now();
      const dt = Math.max(16, now - body.lastT);
      body.vx = ((p.x - body.lastX) / dt) * 16;
      body.vy = ((p.y - body.lastY) / dt) * 16;
      body.lastX = p.x;
      body.lastY = p.y;
      body.lastT = now;
      applyTransform(body, 1.08);
    };

    const onUp = (e: PointerEvent) => {
      const body = bodies.find((b) => b.el === e.currentTarget);
      if (!body || body.pointerId !== e.pointerId) return;
      body.dragging = false;
      body.pointerId = null;
      body.vx = Math.max(-26, Math.min(26, body.vx * 1.35));
      body.vy = Math.max(-26, Math.min(26, body.vy * 1.35));
      body.el.classList.remove('is-held');
      body.el.style.zIndex = '';
      try {
        body.el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    buttons.forEach((el) => {
      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
    });

    let raf = 0;
    let t0 = performance.now();
    let visible = true;

    const tick = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = Math.min(32, now - t0) / 16;
      t0 = now;
      const rw = root.clientWidth;
      const rh = root.clientHeight;

      bodies.forEach((body, i) => {
        if (body.dragging) return;

        const phase = now / 900 + i * 2.1;
        // Wander force so they never idle
        body.vx += Math.cos(phase) * 0.12 * dt;
        body.vy += Math.sin(phase * 1.15) * 0.12 * dt;

        // Soft leash to home region — keeps them spread instead of piling up
        const hx = body.homeX * (rw - body.w);
        const hy = body.homeY * (rh - body.h);
        const dxh = hx - body.x;
        const dyh = hy - body.y;
        const homeDist = Math.hypot(dxh, dyh);
        if (homeDist > 90) {
          const pull = Math.min(0.06, (homeDist - 90) / 1400);
          body.vx += dxh * pull * dt;
          body.vy += dyh * pull * dt;
        }

        body.x += body.vx * dt;
        body.y += body.vy * dt;

        // Hold a cruise speed so they never decay to a stop
        let speed = Math.hypot(body.vx, body.vy);
        if (speed < 0.25) {
          body.vx = Math.cos(phase) * body.cruise;
          body.vy = Math.sin(phase) * body.cruise;
          speed = body.cruise;
        }
        const blended = speed * 0.93 + body.cruise * 0.07;
        body.vx = (body.vx / speed) * Math.min(12, blended);
        body.vy = (body.vy / speed) * Math.min(12, blended);

        if (body.x < 0) {
          body.x = 0;
          body.vx = Math.abs(body.vx);
        } else if (body.x > rw - body.w) {
          body.x = rw - body.w;
          body.vx = -Math.abs(body.vx);
        }
        if (body.y < 0) {
          body.y = 0;
          body.vy = Math.abs(body.vy);
        } else if (body.y > rh - body.h) {
          body.y = rh - body.h;
          body.vy = -Math.abs(body.vy);
        }

        applyTransform(body, Math.min(1.08, 1 + Math.hypot(body.vx, body.vy) * 0.008));
      });

      // Strong separation so they don't clump
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];
          if (a.dragging || b.dragging) continue;
          const dx = b.x + b.w / 2 - (a.x + a.w / 2);
          const dy = b.y + b.h / 2 - (a.y + a.h / 2);
          const dist = Math.hypot(dx, dy) || 0.01;
          const min = (a.w + b.w) * 0.48;
          if (dist < min) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = min - dist;
            const push = overlap * 0.35;
            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
            a.vx -= nx * 0.35;
            a.vy -= ny * 0.35;
            b.vx += nx * 0.35;
            b.vy += ny * 0.35;
            clamp(a, rw, rh);
            clamp(b, rw, rh);
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          t0 = performance.now();
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '20% 0px', threshold: 0 }
    );
    io.observe(root);

    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', layout, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', layout);
      buttons.forEach((el) => {
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="clay-blobs">
      {SPECS.map((spec) => (
        <button
          key={spec.id}
          type="button"
          className="clay-blob"
          aria-label="Drag and throw clay blob"
        />
      ))}
    </div>
  );
};

export default ClayBlobs;
