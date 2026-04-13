import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0a2218',
          50: '#e8f5ee',
          100: '#c5e4d0',
          200: '#9ecfb0',
          300: '#74b98e',
          400: '#4fa871',
          500: '#2d9655',
          600: '#1e7040',
          700: '#133326',
          800: '#0a2218',
          900: '#050f0b',
        },
        amber: {
          DEFAULT: '#e8861a',
          light: '#fdf0e0',
          dark: '#c96f0e',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease',
        'slide-in': 'slideIn 0.25s ease',
        'ticker': 'ticker 30s linear infinite',
        'spin-slow': 'spin 0.7s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
