import type { SharedValue } from "react-native-reanimated";
import React from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  item: { children: React.ReactNode };
  index: number;
  x: SharedValue<number>;
}

function ListItemBase({ item, index, x }: Props) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [index, x]);
  return (
    <Animated.View style={[{ width: SCREEN_WIDTH }, animatedStyle]}>
      {item.children}
    </Animated.View>
  );
}

export const ListItem = React.memo(ListItemBase);
