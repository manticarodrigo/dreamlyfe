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

function hslToHex(hsl: string): string {
  // Extract the HSL values using a regular expression
  const regex = /hsl\((\d+)\s*([\d.]+)%\s*([\d.]+)%\)/;
  const result = regex.exec(hsl);

  if (!result) {
    throw new Error("Invalid HSL color format");
  }

  const h = parseInt(result[1] ?? "0", 10);
  const s = parseFloat(result[2] ?? "0") / 100;
  const l = parseFloat(result[3] ?? "0") / 100;

  // Function to convert hue to RGB
  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    // If saturation is 0, it's a shade of gray
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h / 360 + 1 / 3);
    g = hueToRgb(p, q, h / 360);
    b = hueToRgb(p, q, h / 360 - 1 / 3);
  }

  // Convert RGB to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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
