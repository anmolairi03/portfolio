import React, { useEffect, useRef } from 'react';
import { useGlassDebris, type GlassShardSpec } from '../context/GlassDebrisContext';

interface Body {
  spec: GlassShardSpec;
  el: HTMLButtonElement;
  dragging: boolean;
  pointerId: number | null;
  grabX: number;
  grabY: number;
  lastX: number;
  lastY: number;
  lastT: number;
  clickMoved: boolean;
  downT: number;
}

/**
 * Fixed overlay of interactive glass shards after the Why smash.
 * Double-click removes a shard; single click/drag throws — shards stay until swept.
 */
const GlassDebrisLayer: React.FC = () => {
  const { shards, removeShard, clear } = useGlassDebris();
  const rootRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Map<string, Body>>(new Map());
  const removeRef = useRef(removeShard);
  removeRef.current = removeShard;

  useEffect(() => {
    const root = rootRef.current;
    const existing = bodiesRef.current;
    const ids = new Set(shards.map((s) => s.id));

    existing.forEach((body, id) => {
      if (!ids.has(id)) {
        body.el.remove();
        existing.delete(id);
      }
    });

    if (!root) return;

    shards.forEach((spec) => {
      let body = existing.get(spec.id);
      if (body) return;

      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'glass-shard';
      el.setAttribute('aria-label', 'Glass fragment — drag, or double-click to remove');
      el.style.width = `${spec.w}px`;
      el.style.height = `${spec.h}px`;
      el.style.opacity = String(spec.opacity);
      el.style.clipPath = `polygon(${spec.points})`;
      root.appendChild(el);

      body = {
        spec: { ...spec },
        el,
        dragging: false,
        pointerId: null,
        grabX: 0,
        grabY: 0,
        lastX: 0,
        lastY: 0,
        lastT: 0,
        clickMoved: false,
        downT: 0,
      };
      existing.set(spec.id, body);

      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        body!.dragging = true;
        body!.clickMoved = false;
        body!.pointerId = e.pointerId;
        body!.downT = performance.now();
        const r = root.getBoundingClientRect();
        body!.grabX = e.clientX - r.left - body!.spec.x;
        body!.grabY = e.clientY - r.top - body!.spec.y;
        body!.spec.vx = 0;
        body!.spec.vy = 0;
        body!.lastX = e.clientX - r.left;
        body!.lastY = e.clientY - r.top;
        body!.lastT = performance.now();
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-held');
      });

      el.addEventListener('pointermove', (e) => {
        if (!body!.dragging || body!.pointerId !== e.pointerId) return;
        const r = root.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        body!.spec.x = Math.min(r.width - body!.spec.w, Math.max(0, px - body!.grabX));
        body!.spec.y = Math.min(r.height - body!.spec.h, Math.max(0, py - body!.grabY));
        const now = performance.now();
        const dt = Math.max(16, now - body!.lastT);
        body!.spec.vx = ((px - body!.lastX) / dt) * 16;
        body!.spec.vy = ((py - body!.lastY) / dt) * 16;
        if (Math.hypot(px - body!.lastX, py - body!.lastY) > 3) body!.clickMoved = true;
        body!.lastX = px;
        body!.lastY = py;
        body!.lastT = now;
        el.style.transform = `translate3d(${body!.spec.x}px, ${body!.spec.y}px, 0) rotate(${body!.spec.rot}deg) scale(1.05)`;
      });

      el.addEventListener('pointerup', (e) => {
        if (body!.pointerId !== e.pointerId) return;
        body!.dragging = false;
        body!.pointerId = null;
        body!.spec.vx = Math.max(-22, Math.min(22, body!.spec.vx * 1.25));
        body!.spec.vy = Math.max(-22, Math.min(22, body!.spec.vy * 1.25));
        el.classList.remove('is-held');
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        // Single click no longer despawns — shards were vanishing too fast.
      });

      el.addEventListener('dblclick', (e) => {
        e.preventDefault();
        removeRef.current(body!.spec.id);
      });

      el.style.transform = `translate3d(${spec.x}px, ${spec.y}px, 0) rotate(${spec.rot}deg)`;
    });
  }, [shards]);

  useEffect(() => {
    return () => {
      bodiesRef.current.forEach((body) => body.el.remove());
      bodiesRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (shards.length === 0) return;
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let t0 = performance.now();
    const g = 0.28;

    const tick = (now: number) => {
      if (typeof document !== 'undefined' && document.hidden) {
        t0 = now;
        raf = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(32, now - t0) / 16;
      t0 = now;
      const rw = root.clientWidth;
      const rh = root.clientHeight;
      const floor = rh - 36;

      bodiesRef.current.forEach((body) => {
        if (body.dragging) return;
        const s = body.spec;
        s.vy += g * dt;
        s.vx *= 0.992;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.rot += s.vx * 0.55 * dt;

        if (s.x < 0) {
          s.x = 0;
          s.vx = Math.abs(s.vx) * 0.45;
        } else if (s.x > rw - s.w) {
          s.x = rw - s.w;
          s.vx = -Math.abs(s.vx) * 0.45;
        }
        if (s.y > floor - s.h) {
          s.y = floor - s.h;
          s.vy = -Math.abs(s.vy) * 0.28;
          s.vx *= 0.86;
          if (Math.abs(s.vy) < 1.2) s.vy = 0;
          if (Math.abs(s.vx) < 0.35) s.vx = 0;
        }

        body.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rot}deg)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shards.length]);

  return (
    <div
      ref={rootRef}
      className="glass-debris-layer"
      aria-hidden={shards.length === 0}
      hidden={shards.length === 0}
    >
      {shards.length > 0 && (
        <button type="button" className="glass-debris-sweep" onClick={clear}>
          Sweep glass
        </button>
      )}
    </div>
  );
};

export default GlassDebrisLayer;
