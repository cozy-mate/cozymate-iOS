import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import CheckBoxContainer from '@components/roomMate/checkBoxContainer';

import { ChipSelectScreenProps } from '@type/param/rootStack';

const ChipSelectScreen = ({ navigation }: ChipSelectScreenProps) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const [items, setItems] = useState([
    { index: 1, id: 'birthYear', name: '출생년도', select: false },
    { index: 2, id: 'admissionYear', name: '학번', select: false },
    { index: 3, id: 'major', name: '학과', select: false },
    { index: 4, id: 'acceptance', name: '합격여부', select: false },
    { index: 5, id: 'wakeUpTime', name: '기상시간', select: false },
    { index: 6, id: 'sleepingTime', name: '취침시간', select: false },
    { index: 7, id: 'turnOffTime', name: '소등시간', select: false },
    { index: 8, id: 'smoking', name: '흡연여부', select: false },
    { index: 9, id: 'sleepingHabit', name: '잠버릇', select: false },
    { index: 10, id: 'airConditioningIntensity', name: '에어컨', select: false },
    { index: 11, id: 'heatingIntensity', name: '히터', select: false },
    { index: 12, id: 'lifePattern', name: '생활패턴', select: false },
    { index: 13, id: 'intimacy', name: '친밀도', select: false },
    { index: 14, id: 'canShare', name: '물건공유', select: false },
    { index: 15, id: 'isPlayGame', name: '게임여부', select: false },
    { index: 16, id: 'isPhoneCall', name: '전화여부', select: false },
    { index: 17, id: 'studying', name: '공부여부', select: false },
    { index: 18, id: 'intake', name: '섭취여부', select: false },
    { index: 19, id: 'cleanSensitivity', name: '청결예민도', select: false },
    { index: 20, id: 'noiseSensitivity', name: '소음예민도', select: false },
    { index: 21, id: 'cleaningFrequency', name: '청소빈도', select: false },
    { index: 22, id: 'drinkingFrequency', name: '음주빈도', select: false },
    { index: 23, id: 'personality', name: '성격', select: false },
    { index: 24, id: 'mbti', name: 'MBTI', select: false },
  ]);

  const isComplete = selectedChips.length === 4;

  const toNext = async (): Promise<void> => {
    if (!isComplete) return;
    navigation.navigate('CompleteScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col justify-between">
        {/* 상단 View */}
        <View className="mt-14 flex">
          {/* 설명 Text */}
          <View className="mb-6 px-5 leading-loose">
            <Text className="text-xl font-semibold tracking-tight text-emphasizedFont">
              룸메이트를 선택할 때,{'\n'}가장 중요한 요소 <Text className="text-main1">4가지</Text>
              를 선택해주세요
            </Text>
          </View>

          <CheckBoxContainer
            value={selectedChips}
            setValue={setSelectedChips}
            items={items}
            setItems={setItems}
          />
        </View>

        {/* 하단 View */}
        <View className="flex px-5">
          <Pressable onPress={toNext}>
            <View className={`rounded-xl p-4 ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
              <Text className="text-center text-base font-semibold text-white">확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChipSelectScreen;
