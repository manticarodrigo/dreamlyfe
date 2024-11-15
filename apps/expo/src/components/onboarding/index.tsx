/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ImageURISource, ViewToken } from "react-native";
import { useCallback } from "react";
import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";

import { ListItem } from "./__ui/ListItem";
import { PaginationButton } from "./__ui/PaginationButton";
import { PaginationElement } from "./__ui/PaginationElement";

function Page({ children }: { children?: React.ReactNode }) {
  return (
    <KeyboardAvoidingView
      enabled
      behavior="padding"
      keyboardVerticalOffset={80}
      className="flex-1"
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const pages = [
  {
    children: (
      <Page>
        <View className="flex-1 items-end">
          <Image
            source={require("../../../assets/images/Ellipse.png")}
            style={{ width: 234, height: 234 }}
          />
        </View>
        <View className="mt-auto px-12 py-40">
          <Text className="text-2xl font-semibold leading-10 text-foreground">
            Hi there! 👋
          </Text>
          <Text className="flex-row text-2xl font-semibold leading-10 text-foreground">
            Welcome to{" "}
            <Image
              source={require("../../../assets/images/DreamLyfe.png")}
              style={{ width: 155, height: 36 }}
            />
          </Text>
          <Text className="text-2xl font-semibold leading-10 text-foreground">
            Ready to experience a day in your dream life?
          </Text>
        </View>
      </Page>
    ),
  },
  {
    children: (
      <Page>
        <Text className="text-center text-3xl font-semibold leading-10 text-foreground">
          Hi there! 👋 Welcome to{" "}
          <Image
            source={require("../../../assets/images/DreamLyfe.png")}
            style={{ width: 155, height: 36 }}
          />
          Ready to experience a day in your dream life?
        </Text>
      </Page>
    ),
  },
];

export default function OnboardingScreen() {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0]?.index ?? 0;
    },
    [],
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { children: React.ReactNode };
      index: number;
    }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x],
  );

  return (
    <SafeAreaView className="flex-1">
      <Animated.FlatList
        horizontal
        pagingEnabled
        bounces={false}
        ref={flatListRef}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={scrollHandle}
      />
      <View className="items-center gap-12 px-5">
        <PaginationElement length={pages.length} x={x} />
        <PaginationButton
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
}
