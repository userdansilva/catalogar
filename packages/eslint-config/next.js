import sonarjs from "eslint-plugin-sonarjs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
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
  {
    // Required for "react-hooks" plugin, defined at next/core-web-vitals
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      // Add react eslint rules...
      "react/display-name": "off",
    }
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      // add next eslint rules...
      "import/order": "error",
    }
  },
  {
    plugins: { sonarjs },
    ...sonarjs.configs.recommended,
    rules: {
      ...sonarjs.configs.recommended.rules,
      // Add sonar eslint rules...
      "sonarjs/no-nested-functions": "off",
    }
  },
  {
    rules: {
      // Add other rules...
      quotes: ["error", "double"],
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ]
    },
  },
];
