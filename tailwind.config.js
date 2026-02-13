/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extend Tailwind with our custom colors
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#3b82f6',
          dark: '#1e40af',
        },
        surface: {
          DEFAULT: '#1e293b',
          light: '#334155',
          hover: '#475569',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        'container': '1400px',
      },
      boxShadow: {
        'dark-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px rgba(0, 0, 0, 0.4)',
        'dark-xl': '0 20px 25px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
