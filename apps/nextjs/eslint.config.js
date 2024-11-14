import baseConfig, { restrictEnvAccess } from "@dreamlyfe/eslint-config/base";
import nextjsConfig from "@dreamlyfe/eslint-config/nextjs";
import reactConfig from "@dreamlyfe/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
