module.exports = {
  content: ["./public/**/*.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["karla"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
