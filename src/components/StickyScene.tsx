import React, { useEffect, useRef, useState } from 'react';

interface StickySceneProps {
  /** Number of chapters / beats inside the scene */
  count: number;
  /** Viewport heights per chapter (svh units). Desktop default ~100–115 */
  heightPerChapter?: number;
  /** Mobile height per chapter */
  mobileHeightPerChapter?: number;
  children: (state: {
    active: number;
    progress: number;
    local: number;
    jumpTo: (index: number) => void;
  }) => React.ReactNode;
  className?: string;
  id?: string;
  theme?: string;
}

/**
 * Sticky scroll scene with consistent svh math (no vh/svh mismatch).
 */
const StickyScene: React.FC<StickySceneProps> = ({
  count,
  heightPerChapter = 100,
  mobileHeightPerChapter = 85,
  children,
  className = '',
  id,
  theme = 'core',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [local, setLocal] = useState(0);
  const [per, setPer] = useState(heightPerChapter);

  useEffect(() => {
    const sync = () => {
      setPer(window.innerWidth < 768 ? mobileHeightPerChapter : heightPerChapter);
    };
    sync();
    window.addEventListener('resize', sync, { passive: true });
    return () => window.removeEventListener('resize', sync);
  }, [heightPerChapter, mobileHeightPerChapter]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setActive(0);
        setProgress(0);
        setLocal(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const ratio = scrolled / scrollable;
      const raw = ratio * count;
      const index = Math.min(count - 1, Math.floor(raw));
      setProgress(ratio);
      setActive(index);
      setLocal(Math.min(1, Math.max(0, raw - index)));
      section.style.setProperty('--scene-progress', String(ratio));
      section.style.setProperty('--chapter-local', String(Math.min(1, Math.max(0, raw - index))));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollable = section.offsetHeight - window.innerHeight;
    const top =
      window.scrollY +
      section.getBoundingClientRect().top +
      ((index + 0.12) / count) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      data-theme={theme}
      className={`relative ${className}`}
      style={{ height: `${count * per}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">{children({ active, progress, local, jumpTo })}</div>
    </section>
  );
};

export default StickyScene;
