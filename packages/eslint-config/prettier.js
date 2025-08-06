/** @type {import("prettier").Config} */
export const prettierConfig = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: [import("prettier-plugin-tailwindcss")],
  tailwindFunctions: ["clsx"],
};
