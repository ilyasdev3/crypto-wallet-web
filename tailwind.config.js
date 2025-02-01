// tailwind.config.ts

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary purple/blue colors
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6", // Main purple accent color
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // Dark background colors
        dark: {
          DEFAULT: "#0B0F19", // Main background
          50: "#1A1F2E", // Card background
          100: "#151823", // Lighter card background
          200: "#0F131C", // Darker elements
          300: "#090C14", // Deepest background
        },
        // Accent colors from the UI
        accent: {
          blue: "#2E5BFF", // Chart line blue
          purple: "#8E2DE2", // Gradient purple
          success: "#00F7BF", // Success green
          warning: "#FFB547", // Warning orange
          error: "#FF4757", // Error red
        },
        // Gradient configurations
        gradient: {
          start: "#2E5BFF", // Blue start
          middle: "#8E2DE2", // Purple middle
          end: "#5B21B6", // Dark purple end
        },
      },
      backgroundImage: {
        "gradient-cosmic":
          "linear-gradient(to right bottom, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.15)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
    fontFamily: {
      montserrat: ["montserrat"],
    },
  },
  plugins: [],
};
