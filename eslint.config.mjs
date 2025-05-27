import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"], // Áp dụng riêng cho file TypeScript
    rules: {
      // Tắt rule từ plugin typescript-eslint
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    rules: {
      "react/no-unescaped-entities": "off",
      "no-unused-vars": "off", // tắt luôn cho JS thường
    },
  },
];

export default eslintConfig;
