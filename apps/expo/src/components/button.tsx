import type { TouchableOpacityProps } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const button = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};

const text = {
  primary: "text-background",
  secondary: "text-background",
};

export function Button({
  children,
  variant = "primary",
  ...props
}: { variant?: "primary" | "secondary" } & TouchableOpacityProps) {
  const isText = typeof children === "string";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      className={`h-14 items-center justify-center rounded-full shadow ${props.disabled ? button.secondary : button[variant]}${props.className ? ` ${props.className}` : ""}`}
    >
      {isText ? (
        <Text
          className={`font-medium ${props.disabled ? "text-background/90" : text[variant]}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export function AnimatedButton({
  children,
  variant = "primary",
  ...props
}: { variant?: "primary" | "secondary" } & TouchableOpacityProps) {
  const isText = typeof children === "string";
  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.8}
      {...props}
      className={`h-14 items-center justify-center rounded-full shadow ${props.disabled ? button.secondary : button[variant]}${props.className ? ` ${props.className}` : ""}`}
    >
      {isText ? (
        <Text
          className={`font-medium ${props.disabled ? "text-background/90" : text[variant]}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </AnimatedTouchableOpacity>
  );
}
