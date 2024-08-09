import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

interface CustomRadioInputBoxProps {
  title: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  meridian?: string;
  setMeridian?: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isTime: boolean;
  isWide?: boolean;
  width?: number;
  count?: number;
}

type Item = {
  index: number;
  value: any;
  name: string;
  select: boolean;
};

const CustomRadioInputBox: React.FC<CustomRadioInputBoxProps> = ({
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

  const inputRef = useRef<TextInput>(null);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index,
    }));
    setItems(updatedItems);
    setValue(selectedItem.value);
    handleFocus(selectedItem.index);
  };

  const handleMeridianChange = (meridian: string) => {
    if (setMeridian) {
      setMeridian(meridian);
    }
  };

  return (
    <View className="mb-12">
      <Text className="text-base font-semibold text-emphasizedFont px-[2px] mb-2">{title}</Text>
      {isTime && (
        <View className="flex flex-row items-center mb-2">
          <Pressable className="p-2 mr-2" onPress={() => handleMeridianChange('AM')}>
            <Text
              className={`${
                meridian === 'AM' ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
              } `}
            >
              AM
            </Text>
          </Pressable>

          <View className="w-[1px] h-4 bg-[#CCCCCC] mr-2" />

          <Pressable className="p-2 mr-2" onPress={() => handleMeridianChange('PM')}>
            <Text
              className={`${
                meridian === 'PM' ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
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
            className={`flex-col justify-center items-center rounded-md py-[10px] mr-2 mb-2 ${
              item.select ? 'bg-sub1' : 'bg-colorBox'
            } ${isWide ? '' : 'px-5'} ${count == 6 && item.index % 6 === 0 && 'mr-0'}
            }`}
            onPress={() => select(item)}
          >
            <Text
              className={`text-xs tracking-tight ${
                item.select ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
              } `}
            >
              {item.name}
            </Text>
            <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioInputBox;
