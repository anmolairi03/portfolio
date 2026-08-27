import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import {
  fetchLinkedInProfileFromWeb,
  type LinkedInProfile,
} from './src/lib/linkedin-server';

function linkedInDevApi(): Plugin {
  return {
    name: 'linkedin-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/linkedin')) return next();

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        const username = url.searchParams.get('username') || 'anmol809';

        try {
          const profile = await fetchLinkedInProfileFromWeb(username);
          if (!profile) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'error', message: 'unavailable' }));
            return;
          }

          const payload: LinkedInProfile & { status: string } = {
            status: 'success',
            ...profile,
          };

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(payload));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'error',
              message: err instanceof Error ? err.message : 'fetch failed',
            })
          );
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), linkedInDevApi()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/leetcode': {
        target: 'https://leetcode-stats.tashif.codes',
        changeOrigin: true,
        rewrite: () => '/zeus408809',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
});
