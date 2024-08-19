import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

interface CustomCheckInputBoxProps {
  title: string;
  selectedValues: any[];
  setSelectedValues: React.Dispatch<React.SetStateAction<any[]>>;
  items: Item[];
}

type Item = {
  id: number;
  value: any;
  name: string;
  select: boolean;
};

const CustomCheckInputBox: React.FC<CustomCheckInputBoxProps> = ({
  title,
  selectedValues,
  setSelectedValues,
  items,
}) => {
  // Toggle selection of an item
  const toggleSelection = (item: Item) => {
    // Check if the item is already selected
    const isSelected = selectedValues.includes(item.value);

    // Update selected values based on the current selection state
    const updatedSelectedValues = isSelected
      ? selectedValues.filter((value) => value !== item.value)
      : [...selectedValues, item.value];

    // Update the state with the new list of selected values
    setSelectedValues(updatedSelectedValues);
  };

  return (
    <View className="mb-12">
      <Text className="px-1 mb-3 text-lg font-semibold text-basicFont">{title}</Text>
      <View className="flex flex-row gap-x-2">
        {items.map((item: Item) => (
          <Pressable
            key={item.id}
            className={`flex justify-center items-center rounded-md py-[10px] px-5 ${
              selectedValues.includes(item.value) ? 'bg-sub1' : 'bg-colorBox'
            } `}
            onPress={() => toggleSelection(item)}
          >
            <Text
              className={`text-sm tracking-tight ${
                selectedValues.includes(item.value)
                  ? 'text-main1 font-semibold'
                  : 'text-disabledFont font-medium'
              }`}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomCheckInputBox;
