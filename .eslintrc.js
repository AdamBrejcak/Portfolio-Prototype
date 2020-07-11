module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": "off",
    "no-alert": "off",
    "no-restricted-globals": "off",
    "no-debugger": "off",
    "lines-between-class-members": "off",
    "class-methods-use-this": "off",
    quotes: ["error", "double"],
  },
};
