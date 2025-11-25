import { prettierConfig } from "@catalogar/eslint-config/prettier";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettierConfig,
  // semi: false,
};

export default config;
