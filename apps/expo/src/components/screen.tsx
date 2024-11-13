import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";

export function Screen({ children }: { children: React.ReactNode }) {
  const headerHeight = useHeaderHeight();
  return (
    <LinearGradient
      colors={["rgba(255,255,255,0.047)", "rgba(255,255,255,0)"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingTop: headerHeight }}>{children}</View>
    </LinearGradient>
  );
}
