import baseConfig, { restrictEnvAccess } from "@flags/eslint-config/base";
import nextjsConfig from "@flags/eslint-config/nextjs";
import reactConfig from "@flags/eslint-config/react";

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
