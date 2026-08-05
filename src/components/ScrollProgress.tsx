import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, GripHorizontal } from 'lucide-react';
import { STORY_CHAPTERS } from '../story/chapters';

interface ScrollProgressProps {
  progress: number;
  activeId: string;
}

type Dock = 'bottom' | 'left' | 'right';

const MIN_KEY = 'portfolio-scroll-rail-minimized';
const DOCK_KEY = 'portfolio-scroll-rail-dock';
const EDGE_PX = 96;
const VERT_W = 84;
const VERT_H = () => Math.min(window.innerHeight - 140, 460);

const ScrollProgress: React.FC<ScrollProgressProps> = ({ progress, activeId }) => {
  const [minimized, setMinimized] = useState(false);
  const [dock, setDock] = useState<Dock>('bottom');
  const [dragging, setDragging] = useState(false);
  const [floatPos, setFloatPos] = useState<{ left: number; top: number } | null>(null);
  const [pointerX, setPointerX] = useState(0);

  const fillPct = `${Math.max(progress * 100, progress > 0 ? 2 : 0)}%`;

  const railRef = useRef<HTMLElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const startSize = useRef({ w: 0, h: 0 });

  useEffect(() => {
    try {
      setMinimized(localStorage.getItem(MIN_KEY) === '1');
      const saved = localStorage.getItem(DOCK_KEY);
      if (saved === 'left' || saved === 'right' || saved === 'bottom') setDock(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const persistDock = (next: Dock) => {
    setDock(next);
    try {
      localStorage.setItem(DOCK_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleMinimized = () => {
    setMinimized((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MIN_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const resolveDock = useCallback((clientX: number): Dock => {
    const w = window.innerWidth;
    if (clientX <= EDGE_PX) return 'left';
    if (clientX >= w - EDGE_PX) return 'right';
    return 'bottom';
  }, []);

  const edgePreview = dragging ? resolveDock(pointerX) : null;
  const previewSide = edgePreview === 'left' || edgePreview === 'right' ? edgePreview : null;
  const vertical = dragging
    ? Boolean(previewSide)
    : dock === 'left' || dock === 'right';
  const layoutDock: Dock = dragging ? (previewSide ?? 'bottom') : dock;

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging) return;
      setPointerX(e.clientX);
      const nextDock = resolveDock(e.clientX);
      if (nextDock === 'left') {
        setFloatPos({
          left: 10,
          top: Math.min(
            Math.max(72, e.clientY - dragOffset.current.y),
            window.innerHeight - VERT_H() - 24
          ),
        });
      } else if (nextDock === 'right') {
        setFloatPos({
          left: window.innerWidth - VERT_W - 10,
          top: Math.min(
            Math.max(72, e.clientY - dragOffset.current.y),
            window.innerHeight - VERT_H() - 24
          ),
        });
      } else {
        setFloatPos({
          left: e.clientX - dragOffset.current.x,
          top: e.clientY - dragOffset.current.y,
        });
      }
    },
    [dragging, resolveDock]
  );

  const onPointerUp = useCallback(
    (e: PointerEvent) => {
      if (!dragging) return;
      persistDock(resolveDock(e.clientX));
      setFloatPos(null);
      setDragging(false);
    },
    [dragging, resolveDock]
  );

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [dragging, onPointerMove, onPointerUp]);

  const onDragHandleDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = railRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    startSize.current = { w: rect.width, h: rect.height };
    setPointerX(e.clientX);
    setFloatPos({ left: rect.left, top: rect.top });
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const expandIcon = vertical
    ? layoutDock === 'left'
      ? <ChevronRight size={12} strokeWidth={2.25} />
      : <ChevronLeft size={12} strokeWidth={2.25} />
    : <ChevronUp size={12} strokeWidth={2.25} />;
  const collapseIcon = vertical
    ? layoutDock === 'left'
      ? <ChevronLeft size={12} strokeWidth={2.25} />
      : <ChevronRight size={12} strokeWidth={2.25} />
    : <ChevronDown size={12} strokeWidth={2.25} />;

  const morphProgress = (() => {
    if (!dragging) return 0;
    const w = window.innerWidth;
    if (pointerX <= EDGE_PX) return 1;
    if (pointerX >= w - EDGE_PX) return 1;
    const leftZone = EDGE_PX * 2.2;
    const rightZone = w - EDGE_PX * 2.2;
    if (pointerX < leftZone) return Math.max(0, 1 - (pointerX - EDGE_PX) / (leftZone - EDGE_PX));
    if (pointerX > rightZone) return Math.max(0, 1 - (w - EDGE_PX - pointerX) / (w - EDGE_PX - rightZone));
    return 0;
  })();

  const floatStyle: React.CSSProperties | undefined =
    dragging && floatPos
      ? previewSide
        ? {
            left: floatPos.left,
            top: floatPos.top,
            right: 'auto',
            bottom: 'auto',
            width: minimized ? 20 : VERT_W,
            height: VERT_H(),
            transition: 'width 0.22s ease, height 0.22s ease, left 0.18s ease',
          }
        : {
            left: floatPos.left,
            top: floatPos.top,
            right: 'auto',
            bottom: 'auto',
            width: startSize.current.w || undefined,
            height: startSize.current.h || undefined,
            // Hint rotation / squash as user approaches an edge
            transform: morphProgress
              ? `rotate(${morphProgress * (pointerX < window.innerWidth / 2 ? -12 : 12)}deg) scale(${
                  1 - morphProgress * 0.28
                }, ${1 + morphProgress * 0.35})`
              : undefined,
            transformOrigin: pointerX < window.innerWidth / 2 ? 'left center' : 'right center',
            transition: morphProgress ? 'transform 0.12s ease' : undefined,
          }
      : undefined;

  return (
    <aside
      ref={railRef}
      className={[
        'scroll-rail',
        minimized ? 'is-minimized' : '',
        dragging ? 'is-dragging' : `is-dock-${dock}`,
        previewSide ? `is-preview-${previewSide} is-drag-vertical` : '',
        morphProgress > 0.15 && !previewSide ? 'is-morphing' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={floatStyle}
      aria-label="Portfolio progress"
    >
      {dragging && morphProgress > 0.2 && (
        <p className="scroll-rail__hint" aria-live="polite">
          {previewSide
            ? `Release to dock ${previewSide}`
            : `Keep dragging ${pointerX < window.innerWidth / 2 ? 'left' : 'right'} to dock vertically`}
        </p>
      )}

      <div className="scroll-rail__top">
        {!minimized ? (
          <span className="scroll-rail__brand">ANMOL / PORTFOLIO</span>
        ) : (
          <span className="scroll-rail__brand scroll-rail__brand--slim" aria-hidden="true" />
        )}
        <div className="scroll-rail__chrome">
          <button
            type="button"
            className="scroll-rail__drag"
            onPointerDown={onDragHandleDown}
            aria-label="Drag navigation. Drop on left or right edge to dock vertically."
            title="Drag to move. Drop on left or right edge for vertical."
          >
            <GripHorizontal size={12} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            className="scroll-rail__minimize"
            onClick={toggleMinimized}
            aria-expanded={!minimized}
            aria-label={minimized ? 'Expand navigation' : 'Minimize navigation'}
            title={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? expandIcon : collapseIcon}
          </button>
        </div>
        {!minimized ? (
          <span className="scroll-rail__pct">
            {String(Math.round(progress * 100)).padStart(2, '0')}%
          </span>
        ) : (
          <span className="scroll-rail__pct scroll-rail__pct--slim" aria-hidden="true" />
        )}
      </div>

      <div className="scroll-rail__track">
        <div
          className="scroll-rail__fill"
          style={
            vertical
              ? { height: fillPct, width: '100%', transformOrigin: 'top center' }
              : { width: fillPct, height: '100%', transformOrigin: 'left center' }
          }
        />
        {!minimized && (
          <div
            className="scroll-rail__segments"
            style={
              vertical
                ? { gridTemplateRows: `repeat(${STORY_CHAPTERS.length}, 1fr)` }
                : { gridTemplateColumns: `repeat(${STORY_CHAPTERS.length}, 1fr)` }
            }
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
        )}
      </div>
    </aside>
  );
};

export default ScrollProgress;
