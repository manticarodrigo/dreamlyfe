import type { LayoutChangeEvent } from "react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export interface RadioGroupOptionValue<T extends string> {
  value: T;
  label: string;
}

export function RadioGroup<T extends string>({
  options,
  selected,
}: {
  options: RadioGroupOptionValue<T>[];
  selected: T | null | undefined;
  onChange: (value: T) => void;
}) {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [buttonPositions, setButtonPositions] = useState<number[]>([]);

  // Capture the position of each button
  const handleButtonLayout = (event: LayoutChangeEvent, index: number) => {
    const { x } = event.nativeEvent.layout;
    setButtonPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = x;
      return newPositions;
    });
  };

  // Scroll to the selected button position when selected changes
  useEffect(() => {
    if (scrollViewRef.current && selected !== null && selected !== undefined) {
      const selectedIndex = options.findIndex(
        (option) => option.value === selected,
      );
      if (selectedIndex >= 0 && buttonPositions[selectedIndex] !== undefined) {
        scrollViewRef.current.scrollTo({
          x: buttonPositions[selectedIndex],
          animated: true,
        });
      }
    }
  }, [buttonPositions]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row gap-2">
        {options.map((option, index) => (
          <View
            key={option.value}
            onLayout={(event) => handleButtonLayout(event, index)}
          ></View>
        ))}
      </View>
    </ScrollView>
  );
}
