import type {
  AnimatedProp,
  CircleProps,
  SkPoint,
} from "@shopify/react-native-skia";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BlurMask,
  Canvas,
  Circle,
  LinearGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const SIZES = {
  HOME: {
    HEADER: 60,
  },
  WINDOW: {
    HEIGHT: height,
    WIDTH: width,
  },
};

type BlurBoxProps = ViewProps & {
  children?: React.ReactNode;
  bottomBlur?: boolean;
};

const styles = StyleSheet.create({
  background: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: -1,
  },
  blur: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
  bottom: {
    bottom: 0,
  },
  content: {
    flex: 1,
    position: "relative",
  },
  top: {
    top: 0,
  },
  wrapper: {
    flex: 1,
    position: "relative",
  },
});

export function GradientMorph({
  bottomBlur,
  ...props
}: React.PropsWithChildren<BlurBoxProps>) {
  const edgeHeight = useRef(60).current;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, props.style]}>
      <BlurEdge
        height={edgeHeight + insets.top}
        colors={["#FFFFFF90", "#FFFFFF00"]}
        start={vec(0, 0 + insets.top)}
        end={vec(0, edgeHeight + insets.top)}
        style={[styles.blur, styles.top]}
      />

      {props.children}

      <BlurEdge
        enabled={bottomBlur}
        height={edgeHeight}
        start={vec(0, 0)}
        end={vec(0, edgeHeight)}
        colors={["#FFFFFF00", "#FFFFFF80"]}
        style={[styles.blur, styles.bottom]}
      />

      <BlurBackground />
    </View>
  );
}

interface BlurEdgeProps {
  enabled?: boolean;
  height: number;
  colors: string[];
  style: StyleProp<ViewStyle>;
  start: AnimatedProp<SkPoint>;
  end: AnimatedProp<SkPoint>;
}

const BlurEdge: React.FC<BlurEdgeProps> = ({
  enabled,
  height,
  style,
  ...props
}: BlurEdgeProps) => {
  if (!enabled) {
    return null;
  }
  return (
    <Canvas style={[style, { height }]}>
      <Rect x={0} y={0} width={SIZES.WINDOW.WIDTH} height={height}>
        <LinearGradient {...props} />
      </Rect>
    </Canvas>
  );
};

const BlurBackground = (): JSX.Element => {
  /** Radius of circle */
  const r = useRef(SIZES.WINDOW.WIDTH / 2.5).current;
  /** An array responsible for how many circles will be located on the screen */
  const circles = useRef(new Array(8).fill(1)).current;
  /** The distance the elements will be located from each other */
  const stepY = SIZES.WINDOW.HEIGHT / Math.ceil(circles.length / 2);
  const stepX = SIZES.WINDOW.WIDTH / 2;

  return (
    <Canvas style={styles.background}>
      <BlurMask blur={50} style="normal" />

      {circles.map((_, index) => (
        <BlurCircle
          key={index}
          // Arrange elements evenly across the screen
          cx={(index % 2) * stepX + stepX / 2}
          cy={Math.floor(index / 2) * stepY + stepY / 2}
          r={r}
          delay={index * 1000}
        />
      ))}
    </Canvas>
  );
};

const BlurCircleColors = [
  "#36d5cd",
  "#9cc688",
  "#4eb3ff",
  "#6a329f",
  "#c90076",
];

type BlurCircleProps = CircleProps & {
  /** Responsible for the time after which the animation starts in the circle */
  delay?: number;
};

const BlurCircle = ({ delay = 0, ...props }: BlurCircleProps): JSX.Element => {
  /** Randomly mixed colors */
  const colors = useRef(
    [...BlurCircleColors].sort(() => Math.random() - 0.5),
  ).current;
  /** Time to animate all colors */
  const colorAnimationDuration = useRef(colors.length * 6000).current;
  /** Parameter responsible for color animation */
  const color = useSharedValue(0);

  /** Parameter responsible for radius animation */
  const radius = useSharedValue(props.r);

  /** Radius of the animated circle */
  const radiusAnimationSize = useRef(props.r + props.r * 0.3).current;

  const animatedColor = useDerivedValue(() =>
    interpolateColor(
      color.value,
      colors.map((_, index) => index / (colors.length - 1)),
      [...colors],
    ),
  );

  useEffect(() => {
    // Change radius after delay and loop it
    radius.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(radiusAnimationSize, { duration: 2500 }),
          withTiming(props.r, { duration: 2500 }),
        ),
        -1,
      ),
    );
    // Change color after delay and loop it
    color.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: colorAnimationDuration }),
          withTiming(0, { duration: colorAnimationDuration }),
        ),
        -1,
      ),
    );
  }, [props.r, delay]);

  return <Circle {...props} r={radius} color={animatedColor} />;
};
