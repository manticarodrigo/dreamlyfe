import "@bacons/text-decoder/install";

import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <TRPCProvider>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <View className="flex-1 bg-background">
        <LinearGradient
          colors={["rgba(255,255,255,0.047)", "rgba(255,255,255,0)"]}
          style={{ flex: 1 }}
        >
          <Stack
            screenOptions={{
              headerTintColor: "#FFFFFF",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "transparent",
              },
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
        </LinearGradient>
      </View>
      <StatusBar />
    </TRPCProvider>
  );
}
