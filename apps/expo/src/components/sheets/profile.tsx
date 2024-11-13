import { ScrollView, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import "react-native-svg";

import { Button } from "../button";

export function ProfileModal() {
  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{
        backgroundColor: "rgba(35,31,32,0.30)",
      }}
      indicatorStyle={{
        width: 100,
      }}
    >
      <View className="h-96 flex-col gap-4 p-4">
        <View className="flex-col gap-2">
          <Text className="text-foreground">I am</Text>
          <ScrollView horizontal>
            <View className="flex-row gap-2">
              <Button>Female</Button>
              <Button>Male</Button>
              <Button>Other</Button>
            </View>
          </ScrollView>
        </View>
        <View className="flex-col gap-2">
          <Text className="text-foreground">They are</Text>
          <ScrollView horizontal>
            <View className="flex-row gap-2">
              <Button>Female</Button>
              <Button>Male</Button>
              <Button>Other</Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </ActionSheet>
  );
}
