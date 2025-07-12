import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    ignorePatterns: ["src/shadcn/*"],
    rules: {
      "import/no-unresolved": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "tsx": "never",
          "ts": "never"
        }
      ],
      "react/require-default-props": "off",
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".tsx"
          ]
        }
      ],
      "react/jsx-props-no-spreading": "off",
      "quotes": [
        "error",
        "double"
      ],
      "import/prefer-default-export": "off",
      "no-console": [
        "error",
        {
          "allow": [
            "warn",
            "error"
          ]
        }
      ],
      "react/destructuring-assignment": "off",
      "react/display-name": "off",
    }
  }),
];

export default eslintConfig;
