import { View } from "react-native";

import { Button } from "./button";

export interface RadioGroupOptionValue<T extends string> {
  value: T;
  label: string;
}

export function RadioGroup<T extends string>({
  options,
  selected,
  onChange,
}: {
  options: RadioGroupOptionValue<T>[];
  selected: T | null | undefined;
  onChange: (value: T) => void;
}) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={selected === option.value ? "primary" : "secondary"}
          onPress={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </View>
  );
}
