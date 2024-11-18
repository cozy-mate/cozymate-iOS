import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Selected from '@assets/todoList/selectedCheckBox.svg';
import NotSelected from '@assets/todoList/notSelectedCheckBox.svg';

interface RoleMateItem {
  mateId: number;
  nickname: string;
}

interface SelectMateComponentProps {
  title: string;
  selectedValues: RoleMateItem[];
  setSelectedValues: React.Dispatch<React.SetStateAction<RoleMateItem[]>>;
  items: { memberId: number; mateId: number; nickname: string }[];
}

const RoleSelectMateComponent: React.FC<SelectMateComponentProps> = ({
  title,
  selectedValues,
  setSelectedValues,
  items,
}) => {
  const toggleSelection = (item: { mateId: number; nickname: string }) => {
    const isSelected = selectedValues.some((value) => value.mateId === item.mateId);

    const updatedSelectedValues = isSelected
      ? selectedValues.filter((value) => value.mateId !== item.mateId)
      : [...selectedValues, { mateId: item.mateId, nickname: item.nickname }];

    setSelectedValues(updatedSelectedValues);
  };

  const toggleAllItems = () => {
    const areAllSelected = items.every((item) =>
      selectedValues.some((value) => value.mateId === item.mateId),
    );

    setSelectedValues(
      areAllSelected ? [] : items.map((item) => ({ mateId: item.mateId, nickname: item.nickname })),
    );
  };

  const isEveryItemSelected = items.every((item) =>
    selectedValues.some((value) => value.mateId === item.mateId),
  );

  return (
    <View className="mb-10">
      <Text className="mb-2 px-1 text-lg font-semibold text-basicFont">{title}</Text>
      <View className="flex flex-row flex-wrap gap-x-2">
        {items.map((item) => (
          <Pressable
            key={item.mateId}
            className={`mb-2 flex items-center justify-center rounded-md px-5 py-[10px] ${
              selectedValues.some((value) => value.mateId === item.mateId)
                ? 'bg-sub1'
                : 'bg-colorBox'
            }`}
            onPress={() => toggleSelection(item)}
          >
            <Text
              className={`text-sm tracking-tight ${
                selectedValues.some((value) => value.mateId === item.mateId)
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

export default RoleSelectMateComponent;
