import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: [
          '"Inter"',
          '"Anuphan"',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
        sans: [
          '"Inter"',
          '"Anuphan"',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
        mono: [
          '"Inter"',
          '"Anuphan"',
          'ui-monospace',
          'monospace'
        ]
      },
      colors: {
        labWhite: '#F6F9F7',
        forestInk: '#022C22',
        electricGreen: '#00D26A',
        cyberObsidian: '#020806',
        bioMint: '#00FF88',
        mintSoft: '#E6F8EE',
        emeraldAccent: '#00C864'
      },
      animation: {
        'marquee-fast': 'marquee 22s linear infinite',
        'marquee-reverse': 'marqueeReverse 26s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
