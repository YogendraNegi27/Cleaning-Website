/** @type {import('tailwindcss').Config} */
export default {
  // Scan all React component files for class names
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom brand colors inspired by JaniKing & MollyMaid
      colors: {
        primary: {
          50:  "#e8f5ff",
          100: "#c3e3ff",
          500: "#0057a8",   // Deep royal blue — trust & professionalism
          600: "#00479a",
          700: "#003a82",
          800: "#002d6a",
          900: "#001f4d",
        },
        accent: {
          400: "#fbbf24",   // Warm amber — energy & cleanliness
          500: "#f59e0b",
          600: "#d97706",
        },
        clean: {
          50: "#f0fdf4",    // Fresh green tones — hygiene feel
          500: "#22c55e",
          600: "#16a34a",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}
