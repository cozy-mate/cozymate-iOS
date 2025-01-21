import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import { useSignUpStore } from '@zustand/member/member';

import { useGetUniversityInfo } from '@hooks/api/university';

import DownArrow from '@assets/onBoard/downArrow.svg';

const Department: React.FC = () => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const { data: universityData } = useGetUniversityInfo(1);

  const [isFocused, setIsFocused] = useState<boolean>(false);
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
            ${signUpState.majorName !== '' ? 'text-main1' : 'text-colorFont'}`}
          >
            학과
          </Text>
          <View className="flex w-full flex-row items-center justify-between pb-[3px]">
            <Text
              className={`${
                signUpState.majorName !== '' ? 'text-basicFont' : 'text-disabledFont'
              } text-sm font-medium`}
            >
              {signUpState.majorName !== '' ? signUpState.majorName : '학과를 선택해주세요'}
            </Text>
            <DownArrow className={`${isListOpen && 'rotate-180'}`} />
          </View>
        </View>
      </Pressable>

      {isListOpen && (
        <FlatList
          className="mt-1 h-32 rounded-xl border border-sub1 bg-white px-5 py-3"
          data={universityData.result.departments}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSignUpState({ majorName: item });
                setIsListOpen(false);
              }}
            >
              <Text className="text-sm font-medium text-basicFont">{item}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View className="my-2 h-[1px] bg-[#F6F6F6]" />}
        />

        // <ScrollView className="mt-1 rounded-xl border border-sub1 px-5 py-3">
        //   <View>
        //     {universityData.result.departments.map((item, index) => (
        //       <Pressable
        //         key={index}
        //         onPress={() => {
        //           setSignUpState({ department: item });
        //           setDisplaySchool(item);
        //           handleFocus();
        //         }}
        //         className="border-b border-b-[#F6F6F6] py-2"
        //       >
        //         <Text className="text-sm font-medium text-basicFont">{item}</Text>
        //       </Pressable>
        //     ))}
        //   </View>
        // </ScrollView>
      )}
    </>
  );
};

export default Department;
