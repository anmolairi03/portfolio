import type { Config, Context } from '@netlify/functions';

const USERNAME = 'zeus408809';

type StatsPayload = {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  avatar?: string;
  realName?: string;
  username: string;
};

async function fetchFromTashif(username: string): Promise<StatsPayload | null> {
  const res = await fetch(`https://leetcode-stats.tashif.codes/${encodeURIComponent(username)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as StatsPayload & { status?: string };
  if (typeof data.totalSolved !== 'number') return null;
  return {
    ...data,
    status: 'success',
    message: 'retrieved',
    username,
  };
}

async function fetchFromPied(username: string): Promise<StatsPayload | null> {
  const res = await fetch(
    `https://leetcode-api-pied.vercel.app/user/${encodeURIComponent(username)}`,
    { headers: { Accept: 'application/json' } }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    username?: string;
    profile?: { userAvatar?: string; realName?: string; ranking?: number };
    submitStats?: {
      acSubmissionNum?: { difficulty: string; count: number; submissions: number }[];
    };
  };
  const ac = data.submitStats?.acSubmissionNum;
  if (!ac?.length) return null;
  const by = Object.fromEntries(ac.map((row) => [row.difficulty, row.count]));
  return {
    status: 'success',
    message: 'retrieved',
    username: data.username ?? username,
    totalSolved: by.All ?? 0,
    totalQuestions: 4013,
    easySolved: by.Easy ?? 0,
    totalEasy: 958,
    mediumSolved: by.Medium ?? 0,
    totalMedium: 2095,
    hardSolved: by.Hard ?? 0,
    totalHard: 960,
    acceptanceRate: 0,
    ranking: data.profile?.ranking ?? 0,
    contributionPoints: 0,
    reputation: 0,
    submissionCalendar: {},
    avatar: data.profile?.userAvatar,
    realName: data.profile?.realName,
  };
}

export default async (req: Request, _context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const username = url.searchParams.get('username') || USERNAME;

  try {
    const stats =
      (await fetchFromTashif(username)) ?? (await fetchFromPied(username));

    if (!stats) {
      return new Response(JSON.stringify({ status: 'error', message: 'unavailable' }), {
        status: 502,
        headers: {
          ...corsHeaders(),
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: err instanceof Error ? err.message : 'fetch failed',
      }),
      {
        status: 500,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      }
    );
  }
};

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export const config: Config = {
  path: '/api/leetcode',
};
