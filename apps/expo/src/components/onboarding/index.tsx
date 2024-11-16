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
            style={{ width: 310, height: 310 }}
          />
        </View>
        <View className="mt-auto items-center">
          <View className="mt-auto max-w-sm px-6 py-40">
            <Text className="font-sans text-3xl font-semibold text-foreground">
              Hi there! 👋
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="flex-row font-sans text-3xl font-semibold text-foreground">
                Welcome to
              </Text>
              <Image
                source={require("../../../assets/images/DreamLyfe.png")}
                style={{ width: 155, height: 36 }}
              />
            </View>
            <Text className="text-3xl font-semibold text-foreground">
              Ready to experience a day in your dream life?
            </Text>
          </View>
        </View>
      </Page>
    ),
  },
  {
    children: (
      <Page>
        <View className="relative flex-1 items-center justify-center gap-8 p-12">
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
            <Image
              source={require("../../../assets/images/Ellipse.png")}
              style={{ width: 500, height: 500 }}
            />
          </View>
          <View className="items-center gap-4">
            <Image
              source={require("../../../assets/images/DreamLyfe.png")}
              style={{ width: 155, height: 36 }}
            />
            <Image
              source={require("../../../assets/images/onboarding/WhereDoYouLive.png")}
              style={{ width: 264, height: 301 }}
            />
          </View>
          <View className="max-w-xs gap-4">
            <Text className="text-3xl font-semibold text-foreground">
              See Your Dream Life Unfold
            </Text>
            <Text className="text-lg text-foreground">
              From stunning sunsets to personal achievements, get a glimpse of
              what your ideal life could look like.
            </Text>
          </View>
        </View>
      </Page>
    ),
  },
  {
    children: (
      <Page>
        <View className="relative flex-1 items-center justify-center gap-8 p-12">
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
            <Image
              source={require("../../../assets/images/Ellipse.png")}
              style={{ width: 500, height: 500 }}
            />
          </View>
          <View className="items-center gap-4">
            <Image
              source={require("../../../assets/images/DreamLyfe.png")}
              style={{ width: 155, height: 36 }}
            />
            <Image
              source={require("../../../assets/images/onboarding/TodoList.png")}
              style={{ width: 264, height: 301 }}
            />
          </View>
          <View className="max-w-xs gap-4">
            <Text className="text-3xl font-semibold text-foreground">
              Craft Each Day to Reach Your Goals
            </Text>
            <Text className="text-lg text-foreground">
              We break down your big dreams into achievable daily actions,
              guiding you to your best life step-by-step.
            </Text>
          </View>
        </View>
      </Page>
    ),
  },
  {
    children: (
      <Page>
        <View className="relative flex-1 items-center justify-center gap-8 p-12">
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
            <Image
              source={require("../../../assets/images/Ellipse.png")}
              style={{ width: 500, height: 500 }}
            />
          </View>
          <View className="items-center gap-4">
            <Image
              source={require("../../../assets/images/DreamLyfe.png")}
              style={{ width: 155, height: 36 }}
            />
            <Image
              source={require("../../../assets/images/onboarding/VisionBoard.png")}
              style={{ width: 264, height: 301 }}
            />
          </View>
          <View className="max-w-xs gap-4">
            <Text className="text-3xl font-semibold text-foreground">
              Believe, Act,{"\n"}Receive, Repeat
            </Text>
            <Text className="text-lg text-foreground">
              Manifesting your dream life starts with clarity, intention, and
              action—are you ready?
            </Text>
          </View>
        </View>
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
