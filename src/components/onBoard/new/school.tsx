import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { useSignUpStore } from '@zustand/member/member';

import DownArrow from '@assets/onBoard/downArrow.svg';

const University: React.FC = () => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const [universityList] = useState<{ id: number; name: string }[]>([
    { id: 1, name: '인하대학교' },
  ]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displaySchool, setDisplaySchool] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(!isFocused);
    setIsListOpen(!isListOpen);
  };

  return (
    <>
      <Pressable
        onPress={handleFocus}
        className={`flex flex-row items-center justify-between rounded-xl border bg-white px-5 py-4
         ${isFocused ? 'border-sub1' : 'border-disabled'}`}
      >
        <View className="flex flex-col justify-center space-y-1.5">
          <Text
            className={`text-xs font-semibold leading-[17px] tracking-tight
            ${signUpState.universityId !== 0 ? 'text-main1' : 'text-colorFont'}`}
          >
            학교
          </Text>
          <View className="flex w-full flex-row items-center justify-between pb-[3px]">
            <Text
              className={`${
                signUpState.universityId === 0 ? 'text-disabledFont' : 'text-basicFont'
              } text-sm font-medium`}
            >
              {signUpState.universityId === 0 ? '학교를 선택해주세요' : displaySchool}
            </Text>
            <DownArrow className={`${isListOpen && 'rotate-180'}`} />
          </View>
        </View>
      </Pressable>

      {isListOpen && (
        <View className="-mb-1 -mt-3 rounded-xl border border-sub1 px-5 py-3">
          {universityList.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                setSignUpState({ universityId: item.id });
                setDisplaySchool(item.name);
                handleFocus();
              }}
              className={`border-b border-b-[#F6F6F6] py-2 ${item.id === 1 && 'pt-0'} ${
                item.id === universityList.length && 'border-b-0 pb-0'
              }`}
            >
              <Text className="text-sm font-medium text-basicFont">{item.name}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </>
  );
};

export default University;
