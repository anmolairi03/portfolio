import { useEffect, useState } from 'react';
import { STORY_IDS } from '../story/chapters';

/**
 * Single scroll broker: one passive rAF loop for page progress + active chapter.
 * State updates are throttled so App doesn't re-render every pixel.
 */
export function useScrollBroker() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(STORY_IDS[0]);

  useEffect(() => {
    let frame = 0;
    let lastId = STORY_IDS[0];
    let lastBucket = -1;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      // ~0.5% buckets — enough for the rail, far fewer React renders
      const bucket = Math.round(nextProgress * 200);
      if (bucket !== lastBucket) {
        lastBucket = bucket;
        setProgress(bucket / 200);
        document.documentElement.style.setProperty('--story-progress', String(bucket / 200));
      }

      const focusLine = window.innerHeight * 0.42;
      let current = STORY_IDS[0];
      for (const id of STORY_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= focusLine) {
          current = id;
        }
      }
      if (current !== lastId) {
        lastId = current;
        setActiveId(current);
      }
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
  }, []);

  return { progress, activeId };
}
