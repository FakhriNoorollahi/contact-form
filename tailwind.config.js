module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["karla"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
