import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sentinel: {
          bg: "#0a0f1a",
          surface: "rgba(255,255,255,0.05)",
          accent: "#3b82f6",
          accentLight: "#60a5fa",
          glow: "#22d3ee",
          safe: "#22c55e",
          warning: "#f59e0b",
          danger: "#ef4444",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-canvas":
          "linear-gradient(135deg, #0a0f1a 0%, #0d1424 50%, #0a0f1a 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 0 20px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        glassHover: "0 0 30px rgba(34, 211, 238, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
