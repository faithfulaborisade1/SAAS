module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6', // This is blue-500 in Tailwind
          secondary: '#10B981', // This is emerald-500 in Tailwind
          dark: '#1F2937', // This is gray-800 in Tailwind
        },
      },
    },
    plugins: [],
  }