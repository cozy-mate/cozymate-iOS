import { View } from 'react-native';
import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useSignUpStore } from '@zustand/member/member';

import DownArrow from '@assets/onBoard/downArrow.svg';

const BirthDay: React.FC = () => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

  const [displayDate, setDisplayDate] = useState<string>('');

  const handleConfirm = (date: Date) => {
    const formattedDateForStorage = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const formattedDateForDisplay = `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;

    setSignUpState({ birthday: formattedDateForStorage });
    setIsDatePickerVisible(false);
    setDisplayDate(formattedDateForDisplay);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setIsDatePickerVisible(true)}
        className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5
        ${isDatePickerVisible ? 'border-sub1' : 'border-disabled'}`}
      >
        <View className="flex flex-col justify-center space-y-1.5">
          <Text
            className={`text-xs font-semibold leading-[18px] tracking-tight
            ${signUpState.birthday !== '' ? 'text-main1' : 'text-colorFont'}`}
          >
            생년월일
          </Text>
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="text-sm font-medium leading-[18px] text-basicFont">{displayDate}</Text>
            <DownArrow className={`${isDatePickerVisible && 'rotate-180'}`} />
          </View>
        </View>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="ko-KR"
      />
    </>
  );
};

export default BirthDay;
