import "@bacons/text-decoder/install";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { SheetProvider } from "react-native-actions-sheet";

import "~/components/sheets";

export default function RootLayout() {
  return (
    <TRPCProvider>
      <SheetProvider context="global">
        <Slot />
        <StatusBar style="light" />
      </SheetProvider>
    </TRPCProvider>
  );
}
