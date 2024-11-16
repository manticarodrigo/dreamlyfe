import type { Config } from "tailwindcss";

import base from "./base";

export default {
  content: base.content,
  presets: [base],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF-Compact-Rounded-Medium"],
      },
    },
  },
} satisfies Config;
