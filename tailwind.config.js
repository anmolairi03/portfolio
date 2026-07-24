/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Charcoal neumorphic surface palette
        ink: {
          DEFAULT: '#23262e',
          base: '#23262e',
          dark: '#1c1f25',
          darker: '#191b21',
          light: '#282c35',
          lighter: '#2d313b',
        },
        // Signature warm accent (medal / championship gold)
        gold: {
          300: '#f6d38a',
          400: '#f2c265',
          500: '#e9ac3f',
          600: '#d1912a',
        },
        // Cool secondary, used sparingly
        teal: {
          300: '#7fded4',
          400: '#5ec8c0',
          500: '#3aa9a1',
        },
      },
      boxShadow: {
        neu: '8px 8px 16px #191b21, -8px -8px 16px #2d313b',
        'neu-sm': '5px 5px 10px #1b1d23, -5px -5px 10px #2b2f37',
        'neu-lg': '12px 12px 24px #17191e, -12px -12px 24px #2f3440',
        'neu-inset': 'inset 5px 5px 10px #191b21, inset -5px -5px 10px #2d313b',
        'neu-pressed': 'inset 6px 6px 12px #17191e, inset -6px -6px 12px #2f3440',
        'gold-glow': '0 0 24px rgba(233, 172, 63, 0.35)',
      },
      keyframes: {
        'gold-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'gold-pulse': 'gold-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
