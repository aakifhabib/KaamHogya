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
        'card-hover': '0 10px 25px -5px rgba(7, 61, 41, 0.09), 0 4px 10px -6px rgba(7, 61, 41, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
