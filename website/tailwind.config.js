module.exports = {
  darkMode: ["class", "[data-theme=\"dark\"]"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{js,ts,jsx,tsx,mdx}",
    "../docs/**/*.{md,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {},
    },
  },
};
