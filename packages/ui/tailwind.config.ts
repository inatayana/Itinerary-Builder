/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4F72',
          50: '#EBF5FB',
          100: '#D6EAF8',
          200: '#AED6F1',
          300: '#85C1E9',
          400: '#5DADE2',
          500: '#3498DB',
          600: '#2E86C1',
          700: '#2471A3',
          800: '#1B4F72',
          900: '#154360',
        },
        accent: {
          DEFAULT: '#E67E22',
          50: '#FDF2E9',
          100: '#FAD7A0',
          200: '#F5CBA7',
          300: '#F0B27A',
          400: '#E67E22',
          500: '#D35400',
          600: '#BA4A00',
        },
        surface: {
          DEFAULT: '#F8F9FA',
          dark: '#1C1C1C',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'elevated': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
