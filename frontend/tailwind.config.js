/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#faf8f3',
          100: '#f5f1ea',
          200: '#ede7dd',
          300: '#e4dbd1',
          400: '#d9cdc2',
          500: '#c9b8a8',
          600: '#b39a8a',
          700: '#9d856d',
          800: '#7a6956',
        },
      },
      animation: {
        slideInDown: 'slideInDown 0.3s ease-out',
        slideInUp: 'slideInUp 0.3s ease-out',
        fadeInScale: 'fadeInScale 0.3s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        slideInDown: {
          'from': {
            'transform': 'translateY(-10px)',
            'opacity': '0',
          },
          'to': {
            'transform': 'translateY(0)',
            'opacity': '1',
          },
        },
        slideInUp: {
          'from': {
            'transform': 'translateY(10px)',
            'opacity': '0',
          },
          'to': {
            'transform': 'translateY(0)',
            'opacity': '1',
          },
        },
        fadeInScale: {
          'from': {
            'transform': 'scale(0.95)',
            'opacity': '0',
          },
          'to': {
            'transform': 'scale(1)',
            'opacity': '1',
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-1000px 0',
          },
          '100%': {
            'background-position': '1000px 0',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
