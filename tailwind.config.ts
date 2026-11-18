import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0B5C3F',
          dark: '#073D29',
          light: '#E8F3EE',
          muted: '#157A56',
        },
        surface: {
          DEFAULT: '#F6F8F6',
          card: '#FFFFFF',
          border: '#E2E8E4',
        },
        ink: {
          DEFAULT: '#111827',
          secondary: '#4B5563',
          muted: '#6B7280',
        },
        accent: {
          yellow: '#F5B301',
          'yellow-bg': '#FEF9E7',
          'yellow-border': '#F5D67B',
        },
        danger: {
          DEFAULT: '#D92D20',
          bg: '#FEF3F2',
          border: '#FECDCA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(7, 61, 41, 0.06), 0 1px 2px -1px rgba(7, 61, 41, 0.04)',
        'card-hover': '0 14px 32px -8px rgba(7, 61, 41, 0.14), 0 4px 12px -4px rgba(11, 92, 63, 0.08)',
        glow: '0 0 0 1px rgba(11, 92, 63, 0.12), 0 12px 30px -8px rgba(11, 92, 63, 0.22)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pop: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 16px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'dropdown-in': {
          '0%': { opacity: '0', transform: 'translate3d(0, -6px, 0) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        'tab-in': {
          '0%': { opacity: '0', transform: 'translate3d(0, 8px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'check-pop': {
          '0%': { transform: 'scale(0.82)' },
          '55%': { transform: 'scale(1.16)' },
          '100%': { transform: 'scale(1)' },
        },
        'orb-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(24px, -18px, 0) scale(1.08)' },
        },
        'orb-drift-reverse': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-22px, 16px, 0) scale(1.06)' },
        },
        'bar-rise': {
          '0%': { transform: 'scaleY(0)', opacity: '0.4' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        'value-flash': {
          '0%': { transform: 'scale(1.06)', color: '#0B5C3F' },
          '100%': { transform: 'scale(1)', color: '#0B5C3F' },
        },
      },
      animation: {
        'fade-up': 'fade-up 560ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'dropdown-in': 'dropdown-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'tab-in': 'tab-in 260ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'check-pop': 'check-pop 280ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'orb-drift': 'orb-drift 16s ease-in-out infinite',
        'orb-drift-reverse': 'orb-drift-reverse 20s ease-in-out infinite',
        'bar-rise': 'bar-rise 640ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'value-flash': 'value-flash 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
