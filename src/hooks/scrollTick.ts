type Listener = () => void;

const listeners = new Set<Listener>();
let raf = 0;
let scheduled = false;
let attached = false;

function flush() {
  scheduled = false;
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* keep other listeners alive */
    }
  });
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  raf = requestAnimationFrame(flush);
}

function attach() {
  if (attached) return;
  attached = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function detach() {
  if (!attached) return;
  attached = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  cancelAnimationFrame(raf);
  scheduled = false;
  raf = 0;
}

/**
 * Shared scroll bus — only ticks on scroll/resize (not a permanent rAF loop).
 */
export function subscribeScrollTick(fn: Listener): () => void {
  listeners.add(fn);
  attach();
  try {
    fn();
  } catch {
    /* ignore */
  }
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) detach();
  };
}
