import React, { useCallback, useEffect, useRef, useState } from 'react';

/** Logical play field; the canvas scales to fit its container. */
const W = 360;
const H = 260;
const PAD_W = 62;
const PAD_H = 12;
const BEST_KEY = 'anmol:spark-catch:best';

type Kind = 'spark' | 'surge';

interface Drop {
  x: number;
  y: number;
  vy: number;
  kind: Kind;
  wobble: number;
}

type Status = 'idle' | 'playing' | 'over';

/**
 * Spark Catch — move the socket to collect gold sparks, dodge red surges.
 * Runs entirely on canvas so it stays cheap while the site loads.
 */
const SparkCatchGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const padX = useRef(W / 2);
  const targetX = useRef(W / 2);
  const drops = useRef<Drop[]>([]);
  const statusRef = useRef<Status>('idle');
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const spawnTimer = useRef(0);
  const elapsed = useRef(0);
  const flash = useRef(0);

  const [status, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* storage blocked — best stays 0 */
    }
  }, []);

  const start = useCallback(() => {
    drops.current = [];
    scoreRef.current = 0;
    livesRef.current = 3;
    spawnTimer.current = 0;
    elapsed.current = 0;
    statusRef.current = 'playing';
    setScore(0);
    setLives(3);
    setStatus('playing');
  }, []);

  const endGame = useCallback(() => {
    statusRef.current = 'over';
    setStatus('over');
    setBest((prev) => {
      const next = Math.max(prev, scoreRef.current);
      try {
        localStorage.setItem(BEST_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Pointer + keyboard steering
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const toField = (clientX: number) => {
      const r = wrap.getBoundingClientRect();
      const ratio = (clientX - r.left) / Math.max(1, r.width);
      targetX.current = Math.max(PAD_W / 2, Math.min(W - PAD_W / 2, ratio * W));
    };

    const onPointer = (e: PointerEvent) => {
      toField(e.clientX);
      if (e.type === 'pointerdown' && statusRef.current !== 'playing') start();
    };

    const onKey = (e: KeyboardEvent) => {
      const step = 26;
      if (e.key === 'ArrowLeft') {
        targetX.current = Math.max(PAD_W / 2, targetX.current - step);
      } else if (e.key === 'ArrowRight') {
        targetX.current = Math.min(W - PAD_W / 2, targetX.current + step);
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (statusRef.current !== 'playing') start();
        return;
      } else {
        return;
      }
      e.preventDefault();
    };

    wrap.addEventListener('pointermove', onPointer);
    wrap.addEventListener('pointerdown', onPointer);
    wrap.addEventListener('keydown', onKey);
    return () => {
      wrap.removeEventListener('pointermove', onPointer);
      wrap.removeEventListener('pointerdown', onPointer);
      wrap.removeEventListener('keydown', onKey);
    };
  }, [start]);

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    let last = performance.now();

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener('resize', fit);

    const spawn = () => {
      const hardness = Math.min(1, elapsed.current / 45000);
      const surgeChance = 0.16 + hardness * 0.24;
      drops.current.push({
        x: 18 + Math.random() * (W - 36),
        y: -12,
        vy: 52 + Math.random() * 46 + hardness * 70,
        kind: Math.random() < surgeChance ? 'surge' : 'spark',
        wobble: Math.random() * Math.PI * 2,
      });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(48, now - last) / 1000;
      last = now;

      padX.current += (targetX.current - padX.current) * Math.min(1, dt * 14);

      if (statusRef.current === 'playing') {
        elapsed.current += dt * 1000;
        spawnTimer.current -= dt * 1000;
        const gap = Math.max(320, 780 - elapsed.current / 60);
        if (spawnTimer.current <= 0) {
          spawn();
          spawnTimer.current = gap;
        }

        const padTop = H - 26;
        drops.current.forEach((d) => {
          d.y += d.vy * dt;
          d.wobble += dt * 6;
        });

        drops.current = drops.current.filter((d) => {
          const hit =
            d.y >= padTop - 8 &&
            d.y <= padTop + PAD_H &&
            Math.abs(d.x - padX.current) < PAD_W / 2 + 7;

          if (hit) {
            if (d.kind === 'spark') {
              scoreRef.current += 1;
              setScore(scoreRef.current);
            } else {
              livesRef.current -= 1;
              flash.current = 1;
              setLives(livesRef.current);
              if (livesRef.current <= 0) endGame();
            }
            return false;
          }

          if (d.y > H + 16) {
            if (d.kind === 'spark') {
              livesRef.current -= 1;
              flash.current = 1;
              setLives(livesRef.current);
              if (livesRef.current <= 0) endGame();
            }
            return false;
          }
          return true;
        });
      }

      flash.current = Math.max(0, flash.current - dt * 2.2);

      // ---- render ----
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = '#1c1f26';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, H);
        ctx.stroke();
      }

      if (flash.current > 0) {
        ctx.fillStyle = `rgba(255, 60, 30, ${flash.current * 0.18})`;
        ctx.fillRect(0, 0, W, H);
      }

      // ground line
      ctx.strokeStyle = 'rgba(233,172,63,0.25)';
      ctx.beginPath();
      ctx.moveTo(0, H - 8.5);
      ctx.lineTo(W, H - 8.5);
      ctx.stroke();

      // drops
      drops.current.forEach((d) => {
        const r = d.kind === 'spark' ? 5 : 6;
        const wob = Math.sin(d.wobble) * 1.6;
        ctx.beginPath();
        ctx.arc(d.x + wob, d.y, r, 0, Math.PI * 2);
        if (d.kind === 'spark') {
          ctx.fillStyle = '#e9ac3f';
          ctx.shadowColor = 'rgba(233,172,63,0.85)';
        } else {
          ctx.fillStyle = '#ff4a2a';
          ctx.shadowColor = 'rgba(255,74,42,0.85)';
        }
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // socket / pad
      const px = padX.current - PAD_W / 2;
      const py = H - 26;
      ctx.fillStyle = '#e6e8ec';
      ctx.beginPath();
      ctx.roundRect(px, py, PAD_W, PAD_H, 5);
      ctx.fill();
      ctx.fillStyle = '#23262e';
      ctx.fillRect(px + PAD_W * 0.28, py + 3, 4, 6);
      ctx.fillRect(px + PAD_W * 0.62, py + 3, 4, 6);

      ctx.restore?.();
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
  }, [endGame]);

  return (
    <div className="spark-game">
      <div className="spark-game__hud font-mono">
        <span>SCORE {String(score).padStart(2, '0')}</span>
        <span className="spark-game__lives" aria-label={`${lives} lives left`}>
          {'●'.repeat(Math.max(0, lives))}
          <span className="spark-game__lives-dim">{'●'.repeat(Math.max(0, 3 - lives))}</span>
        </span>
        <span>BEST {String(best).padStart(2, '0')}</span>
      </div>

      <div
        ref={wrapRef}
        className="spark-game__stage"
        tabIndex={0}
        role="application"
        aria-label="Spark Catch mini game. Move to catch gold sparks and avoid red surges."
      >
        <canvas ref={canvasRef} className="spark-game__canvas" />

        {status !== 'playing' && (
          <div className="spark-game__overlay">
            {status === 'idle' ? (
              <>
                <p className="spark-game__overlay-title">Spark Catch</p>
                <p className="spark-game__overlay-sub font-mono">
                  Catch gold · dodge red
                </p>
              </>
            ) : (
              <>
                <p className="spark-game__overlay-title">Circuit fried</p>
                <p className="spark-game__overlay-sub font-mono">You caught {score}</p>
              </>
            )}
            <button type="button" className="spark-game__btn" onClick={start}>
              {status === 'idle' ? (touch ? 'Tap to play' : 'Play while it loads') : 'Try again'}
            </button>
          </div>
        )}
      </div>

      <p className="spark-game__help font-mono">
        {touch ? 'Drag on the pad to move' : 'Move mouse or use arrow keys'}
      </p>
    </div>
  );
};

export default SparkCatchGame;