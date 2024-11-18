import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Pressable, ScrollView } from 'react-native';

import FilteringOption from './filteringOption';

import { useGetFilteredMemberListCount } from '@hooks/api/member-stat';

import XButton from '@assets/roomMate/xButton.svg';
import SmallXButton from '@assets/roomMate/smallXButton.svg';

interface FilteringModalProps {
  onClose: () => void;
}

interface FilterList {
  index: number;
  key: string;
  title: string;
  selected: boolean;
}

interface SelectedValueList {
  [key: string]: (string | number)[];
}

const FilteringModal: React.FC<FilteringModalProps> = ({ onClose }) => {
  const [filterList, setFilterList] = useState<FilterList[]>([
    { index: 1, key: 'birthYear', title: '출생년도', selected: true },
    { index: 2, key: 'acceptance', title: '합격여부', selected: false },
    { index: 3, key: 'admissionYear', title: '학번', selected: false },
    { index: 4, key: 'major', title: '학과', selected: false },
    { index: 5, key: 'wakeUpTime', title: '기상시간', selected: false },
    { index: 6, key: 'sleepingTime', title: '취침시간', selected: false },
    { index: 7, key: 'turnOffTime', title: '소등시간', selected: false },
    { index: 8, key: 'smoking', title: '흡연여부', selected: false },
    { index: 9, key: 'sleepingHabit', title: '잠버릇', selected: false },
    { index: 10, key: 'airConditioningIntensity', title: '에어컨', selected: false },
    { index: 11, key: 'heatingIntensity', title: '히터', selected: false },
    { index: 12, key: 'lifePattern', title: '생활패턴', selected: false },
    { index: 13, key: 'intimacy', title: '친밀도', selected: false },
    { index: 14, key: 'canShare', title: '물건공유', selected: false },
    { index: 15, key: 'isPlayGame', title: '게임여부', selected: false },
    { index: 16, key: 'isPhoneCall', title: '전화여부', selected: false },
    { index: 17, key: 'studying', title: '공부여부', selected: false },
    { index: 18, key: 'intake', title: '섭취여부', selected: false },
    { index: 19, key: 'cleanSensitivity', title: '청결예민도', selected: false },
    { index: 20, key: 'noiseSensitivity', title: '소음예민도', selected: false },
    { index: 21, key: 'cleaningFrequency', title: '청소빈도', selected: false },
    { index: 22, key: 'drinkingFrequency', title: '음주빈도', selected: false },
    { index: 23, key: 'personality', title: '성격', selected: false },
    { index: 24, key: 'mbti', title: 'MBTI', selected: false },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string>('birthYear');

  // 필터링 선택
  const handleFilter = (filterList: FilterList) => {
    setFilterList((prevList) =>
      prevList.map((filter) =>
        filter.index === filterList.index
          ? { ...filter, selected: true }
          : { ...filter, selected: false },
      ),
    );

    setSelectedFilter(filterList.key);
  };

  const [selectedValueList, setSelectedValueList] = useState<SelectedValueList>({
    birthYear: [],
    acceptance: [],
    admissionYear: [],
    major: [],
    wakeUpTime: [],
    sleepingTime: [],
    turnOffTime: [],
    smoking: [],
    sleepingHabit: [],
    airConditioningIntensity: [],
    heatingIntensity: [],
    lifePattern: [],
    intimacy: [],
    canShare: [],
    isPlayGame: [],
    isPhoneCall: [],
    studying: [],
    intake: [],
    cleanSensitivity: [],
    noiseSensitivity: [],
    cleaningFrequency: [],
    drinkingFrequency: [],
    personality: [],
    mbti: [],
  });

  const clearAllValues = () => {
    setSelectedValueList((prevSelected) => {
      const updatedList = { ...prevSelected };
      Object.keys(updatedList).forEach((key) => {
        updatedList[key] = []; // 각 키의 값을 빈 배열로 설정
      });
      return updatedList;
    });
  };

  const allSelectedValues = Object.values(selectedValueList)
    .flat()
    .filter((value) => value !== undefined && value !== null && value !== ''); // 빈 값 제외

  const { mutateAsync: filterCount } = useGetFilteredMemberListCount();

  useEffect(() => {
    const getFilteredMemberCount = async () => {
      const count = await filterCount(selectedValueList);
      console.log(count);
    };
    getFilteredMemberCount();
  }, [selectedValueList]);

  return (
    <Modal transparent={true} animationType="slide">
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col justify-end bg-modalBack">
        <View className="flex h-3/4 flex-col justify-between rounded-t-[20px] bg-white px-5 py-3">
          <View className="flex flex-col">
            <Pressable
              onPress={onClose}
              className="mb-2 flex h-10 flex-row items-center justify-end"
            >
              <XButton />
            </Pressable>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mb-4 space-x-2 border-b border-b-[#f6f6f6]"
            >
              {filterList.map((filter) => (
                <Pressable
                  key={filter.index}
                  onPress={() => handleFilter(filter)}
                  className={`px-1 py-2 ${
                    filter.selected ? 'border-b border-b-emphasizedFont' : 'border-0'
                  }`}
                >
                  <Text
                    className={`pb-2 ${
                      filter.selected
                        ? 'font-semibold text-emphasizedFont'
                        : 'font-medium text-disabledFont'
                    }`}
                  >
                    {filter.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <FilteringOption selectedFilter={selectedFilter} selectFunc={setSelectedValueList} />
          </View>

          <View className="space-y-4">
            <View className="flex flex-row space-x-2">
              {allSelectedValues.length > 0 &&
                allSelectedValues.map((value, index) => (
                  <Pressable
                    key={index}
                    className="flex flex-row items-center rounded-full border border-main1 bg-sub2 py-1 pl-3.5 pr-1.5"
                  >
                    <Text className="text-xs font-semibold text-main1">{value}</Text>
                    <Pressable className="p-2">
                      <SmallXButton />
                    </Pressable>
                  </Pressable>
                ))}
            </View>
            <Pressable onPress={clearAllValues} className="flex flex-row justify-end">
              <Text className="text-sm text-disabledFont underline">초기화</Text>
            </Pressable>
            <Pressable className="mb-5 rounded-xl bg-main1 p-4">
              <Text className="text-center text-base font-semibold text-white">
                2명의 룸메이트 보기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilteringModal;
