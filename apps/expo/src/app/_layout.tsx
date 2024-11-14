import "@bacons/text-decoder/install";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { Providers } from "~/components/providers";

export default function RootLayout() {
  return (
    <Providers>
      <Slot />
      <StatusBar style="light" />
    </Providers>
  );
}
