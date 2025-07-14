import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...tailwind.configs["flat/recommended"],
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: ["src/shadcn/**/.*"],
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
    },
  },
];

export default eslintConfig;
