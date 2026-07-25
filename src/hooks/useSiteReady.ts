import { useEffect, useState } from 'react';

const MIN_MS = 900;
const MAX_MS = 10000;
const CRITICAL_ASSETS = ['/Animated_RPM_Wave.glb'];

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function waitForWindowLoad() {
  if (typeof document === 'undefined') return Promise.resolve();
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

function waitForFonts() {
  if (typeof document === 'undefined' || !document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

function preloadAsset(url: string) {
  return fetch(url, { cache: 'force-cache' })
    .then((res) => (res.ok ? res.blob() : null))
    .then(() => undefined)
    .catch(() => undefined);
}

/**
 * Holds the boot splash until fonts, window load, and critical assets are ready.
 * Always resolves within MAX_MS so the site never stays blocked.
 */
export function useSiteReady() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    let cancelled = false;
    const started = performance.now();
    let settled = 0;
    const total = 2 + CRITICAL_ASSETS.length;

    const bump = () => {
      settled += 1;
      if (cancelled) return;
      setProgress(Math.min(96, Math.round((settled / total) * 90) + 8));
    };

    const fonts = waitForFonts().then(bump);
    const win = waitForWindowLoad().then(bump);
    const assets = CRITICAL_ASSETS.map((url) => preloadAsset(url).then(bump));

    const work = Promise.all([fonts, win, ...assets]);

    const finish = async () => {
      const elapsed = performance.now() - started;
      if (elapsed < MIN_MS) await sleep(MIN_MS - elapsed);
      if (cancelled) return;
      setProgress(100);
      await sleep(180);
      if (!cancelled) setReady(true);
    };

    work.then(finish).catch(finish);
    const safety = window.setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setReady(true);
      }
    }, MAX_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, []);

  return { ready, progress };
}