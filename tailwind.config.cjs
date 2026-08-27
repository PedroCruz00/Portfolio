/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0a0a1a",
          secondary: "#12122a",
        },
        accent: {
          DEFAULT: "#7c3aed",
          hover: "#6d28d9",
          light: "#a78bfa",
        },
        light: {
          DEFAULT: "#e2e8f0",
        },
        highlight: {
          DEFAULT: "#06b6d4",
        },
        cosmic: {
          purple: "#7c3aed",
          cyan: "#06b6d4",
          pink: "#ec4899",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans Condensed'", "sans-serif"],
      },
      dropShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.6)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.6)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.6)",
      },
      boxShadow: {
        cosmic: "0 0 60px rgba(124, 58, 237, 0.3), 0 0 100px rgba(6, 182, 212, 0.2)",
        "cosmic-sm": "0 0 20px rgba(124, 58, 237, 0.3)",
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #ec4899 100%)",
        "cosmic-radial": "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
        "stars": "radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
