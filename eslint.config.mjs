import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin,
    },
    ignores: ["src/shadcn/*"],
    rules: {
      "import/no-unresolved": "error",
      "import/order": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          tsx: "never",
          ts: "never",
        },
      ],
      "import/prefer-default-export": "off",
      "react/require-default-props": "off",
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".tsx"],
        },
      ],
      "react/jsx-props-no-spreading": "off",
      quotes: ["error", "double"],
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "react/destructuring-assignment": "off",
      "react/display-name": "off",
    },
  },
];

export default eslintConfig;
