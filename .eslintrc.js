module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "react-app",
    "plugin:no-unsanitized/DOM",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  plugins: ["react", "prettier", "no-unsanitized", "jsx-a11y"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  settings: { "import/resolver": "webpack" },
  globals: {
    __PATH_PREFIX__: true
  }
};
