const tseslint = require("typescript-eslint");

/** @type {import("eslint").Linter.Config} */
module.exports = tseslint.config(
  {
    ignores: ["apps/**", "packages/**"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
