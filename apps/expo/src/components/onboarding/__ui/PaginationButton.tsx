import type { ImageURISource } from "react-native";
import type { AnimatedRef, SharedValue } from "react-native-reanimated";
import React, { useCallback } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ArrowLeft } from "lucide-react-native";

import { AnimatedButton } from "~/components/button";

interface Props {
  currentIndex: SharedValue<number>;
  length: number;
  flatListRef: AnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >;
}

export function PaginationButton({ currentIndex, length, flatListRef }: Props) {
  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width: currentIndex.value === 0 ? withSpring(250) : withSpring(200),
    };
  }, [currentIndex, length]);

  const rnTextStartStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex.value === 0 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value === 0 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const rnTextNextStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex.value > 0 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: currentIndex.value > 0 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const backBtnStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex.value > 0 ? withTiming(1) : withTiming(0),
    };
  }, [currentIndex, length]);

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      return;
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, []);

  const onBackPress = useCallback(() => {
    if (currentIndex.value === 0) {
      return;
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentIndex.value - 1,
      });
    }
  }, []);

  return (
    <View className="relative flex-row">
      <AnimatedButton
        style={[backBtnStyle]}
        className="absolute w-14 -translate-x-16"
        onPress={onBackPress}
      >
        <ArrowLeft size={24} color="white" strokeWidth={2} />
      </AnimatedButton>
      <AnimatedButton style={[rnBtnStyle]} onPress={onPress}>
        <Animated.Text
          style={[rnTextStartStyle]}
          className="absolute text-lg font-semibold text-background"
        >
          Get Started
        </Animated.Text>
        <Animated.Text
          style={[rnTextNextStyle]}
          className="absolute text-lg font-semibold text-background"
        >
          Next
        </Animated.Text>
      </AnimatedButton>
    </View>
  );
}
