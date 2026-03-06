import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "monospace"],
    },
    extend: {
      colors: {
        background: "#050510",
        foreground: "#e0e0ff",
        "neon-blue": "#00a3ff",
        "neon-purple": "#9333ea",
        "electric-cyan": "#00f0ff",
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(0, 163, 255, 0.5)",
        "neon-purple": "0 0 20px rgba(147, 51, 234, 0.5)",
        "neon-cyan": "0 0 20px rgba(0, 240, 255, 0.5)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
