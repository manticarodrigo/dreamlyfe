import type { SharedValue } from "react-native-reanimated";
import React, { useCallback } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  length: number;
  x: SharedValue<number>;
}

export function PaginationElement({ length, x }: Props) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const PaginationComponent = useCallback(({ index }: { index: number }) => {
    const outputRange = ["#a1a1a1", "#646464", "#646464"];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const itemRnStyle = useAnimatedStyle(() => {
      const width = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [35, 16, 35],
        Extrapolation.CLAMP,
      );

      const bgColor = interpolateColor(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange,
      );

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x]);
    return (
      <Animated.View
        style={[itemRnStyle]}
        className="mx-[5px] h-[10px] w-[35px] rounded-[5px]"
      />
    );
  }, []);

  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length }).map((_, index) => {
        return <PaginationComponent index={index} key={index} />;
      })}
    </View>
  );
}
