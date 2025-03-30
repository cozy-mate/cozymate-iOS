import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DownArrow from '@/assets/images/onBoard/downArrow.svg';

interface BorderDateBoxProps {
  title: string;
  value: string;
  handleValue: (value: string) => void;
}

const BorderDateBox: React.FC<BorderDateBoxProps> = ({ title, value, handleValue }) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  const handleConfirm = (date: Date) => {
    const formattedDateForStorage = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    setIsDateModalOpen(false);
    handleValue(formattedDateForStorage);
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  return (
    <>
      <Pressable
        onPress={() => setIsDateModalOpen(true)}
        className={`border ${value !== '' ? 'border-subColor1' : 'border-disabledColor'} rounded-xl h-[80px] px-[20px] pt-[18.5px] pb-[14.5px]`}
      >
        <Text className="text-12 font-600 leading-12 text-colorFont">{title}</Text>

        <View className="flex flex-row justify-between items-center">
          <Text className="text-14 font-500 leading-14 text-basicFont">
            {value !== '' ? formatDate(value) : ''}
          </Text>
          <View className="py-[13px] pl-[24px] pr-[8px]">
            <DownArrow />
          </View>
        </View>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDateModalOpen}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setIsDateModalOpen(false)}
        locale="ko-KR"
      />
    </>
  );
};

export default BorderDateBox;
