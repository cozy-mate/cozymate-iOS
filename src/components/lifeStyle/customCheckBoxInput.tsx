import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

type Item = {
  index: number;
  value: any;
  name: string;
  select: boolean;
};

interface CustomCheckBoxInputProps {
  title: string;
  value: any[];
  setValue: React.Dispatch<React.SetStateAction<any[]>>;
  meridian?: string;
  setMeridian?: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isTime: boolean;
  isWide?: boolean;
  width?: number;
  count?: number;
}

const CustomCheckBoxInput: React.FC<CustomCheckBoxInputProps> = ({
  title,
  value,
  setValue,
  meridian,
  setMeridian,
  items,
  setItems,
  isTime,
  isWide,
  width,
  count,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.index === selectedItem.index
        ? { ...item, select: !item.select } // 선택 토글
        : item,
    );
    setItems(updatedItems);

    // 선택된 아이템의 value를 배열에 추가/제거
    if (selectedItem.select) {
      setValue((prevValue) => prevValue.filter((val) => val !== selectedItem.value));
    } else {
      setValue((prevValue) => [...prevValue, selectedItem.value]);
    }

    handleFocus(selectedItem.index);
  };

  const handleMeridianChange = (meridian: string) => {
    if (setMeridian) {
      setMeridian(meridian);
    }
  };

  return (
    <View className="mb-12">
      <Text className="mb-2 px-[2px] text-base font-semibold text-emphasizedFont">{title}</Text>
      {isTime && (
        <View className="mb-2 flex flex-row items-center">
          <Pressable className="mr-2 p-2" onPress={() => handleMeridianChange('오전')}>
            <Text
              className={`${
                meridian === '오전' ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
              } `}
            >
              AM
            </Text>
          </Pressable>

          <View className="mr-2 h-4 w-px bg-[#CCCCCC]" />

          <Pressable className="mr-2 p-2" onPress={() => handleMeridianChange('오후')}>
            <Text
              className={`${
                meridian === '오후' ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
              } `}
            >
              PM
            </Text>
          </Pressable>
        </View>
      )}
      <View className="flex flex-row flex-wrap">
        {items.map((item: Item) => (
          <Pressable
            key={item.index}
            style={{
              width: isWide ? width : undefined,
            }}
            className={`mb-2 mr-2 flex-col items-center justify-center rounded-md py-[10px] ${
              item.select ? 'bg-sub1' : 'bg-colorBox'
            } ${isWide ? '' : 'px-5'} ${count == 6 && item.index % 6 === 0 && 'mr-0'}
            `}
            onPress={() => select(item)}
          >
            <Text
              className={`text-xs tracking-tight ${
                item.select ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
              } `}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomCheckBoxInput;
