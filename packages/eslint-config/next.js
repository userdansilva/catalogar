import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import sonarjs from "eslint-plugin-sonarjs";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  sonarjs.configs.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "@next/next": pluginNext,
    },
    rules: {
      quotes: ["error", "double"],
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "react/display-name": "off",
      "sonarjs/no-nested-functions": "off",
      "import/order": "error",
    },
  },
];
