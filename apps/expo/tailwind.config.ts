import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@dreamlyfe/tailwind-config/native";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF-Compact-Rounded-Medium"],
      },
    },
  },
} satisfies Config;
