/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06038D",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#E0E7FF",
          foreground: "#4343ff"
        },
        accent: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff"
        },
        background: "#fdfdfd",
        foreground: "#333333",
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#666666"
        },
        border: "#e5e5e5"
      },
      fontFamily: {
        sans: ["Poppins", 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
