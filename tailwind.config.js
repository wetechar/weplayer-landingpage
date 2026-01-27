/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1498D5',
        'brand-primary': '#0891b2',
        'brand-accent': '#06b6d4',
        'brand-dark': '#0f172a',
        'brand-light': '#f8fafc',
      },
    },
  },
  plugins: [],
}
