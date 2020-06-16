module.exports = {
  twin: {
    config: "./tailwind.config.js",
    preset: "emotion",
    hasSuggestions: true,
    debug: true
  },
  tailwind: {
    styled: "@emotion/styled",
    config: "./tailwind.config.js",
    format: "auto"
  }
};
