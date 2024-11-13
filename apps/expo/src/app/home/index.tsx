import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Menu, Shield, SlidersHorizontal } from "lucide-react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              className="h-8 w-8 items-center justify-center"
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log("Pressed");
              }}
            >
              <Menu size={32} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Image
              source={
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
                require("../../../assets/icon.svg")
              }
              style={{ width: 32.71, height: 32 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              className="h-8 w-8 items-center justify-center rounded-full border-2 border-foreground"
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log("Pressed");
              }}
            >
              <Text className="font-bold text-foreground">3</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 items-center justify-center gap-4">
        <View className="items-center justify-center gap-2">
          <Text className="font-medium text-foreground">Tap to Upload</Text>
          <Text className="font-medium text-foreground">
            Your Message Screenshots
          </Text>
        </View>
        <View className="flex-row items-center gap-2 rounded-full bg-primary px-4 py-2">
          <Shield size={16} color="white" fill="white" />
          <Text className="font-medium text-foreground">
            Privacy Guaranteed
          </Text>
        </View>
      </View>
      <View className="mt-auto w-full flex-row justify-between gap-2 p-4">
        <TouchableOpacity
          className="h-14 w-14 items-center justify-center rounded-full border-2 border-foreground"
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log("Pressed");
          }}
        >
          <SlidersHorizontal size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-14 flex-1 items-center justify-center rounded-full border-2 border-foreground/10 bg-foreground/5"
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log("Pressed");
          }}
        >
          <Text className="text-foreground">Check the Flags</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
