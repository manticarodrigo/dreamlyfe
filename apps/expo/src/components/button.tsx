import type { TouchableOpacityProps } from "react-native";
import { Text, TouchableOpacity } from "react-native";

const button = {
  primary: "border-foreground",
  secondary: "border-foreground/10 bg-foreground/5",
};

const text = {
  primary: "text-foreground",
  secondary: "text-foreground",
};

export function Button({
  children,
  variant = "primary",
  ...props
}: { variant?: "primary" | "secondary" } & TouchableOpacityProps) {
  const isText = typeof children === "string";
  return (
    <TouchableOpacity
      {...props}
      className={`h-14 items-center justify-center rounded-full border-2 px-6 ${props.disabled ? button.secondary : button[variant]}${props.className ? ` ${props.className}` : ""}`}
    >
      {isText ? (
        <Text className={props.disabled ? "text-foreground/90" : text[variant]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
