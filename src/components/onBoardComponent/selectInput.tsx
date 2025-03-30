import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { SignUp } from '@zustand/member/type';

import DownArrow from '@assets/onBoard/downArrow.svg';
import RadioButton from '@assets/onBoard/radioBox.svg';
import SelectedRadioButton from '@assets/onBoard/selectedRadioBox.svg';

interface SelectInputComponentProps {
  type: string;
  title: string;
  value: string;
  handleValue: (newSignUpState: Partial<SignUp>) => void;
  items?: { title: string; value: string }[];
}

const SelectInputComponent: React.FC<SelectInputComponentProps> = ({
  type,
  title,
  value,
  handleValue,
  items,
}) => {
  const [isFoucused, setIsFocused] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleConfirm = (date: Date) => {
    const formattedDateForStorage = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // const formattedDateForDisplay = `${date.getFullYear()}년 ${
    //   date.getMonth() + 1
    // }월 ${date.getDate()}일`;

    setIsFocused(false);
    setIsModalOpen(false);
    handleValue({ birthday: formattedDateForStorage });
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setIsFocused(true);
          setIsModalOpen(true);
        }}
        className={`space-y-2 rounded-xl border p-5 ${
          isFoucused ? 'border-sub1' : 'border-disabled'
        }`}
      >
        <Text
          className={`text-xs font-semibold ${
            isFoucused || value !== '' ? 'text-main1' : 'text-colorFont'
          }`}
        >
          {title}
        </Text>
        <View className="flex flex-1 flex-row items-center justify-between">
          <Text className="text-sm font-medium leading-[18px] text-basicFont">{value}</Text>
          <DownArrow className={`${isModalOpen && 'rotate-180'}`} />
        </View>
      </Pressable>

      {type === 'DATE' || items === undefined ? (
        <DateTimePickerModal
          isVisible={isModalOpen}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => {
            setIsFocused(false);
            setIsModalOpen(false);
          }}
          locale="ko-KR"
        />
      ) : (
        <View className="flex flex-row items-center space-x-2">
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handleValue()}
              className="flex flex-row items-center space-x-1"
            >
              {value === item.value ? <SelectedRadioButton /> : <RadioButton />}
              <Text
                className={`text-sm font-medium ${
                  value === item.value ? 'text-basicFont' : 'text-disabledFont'
                }`}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </>
  );
};

export default SelectInputComponent;
