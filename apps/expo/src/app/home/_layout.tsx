import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
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
  );
}
