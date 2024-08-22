import CustomCheckBoxComponent from '@components/customCheckBox';
import React from 'react';
import { View } from 'react-native';

interface CheckBoxContainerProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
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
}) => {
  return (
    <View className="px-3 mb-6">
      <View className="flex-row flex-wrap">
        <CustomCheckBoxComponent
          value={value}
          setValue={setValue}
          items={items}
          setItems={setItems}
        />
      </View>
    </View>
  );
};

export default CheckBoxContainer;
