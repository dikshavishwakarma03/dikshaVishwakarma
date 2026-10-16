/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundSize: { 400: '400% 400%' },
      keyframes: {
        'nav-drop': {
          from: { opacity: '0', transform: 'translateY(-28px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'nav-fade-up': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'nav-drop': 'nav-drop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'nav-fade-up': 'nav-fade-up 0.5s ease both',
        'fade-up': 'fade-up 0.6s ease both',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'gradient-move': 'gradient-move 12s ease infinite',
      },
    },
  },
  plugins: [],
};