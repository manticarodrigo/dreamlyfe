import type { ImageURISource } from "react-native";
import type { AnimatedRef, SharedValue } from "react-native-reanimated";
import React, { useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Button } from "~/components/button";

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
  const rnTextStartStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex.value === 0 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateY:
            currentIndex.value === 0 ? withTiming(0) : withTiming(-100),
        },
      ],
    };
  }, [currentIndex, length]);

  const rnTextNextStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex.value > 0 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateY: currentIndex.value > 0 ? withTiming(0) : withTiming(100),
        },
      ],
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

  return (
    <Button onPress={onPress}>
      <Animated.Text
        style={[rnTextStartStyle]}
        className="absolute font-sans text-lg font-semibold text-background"
      >
        Get Started
      </Animated.Text>
      <Animated.Text
        style={[rnTextNextStyle]}
        className="absolute font-sans text-lg font-semibold text-background"
      >
        Next
      </Animated.Text>
    </Button>
  );
}
