module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // black: "#2d3436",
        primary: "#8b5cf6",
        secondary: "#6366f1",
        secondaryLight: "6366f1",
        tertiary: "#414141",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
