import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  Blend,
  Canvas,
  ColorShader,
  FractalNoise,
  RoundedRect,
  Shadow,
} from "@shopify/react-native-skia";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  width = 250,
  height = 57,
  children,
  onPress,
}: {
  width?: number;
  height?: number;
  children: React.ReactNode;
  onPress: () => void;
}) {
  const r = Math.ceil(height / 2);

  return (
    <AnimatedPressable
      style={{ width, height }}
      className="relative"
      onPress={onPress}
    >
      <Canvas style={{ flex: 1 }}>
        <RoundedRect x={0} y={0} width={width} height={height} r={r}>
          <Blend mode="overlay">
            <ColorShader color="#4F64FD" />
            <FractalNoise freqX={1} freqY={1} octaves={20} seed={0} />
          </Blend>
          <Shadow dx={0} dy={2} blur={10} color="white" inner />
        </RoundedRect>
      </Canvas>
      <View className="absolute flex h-full w-full items-center justify-center">
        {children}
      </View>
    </AnimatedPressable>
  );
}
