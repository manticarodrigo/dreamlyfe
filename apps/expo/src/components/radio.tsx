import { View } from "react-native";

import { Button } from "./button";

export function RadioGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? "primary" : "secondary"}
          onPress={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </View>
  );
}
