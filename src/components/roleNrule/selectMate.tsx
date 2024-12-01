import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Selected from '@assets/roleNrule/selectedCheckBox.svg';
import NotSelected from '@assets/roleNrule/notSelectedCheckBox.svg';

interface SelectMateComponentProps {
  title: string;
  selectedValues: number[];
  setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
  items: { memberId: number; mateId: number; nickname: string }[];
}

const SelectMateComponent: React.FC<SelectMateComponentProps> = ({
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

  const toggleAllItems = () => {
    const areAllSelected = items.every((item) => selectedValues.includes(item.mateId));
    setSelectedValues(areAllSelected ? [] : items.map((item) => item.mateId));
  };

  const isEveryItemSelected = items.every((item) => selectedValues.includes(item.mateId));

  return (
    <View className="mb-10">
      <Text className="mb-2 px-1 text-lg font-semibold text-basicFont">{title}</Text>
      <View className="flex flex-row flex-wrap gap-x-2">
        {items.map((item) => (
          <Pressable
            key={item.mateId}
            className={`mb-2 flex items-center justify-center rounded-md px-5 py-[10px] ${
              selectedValues.includes(item.mateId) ? 'bg-sub1' : 'bg-colorBox'
            } `}
            onPress={() => toggleSelection(item)}
          >
            <Text
              className={`text-sm tracking-tight ${
                selectedValues.includes(item.mateId)
                  ? 'font-semibold text-main1'
                  : 'font-medium text-disabledFont'
              }`}
            >
              {item.nickname}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="flex flex-row items-center">
        <Pressable onPress={toggleAllItems}>
          {isEveryItemSelected ? <Selected /> : <NotSelected />}
        </Pressable>
        <Text
          className={`${
            isEveryItemSelected ? 'text-basicFont' : 'text-disabledFont'
          } text-sm font-medium`}
        >
          모두
        </Text>
      </View>
    </View>
  );
};

export default SelectMateComponent;
