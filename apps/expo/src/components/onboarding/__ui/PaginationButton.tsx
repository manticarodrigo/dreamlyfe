import type { SharedValue } from "react-native-reanimated";
import React, { useCallback } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";

interface Props {
  currentIndex: SharedValue<number>;
  length: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flatListRef: any;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PaginationButton({ currentIndex, length, flatListRef }: Props) {
  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width: currentIndex.value === 0 ? withSpring(250) : withSpring(200),
      height: 60,
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

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      router.replace("/");
      return;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, []);

  return (
    <AnimatedPressable
      style={[rnBtnStyle]}
      className="relative flex-row items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-4 shadow-inner shadow-white"
      onPress={onPress}
    >
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
    </AnimatedPressable>
  );
}
