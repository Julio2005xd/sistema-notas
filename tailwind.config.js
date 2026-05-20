/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50:  '#f4f6fb',
          100: '#e8edf7',
          200: '#d0d9ef',
          300: '#a8b8dd',
          400: '#6e8ac7',
          500: '#3a5aab',
          600: '#1e3d8a',
          700: '#172d6e',
          800: '#111f52',
          900: '#132b88',   // textos oscuros
          950: '#090f28',
        },
        navy: {
          DEFAULT: '#1232a5',
          light:   '#253059',
          dark:    '#002179',
        },
        mint: {
          50:  '#f4ffe8',
          100: '#e2ffc0',
          200: '#c6ff87',
          300: '#a3f54e',
          400: '#7FE033',   // acento verde lima
          500: '#64c420',
          600: '#4d9e14',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'ocean-sm': '0 2px 12px 0 rgba(30,86,239,0.10)',
        'ocean-md': '0 4px 24px 0 rgba(30,86,239,0.15)',
        'ocean-lg': '0 8px 40px 0 rgba(30,86,239,0.18)',
        'mint-sm':  '0 2px 12px 0 rgba(15,184,151,0.12)',
      },
    },
  },
  plugins: [],
}
