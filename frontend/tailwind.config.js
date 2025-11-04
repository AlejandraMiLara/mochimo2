/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        neon: '0 0 6px rgba(236,72,153,0.8), 0 0 12px rgba(168,85,247,0.7)',
      },
      backgroundImage: {
        'gta-sunset': 'linear-gradient(to bottom, #0a0014, #0b031f 30%, #0f1228)',
      },
      colors: {
        brand: {
          pink: '#ec4899',
          violet: '#8b5cf6',
          aqua: '#22d3ee',
        }
      },
      fontFamily: {
        display: ['"Lobster Two"', 'cursive'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
