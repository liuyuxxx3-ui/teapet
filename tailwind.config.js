/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // 古风柳叶绿色系
        'willow': {
          DEFAULT: '#4A7C59',
          light: '#8FBC8F',
          dark: '#2D5A3D',
          50: '#F0F7F2',
          100: '#D9EBDE',
          200: '#B3D7BD',
          300: '#8DC39C',
          400: '#67AF7B',
          500: '#4A7C59',
          600: '#3D6649',
          700: '#305039',
          800: '#233A29',
          900: '#162419',
        },
        'jade': {
          DEFAULT: '#00A86B',
          light: '#4DD196',
          dark: '#007A4E',
        },
        'bamboo': {
          DEFAULT: '#7CB342',
          light: '#AED581',
          dark: '#558B2F',
        },
        'rice': {
          DEFAULT: '#F5F5DC',
          light: '#FAFAF0',
          dark: '#E8E8D0',
        },
        'ink': {
          DEFAULT: '#2C3E50',
          light: '#4A6278',
          dark: '#1A252F',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', 'STKaiti', 'KaiTi', 'sans-serif'],
        ancient: ['STKaiti', 'KaiTi', 'serif'],
      },
      backgroundImage: {
        'gradient-willow': 'linear-gradient(135deg, #4A7C59 0%, #8FBC8F 100%)',
        'gradient-jade': 'linear-gradient(135deg, #00A86B 0%, #4DD196 100%)',
        'gradient-ancient': 'linear-gradient(135deg, #F5F5DC 0%, #E8E8D0 100%)',
        'gradient-ink': 'linear-gradient(135deg, #2C3E50 0%, #4A6278 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'willow-sway': 'willow-sway 4s ease-in-out infinite',
        'leaf-fall': 'leaf-fall 8s linear infinite',
        'ink-spread': 'ink-spread 2s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'willow-sway': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'leaf-fall': {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        'ink-spread': {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(74, 124, 89, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(74, 124, 89, 0.8), 0 0 40px rgba(143, 188, 143, 0.4)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
