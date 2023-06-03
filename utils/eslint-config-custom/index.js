module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["simple-import-sort", "unused-imports"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  },
};
