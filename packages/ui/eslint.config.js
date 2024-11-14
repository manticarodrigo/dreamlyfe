import baseConfig from "@dreamlyfe/eslint-config/base";
import reactConfig from "@dreamlyfe/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
