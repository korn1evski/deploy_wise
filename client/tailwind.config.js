/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundColor: {
      primary: "var(--color-bg-primary)",
      secondary: "var(--color-bg-secondary)",
      tertiary: "var(--color-bg-tertiary)",
      menu: "var(--color-bg-menu)",
    },
    textColor:{
      primary: "var(--color-text-primary)",
    },
    boxShadow: {
      topBar: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      card: "0px 1px 5px 0px #6CA69F",
    },
  },
  plugins: [],
};
