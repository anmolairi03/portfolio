import type { Config, Context } from '@netlify/functions';
import {
  fetchLinkedInProfileFromWeb,
  type LinkedInProfile,
} from '../../src/lib/linkedin-server';

const DEFAULT_USERNAME = 'anmol809';

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default async (req: Request, _context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const username = url.searchParams.get('username') || DEFAULT_USERNAME;

  try {
    const profile = await fetchLinkedInProfileFromWeb(username);
    if (!profile) {
      return new Response(JSON.stringify({ status: 'error', message: 'unavailable' }), {
        status: 502,
        headers: {
          ...corsHeaders(),
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    const payload: LinkedInProfile & { status: string } = {
      status: 'success',
      ...profile,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
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

export const config: Config = {
  path: '/api/linkedin',
};
