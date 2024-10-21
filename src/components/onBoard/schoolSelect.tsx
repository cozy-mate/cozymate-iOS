import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import DownArrow from '@assets/onBoard/downArrow.svg';

interface SchoolSelectProps {
  school: number;
  setSchool: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

const SchoolSelect: React.FC<SchoolSelectProps> = ({ school, setSchool, title }) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displaySchool, setDisplaySchool] = useState<string>('');

  const [isSchoolListOpen, setIsSchoolListOpen] = useState<boolean>(false);

  // TextInput 밖에 영역 클릭 시에도 focusing 하게 하는 함수
  const handleFocus = () => {
    setIsFocused(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 다른 곳에 focusing 옮겨졌을때 기존 focusing 없애는 함수
  const handleBlur = () => {
    setIsFocused(false);
    setIsSchoolListOpen(false);
  };

  const schoolList = [
    { index: 1, value: 1, title: '인하대학교' },
    { index: 2, value: 2, title: '한국공학대학교' },
    { index: 3, value: 3, title: '가톨릭대학교' },
    { index: 4, value: 4, title: '숭실대학교' },
  ];

  const majorList = [
    { index: 1, value: 1, title: '경영학과' },
    { index: 2, value: 2, title: '정보통신공학과' },
    { index: 3, value: 3, title: '컴퓨터공학과' },
    { index: 4, value: 4, title: '문화콘텐츠문화경영학과' },
  ];

  const selectedList = title === '학교' ? schoolList : majorList;

  const isActive = isFocused || school !== 0;

  return (
    <>
      <Pressable
        onPress={() => {
          handleFocus();
          setIsSchoolListOpen(true);
        }}
        className={`mb-4 box-border flex flex-row items-center justify-between rounded-xl border bg-white px-5 py-4
        ${isActive ? 'border-sub1' : 'border-disabled'}`}
      >
        <View className="flex flex-col items-start justify-center">
          <Text
            className={`text-xs font-semibold leading-[17px] tracking-tight
            ${isFocused ? 'text-main1' : 'text-colorFont'}`}
          >
            {title}
          </Text>
          <View className="mt-1.5 flex w-full flex-row items-center justify-between pb-[3px]">
            <Text
              className={`${
                school === 0 ? 'text-disabledFont' : 'text-basicFont'
              } text-sm font-medium`}
            >
              {school === 0 ? '학교를 선택해주세요' : displaySchool}
            </Text>
            <DownArrow />
          </View>
        </View>
        <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
      </Pressable>

      {isSchoolListOpen && (
        <View className="mb-4 mt-[-12px] rounded-xl border border-sub1 px-5 py-3">
          {selectedList.map((school) => (
            <Pressable
              key={school.index}
              onPress={() => {
                setSchool(school.value);
                setDisplaySchool(school.title);
                setIsSchoolListOpen(false);
              }}
              className={`border-b border-b-[#f6f6f6] py-2 ${school.index == 1 && 'pt-0'} ${
                school.index == schoolList.length && 'border-0 pb-0'
              }`}
            >
              <Text className="text-sm font-medium text-basicFont">{school.title}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </>
  );
};

export default SchoolSelect;
