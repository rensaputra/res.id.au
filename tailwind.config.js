/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{md,mdx}', './docusaurus.config.ts'],
  theme: {
    extend: {},
  },
  plugins: [],
};
