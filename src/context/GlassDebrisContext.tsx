import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface GlassShardSpec {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  points: string;
  opacity: number;
}

interface GlassDebrisContextValue {
  shards: GlassShardSpec[];
  spawnFrom: (origin: { x: number; y: number }, count?: number) => void;
  clear: () => void;
  removeShard: (id: string) => void;
}

const GlassDebrisContext = createContext<GlassDebrisContextValue | null>(null);

function makePolygon(seed: number): string {
  const pts: string[] = [];
  const n = 4 + (seed % 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed * 0.2;
    const r = 0.35 + ((seed * (i + 3)) % 10) / 28;
    const x = 50 + Math.cos(a) * r * 50;
    const y = 50 + Math.sin(a) * r * 50;
    pts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return pts.join(', ');
}

export const GlassDebrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shards, setShards] = useState<GlassShardSpec[]>([]);

  const spawnFrom = useCallback((origin: { x: number; y: number }, count = 22) => {
    const next: GlassShardSpec[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 3 + Math.random() * 11;
      const w = 28 + Math.random() * 52;
      const h = 22 + Math.random() * 44;
      return {
        id: `shard-${Date.now()}-${i}`,
        x: origin.x - w / 2,
        y: origin.y - h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        w,
        h,
        rot: Math.random() * 360,
        points: makePolygon(i * 17 + 3),
        opacity: 0.72 + Math.random() * 0.28,
      };
    });
    setShards(next);
  }, []);

  const clear = useCallback(() => setShards([]), []);
  const removeShard = useCallback((id: string) => {
    setShards((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = useMemo(
    () => ({ shards, spawnFrom, clear, removeShard }),
    [shards, spawnFrom, clear, removeShard]
  );

  return <GlassDebrisContext.Provider value={value}>{children}</GlassDebrisContext.Provider>;
};

export function useGlassDebris() {
  const ctx = useContext(GlassDebrisContext);
  if (!ctx) throw new Error('useGlassDebris must be used within GlassDebrisProvider');
  return ctx;
}
