import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import sonarjs from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/shadcn/*"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  sonarjs.configs.recommended,
  {
    rules: {
      "import/order": "error",
      quotes: ["error", "double"],
      "react/display-name": "off",
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "sonarjs/no-nested-functions": "off",
    },
  },
];

export default eslintConfig;
