import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5B8CFF',
          50: '#EEF3FF',
          100: '#DFE9FF',
          200: '#C1D4FF',
          300: '#A3BFFF',
          400: '#85AAFF',
          500: '#5B8CFF',
          600: '#3C6CE6',
          700: '#2C52B4',
          800: '#1D3982',
          900: '#102050'
        }
      }
    }
  },
  plugins: []
} satisfies Config
