const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

module.exports = () => ({
  plugins: [tailwind(`./tailwind.config.js`), autoprefixer, postcssImport]
});
