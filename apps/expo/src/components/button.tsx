import type { TouchableOpacityProps } from "react-native";
import { Text, TouchableOpacity } from "react-native";

const button = {
  primary: "border-foreground",
  disabled: "border-foreground/10 bg-foreground/5",
};

const text = {
  primary: "text-foreground",
  disabled: "text-foreground/90",
};

export function Button({
  children,
  ...props
}: { variant?: "primary" | "secondary" | "outline" } & TouchableOpacityProps) {
  const isText = typeof children === "string";
  return (
    <TouchableOpacity
      {...props}
      className={`h-14 items-center justify-center rounded-full border-2 px-6 ${props.disabled ? button.disabled : button.primary}${props.className ? ` ${props.className}` : ""}`}
    >
      {isText ? (
        <Text className={props.disabled ? text.disabled : text.primary}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
