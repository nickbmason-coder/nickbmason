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
  plugins: ["react", "prettier", "no-unsanitized", "react-hooks", "jsx-a11y"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": ["error"],
    "react/static-property-placement": ["error", "static public field"],
    "react/forbid-prop-types": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/destructuring-assignment": ["off"],
    "react-hooks/rules-of-hooks": ["error"],
    // I think Gatsby might add nested props (location) that
    // shouldComponentUpdate might fail to catch.
    "react/prefer-stateless-function": ["off"]
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"]
      }
    }
  },
  globals: {
    __PATH_PREFIX__: true
  }
};
