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
    "group-hover:text-red-500",
    "bg-pink-500",
    "bg-blue-400",
    "bg-green-400",
    "bg-red-500",
    "group-hover:bg-pink-500",
    "group-hover:bg-blue-400",
    "group-hover:bg-green-400",
    "group-hover:bg-red-500",
  ],
};
