/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: true, // Disables Tailwind's CSS reset
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
