import { SITE_LINKS } from '../story/links';

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  avatar?: string;
  realName?: string;
}

/** Fallback so the section still renders if every live source is down. */
export const LEETCODE_FALLBACK: LeetCodeStats = {
  username: SITE_LINKS.leetcodeUsername,
  totalSolved: 637,
  totalQuestions: 4013,
  easySolved: 215,
  mediumSolved: 335,
  hardSolved: 87,
  totalEasy: 958,
  totalMedium: 2095,
  totalHard: 960,
  acceptanceRate: 79.36,
  ranking: 118770,
  contributionPoints: 94,
  reputation: 0,
  submissionCalendar: {},
};

type TashifPayload = {
  status?: string;
  totalSolved?: number;
  totalQuestions?: number;
  easySolved?: number;
  totalEasy?: number;
  mediumSolved?: number;
  totalMedium?: number;
  hardSolved?: number;
  totalHard?: number;
  acceptanceRate?: number;
  ranking?: number;
  contributionPoints?: number;
  reputation?: number;
  submissionCalendar?: Record<string, number>;
};

type PiedPayload = {
  username?: string;
  profile?: { userAvatar?: string; realName?: string; ranking?: number };
  submitStats?: {
    acSubmissionNum?: { difficulty: string; count: number; submissions: number }[];
  };
};

function fromTashif(data: TashifPayload, username: string): LeetCodeStats | null {
  if (typeof data.totalSolved !== 'number') return null;
  return {
    username,
    totalSolved: data.totalSolved,
    totalQuestions: data.totalQuestions ?? 0,
    easySolved: data.easySolved ?? 0,
    mediumSolved: data.mediumSolved ?? 0,
    hardSolved: data.hardSolved ?? 0,
    totalEasy: data.totalEasy ?? 0,
    totalMedium: data.totalMedium ?? 0,
    totalHard: data.totalHard ?? 0,
    acceptanceRate: data.acceptanceRate ?? 0,
    ranking: data.ranking ?? 0,
    contributionPoints: data.contributionPoints ?? 0,
    reputation: data.reputation ?? 0,
    submissionCalendar: data.submissionCalendar ?? {},
  };
}

function fromPied(data: PiedPayload, username: string): LeetCodeStats | null {
  const ac = data.submitStats?.acSubmissionNum;
  if (!ac?.length) return null;
  const by = Object.fromEntries(ac.map((row) => [row.difficulty, row.count]));
  return {
    username: data.username ?? username,
    totalSolved: by.All ?? 0,
    totalQuestions: LEETCODE_FALLBACK.totalQuestions,
    easySolved: by.Easy ?? 0,
    mediumSolved: by.Medium ?? 0,
    hardSolved: by.Hard ?? 0,
    totalEasy: LEETCODE_FALLBACK.totalEasy,
    totalMedium: LEETCODE_FALLBACK.totalMedium,
    totalHard: LEETCODE_FALLBACK.totalHard,
    acceptanceRate: LEETCODE_FALLBACK.acceptanceRate,
    ranking: data.profile?.ranking ?? 0,
    contributionPoints: 0,
    reputation: 0,
    submissionCalendar: {},
    avatar: data.profile?.userAvatar,
    realName: data.profile?.realName,
  };
}

async function tryFetch(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function withCacheBust(url: string, bust: boolean): string {
  if (!bust) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}_=${Date.now()}`;
}

/**
 * Live stats for SITE_LINKS.leetcodeUsername.
 * Prefers the site API (Netlify function), then public CORS mirrors.
 */
export async function fetchLeetCodeStats(
  username = SITE_LINKS.leetcodeUsername,
  options?: { bustCache?: boolean }
): Promise<{ stats: LeetCodeStats; live: boolean }> {
  const bust = options?.bustCache ?? false;
  const sources: { url: string; parse: (data: unknown) => LeetCodeStats | null }[] = [
    {
      url: `/api/leetcode?username=${encodeURIComponent(username)}`,
      parse: (data) => fromTashif(data as TashifPayload, username),
    },
    {
      url: `https://leetcode-stats.tashif.codes/${encodeURIComponent(username)}`,
      parse: (data) => fromTashif(data as TashifPayload, username),
    },
    {
      url: `https://leetcode-api-pied.vercel.app/user/${encodeURIComponent(username)}`,
      parse: (data) => fromPied(data as PiedPayload, username),
    },
  ];

  for (const source of sources) {
    const raw = await tryFetch(withCacheBust(source.url, bust));
    if (!raw) continue;
    const stats = source.parse(raw);
    if (stats && stats.totalSolved > 0) {
      return { stats, live: true };
    }
  }

  return { stats: LEETCODE_FALLBACK, live: false };
}

export function difficultyPct(solved: number, total: number): number {
  if (!total) return 0;
  return Math.min(100, Math.round((solved / total) * 100));
}

/** Build a year-long calendar grid (Sun→Sat rows) from LeetCode submission stamps. */
export function buildHeatmapDays(
  calendar: Record<string, number>,
  weeks = 53
): { date: Date; count: number; level: 0 | 1 | 2 | 3 | 4 }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay();
  const totalDays = weeks * 7 + dayOfWeek + 1;
  const start = new Date(today);
  start.setDate(start.getDate() - (totalDays - 1));

  const days: { date: Date; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const ts = Math.floor(d.getTime() / 1000).toString();
    // LeetCode calendar keys are UTC midnight unix seconds
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 1000;
    const count = Number(calendar[String(utc)] ?? calendar[ts] ?? 0);
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 10) level = 4;
    else if (count >= 6) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;
    days.push({ date: d, count, level });
  }
  return days;
}
