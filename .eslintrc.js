module.exports = {
  extends: ["plugin:prettier/recommended"],
  plugins: ["sort-requires"],
  rules: {
    "prettier/prettier": "error",
    "sort-requires/sort-requires": "error"
  },
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2017
  }
};
