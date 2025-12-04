module.exports = [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
    },

    ignores: ["node_modules/", "dist/", "coverage/"],

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
      "no-var": "error",
      "prefer-const": "warn",
    },
  },
];
