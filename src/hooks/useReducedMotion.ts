import { useEffect, useState } from 'react';

/** True when the user prefers reduced motion. */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduce(mq.matches);
      document.documentElement.dataset.motion = mq.matches ? 'reduce' : 'ok';
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return reduce;
}
