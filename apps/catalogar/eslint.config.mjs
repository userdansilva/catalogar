import { nextJsConfig } from "@catalogar/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
const config = [
  ...nextJsConfig,
  {
    ignores: ["src/shadcn/*"],
  },
];

export default config;
