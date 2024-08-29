import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

interface CustomCheckInputBoxProps {
  title: string;
  selectedValues: number[];
  setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
  items: { memberId: number; mateId: number; nickname: string }[];
}

const CustomCheckInputBox: React.FC<CustomCheckInputBoxProps> = ({
  title,
  selectedValues,
  setSelectedValues,
  items,
}) => {
  const toggleSelection = (item: { mateId: number }) => {
    const itemId = item.mateId;
    const isSelected = selectedValues.includes(itemId);

    const updatedSelectedValues = isSelected
      ? selectedValues.filter((value) => value !== itemId)
      : [...selectedValues, itemId];

    setSelectedValues(updatedSelectedValues);
  };

  return (
    <View className="mb-10">
      <Text className="px-1 mb-3 text-lg font-semibold text-basicFont">{title}</Text>
      <View className="flex flex-row flex-wrap gap-x-2">
        {items.map((item) => {
          const isItemSelected = selectedValues.includes(item.mateId);

          return (
            <Pressable
              key={item.mateId}
              className={`flex justify-center items-center rounded-md py-[10px] px-5 mb-2 ${
                isItemSelected ? 'bg-sub1' : 'bg-colorBox'
              } `}
              onPress={() => toggleSelection(item)}
            >
              <Text
                className={`text-sm tracking-tight ${
                  isItemSelected ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
                }`}
              >
                {item.nickname}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CustomCheckInputBox;
