import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerTransparent: true,
        contentStyle: {
          backgroundColor: "#231F20",
        },
      }}
    />
  );
}
