/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js",'turbo'],
  plugins: ['turbo'],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      files: ["./apps/user-app/**/*.tsx", "./apps/merchant-app/**/*.tsx"],
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
};
