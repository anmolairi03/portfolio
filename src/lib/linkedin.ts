import { SITE_LINKS } from '../story/links';
import type { LinkedInProfile } from './linkedin-server';

export type { LinkedInProfile };

export const LINKEDIN_FALLBACK_HEADLINE =
  "GenAI/SDE1 | Python, FastAPI, LangChain & LangGraph | Building RAG Pipelines & LLM Applications | CSE Graduate, MAIT'26";

export const LINKEDIN_FALLBACK_ABOUT = `Hi, I'm Anmol Airi, a CSE student at Maharaja Agrasen Institute of Technology (MAIT '26). I build applied AI and backend services with Python, FastAPI, RAG pipelines, and LLM tooling. Before code, national-level athletics taught me consistency under pressure. That same discipline shows up in 600+ LeetCode reps and internships where accuracy and latency were measured, not assumed. Clean interfaces, grounded answers, and systems that hold in production.`;

export const LINKEDIN_FALLBACK: LinkedInProfile = {
  username: SITE_LINKS.linkedinUsername,
  name: 'Anmol Airi',
  headline: LINKEDIN_FALLBACK_HEADLINE,
  about: LINKEDIN_FALLBACK_ABOUT,
  profileImage: '',
  bannerImage: '',
};

type ApiPayload = LinkedInProfile & { status?: string; message?: string };

async function tryFetch(url: string): Promise<ApiPayload | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as ApiPayload;
  } catch {
    return null;
  }
}

function withCacheBust(url: string, bust: boolean): string {
  if (!bust) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}_=${Date.now()}`;
}

function isUsableHeadline(headline: string, about: string): boolean {
  const h = headline.trim();
  if (!h) return false;
  const a = about.trim();
  if (a && (h === a || a.startsWith(h) || h.startsWith(a))) return false;
  if (/connections on LinkedIn|View .+ profile on LinkedIn/i.test(h)) return false;
  if (/^I build backend systems/i.test(h)) return false;
  if (h === 'Ethara AI') return false;
  return h.includes('|') || h.length >= 24;
}

function normalizeProfile(data: ApiPayload, username: string): LinkedInProfile {
  const about = data.about?.trim() || LINKEDIN_FALLBACK.about;
  const headline = isUsableHeadline(data.headline || '', about)
    ? data.headline!.trim()
    : LINKEDIN_FALLBACK_HEADLINE;

  return {
    username: data.username || username,
    name: data.name || LINKEDIN_FALLBACK.name,
    headline,
    about,
    profileImage: data.profileImage || '',
    bannerImage: data.bannerImage || '',
  };
}

/**
 * Live profile for SITE_LINKS.linkedinUsername.
 * Prefers the site API (Netlify function), then direct fetch in dev middleware.
 */
export async function fetchLinkedInProfile(
  username = SITE_LINKS.linkedinUsername,
  options?: { bustCache?: boolean }
): Promise<{ profile: LinkedInProfile; live: boolean }> {
  const bust = options?.bustCache ?? false;
  const url = withCacheBust(
    `/api/linkedin?username=${encodeURIComponent(username)}`,
    bust
  );

  const data = await tryFetch(url);
  if (data?.status === 'success' || (data && (data.about || data.profileImage))) {
    return { profile: normalizeProfile(data, username), live: true };
  }

  return { profile: LINKEDIN_FALLBACK, live: false };
}
