import { Text, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Menu, Shield, SlidersHorizontal } from "lucide-react-native";

import { Button } from "~/components/button";
import { Screen } from "~/components/screen";

import "~/components/sheets/profile";

export default function Home() {
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity
                className="h-8 w-8 items-center justify-center"
                onPress={() => {
                  console.log("Pressed");
                }}
              >
                <Menu size={32} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                className="h-8 w-8 items-center justify-center rounded-full border-2 border-foreground"
                onPress={() => {
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
          <Link href="/home/posts">
            <Text className="font-medium text-primary">View Posts</Text>
          </Link>
        </View>
        <View className="mt-auto w-full flex-row justify-between gap-2 p-4">
          <Button className="w-14" onPress={() => SheetManager.show("profile")}>
            <SlidersHorizontal size={22} color="white" />
          </Button>
          <Button disabled className="flex-1">
            Check the Flags
          </Button>
        </View>
      </SafeAreaView>
    </Screen>
  );
}
