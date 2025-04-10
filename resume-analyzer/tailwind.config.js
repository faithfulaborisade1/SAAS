/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // This is blue-500 in Tailwind
        secondary: '#10B981', // This is emerald-500 in Tailwind
        dark: '#1F2937', // This is gray-800 in Tailwind
      },
      backgroundColor: {
        dark: {
          primary: '#111827', // gray-900
          secondary: '#1F2937', // gray-800
          accent: '#374151', // gray-700
        }
      },
      textColor: {
        dark: {
          primary: '#F9FAFB', // gray-50
          secondary: '#E5E7EB', // gray-200
          muted: '#9CA3AF', // gray-400
        }
      },
      borderColor: {
        dark: {
          DEFAULT: '#374151', // gray-700
          accent: '#4B5563', // gray-600
        }
      },
    },
  },
  plugins: [],
}