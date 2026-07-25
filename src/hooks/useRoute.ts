import { useEffect, useState } from 'react';

/** Paths the SPA actually renders. Anything else falls to the 404 page. */
const KNOWN_PATHS = new Set(['/', '/index.html']);

export function isKnownPath(pathname: string): boolean {
  return KNOWN_PATHS.has(pathname);
}

/** True when an href is missing, blank, or a placeholder like "#" or "TODO". */
export function isUnsetLink(href?: string | null): boolean {
  if (!href) return true;
  const v = href.trim();
  if (v === '' || v === '#' || v === 'about:blank') return true;
  return /^(todo|tbd|coming[-\s]?soon|placeholder)$/i.test(v);
}

/** Send the visitor to the 404 page, recording why. */
export function goToNotFound(reason: 'route' | 'unset' = 'route') {
  window.location.assign(`/404?reason=${reason}`);
}

/**
 * href for anchors: real links pass through, unset ones point at /404
 * so a click never dead-ends on the current page.
 */
export function safeHref(href?: string | null): string {
  return isUnsetLink(href) ? '/404?reason=unset' : (href as string);
}

/** Minimal client-side location watcher (no router dependency). */
export function usePathname(): string {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return pathname;
}

/** Reads ?reason= so /404 can explain what went wrong. */
export function useNotFoundReason(): 'route' | 'unset' | 'error' {
  if (typeof window === 'undefined') return 'route';
  const value = new URLSearchParams(window.location.search).get('reason');
  return value === 'unset' || value === 'error' ? value : 'route';
}