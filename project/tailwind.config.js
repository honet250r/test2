/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 0.6s ease-in-out 2',
        particle: 'particle 1.5s ease-out forwards',
      },
      fontSize: {
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      colors: {
        blue: {
          500: '#4361EE',
          600: '#3A56D4',
          700: '#2A3EB1',
          800: '#1C2A7A',
        },
        yellow: {
          500: '#FFC107',
        },
        green: {
          500: '#4CAF50',
        },
        red: {
          500: '#F44336',
        },
      },
    },
  },
  plugins: [],
};