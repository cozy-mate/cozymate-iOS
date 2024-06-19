import CustomCheckBoxComponent from '@components/customCheckBox';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

interface CheckBoxContainerProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  originalItems: Item[];
}

type Item = {
  index: number;
  id: string;
  name: string;
  select: boolean;
};

const CheckBoxContainer: React.FC<CheckBoxContainerProps> = ({
  value,
  setValue,
  items,
  setItems,
  originalItems,
}) => {
  return (
    <View className="flex-1 px-3">
      <View className="flex-row flex-wrap">
        <CustomCheckBoxComponent
          value={value}
          setValue={setValue}
          items={items}
          setItems={setItems}
          originalItems={originalItems}
        />
      </View>
    </View>
  );
};

export default CheckBoxContainer;
