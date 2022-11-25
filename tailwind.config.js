/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      flexGrow: {
        2: 2,
      },
    },
  },
  plugins: [],
  variants: {
    textColor: ["group-hover"],
  },
  safelist: [
    "text-blue-400",
    "text-pink-500",
    "text-green-400",
    "text-red-500",
    "group-hover:text-blue-400",
    "group-hover:text-green-400",
    "group-hover:text-pink-500",
  ],
};
