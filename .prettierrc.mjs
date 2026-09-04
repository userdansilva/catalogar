/**
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  tailwindFunctions: ["clsx"],
  plugins: ["prettier-plugin-tailwindcss"]
}

export default config
