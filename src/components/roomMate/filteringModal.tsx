import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Modal, FlatList, Pressable, ScrollView } from 'react-native';

import { useProfileStore } from '@zustand/member/member';
import { DetailFilterList } from '@zustand/member-stat/type';
import { useDetailFilterListStore } from '@zustand/member-stat/member-stat';

import { useGetUniversityInfo } from '@hooks/api/university';
import { useGetFilteredMemberListCount } from '@hooks/api/member-stat';

import XButton from '@assets/roomMate/xButton.svg';
import SelectedBox from '@assets/roomMate/selectedBox.svg';
import SmallXButton from '@assets/roomMate/smallXButton.svg';
import NotSelectedBox from '@assets/roomMate/notSelectedBox.svg';

interface FilterList {
  index: number;
  key: string;
  title: string;
  selected: boolean;
}

interface Item {
  index: number;
  value: string | number;
  name: string;
  meridian?: string;
  select: boolean;
}

interface ItemList {
  [key: string]: Item[];
}

interface FilteringModalProps {
  onClose: () => void;
}

const FilteringModal: React.FC<FilteringModalProps> = ({ onClose }) => {
  const { profile } = useProfileStore();

  const { detailFilterList, setDetailFilterList, clearDetailFilterList } =
    useDetailFilterListStore();

  const { data: filterCount } = useGetFilteredMemberListCount(detailFilterList);

  const [filterList, setFilterList] = useState<FilterList[]>([
    { index: 1, key: 'birthYear', title: '출생년도', selected: true },
    { index: 2, key: 'acceptance', title: '합격여부', selected: false },
    { index: 3, key: 'admissionYear', title: '학번', selected: false },
    { index: 4, key: 'majorName', title: '학과', selected: false },
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

  const { data: userSchoolInfo } = useGetUniversityInfo(profile.universityId);

  const majorNameItems: Item[] = userSchoolInfo.result.departments.map((name, index) => ({
    index: index + 1,
    value: name,
    name: name,
    select: false,
  }));

  const [filterDetailItem, setFilterDetailItem] = useState<ItemList>({
    birthYear: [
      { index: 1, value: 1990, name: '1990년', select: false },
      { index: 2, value: 1991, name: '1991년', select: false },
      { index: 3, value: 1992, name: '1992년', select: false },
      { index: 4, value: 1993, name: '1993년', select: false },
      { index: 5, value: 1994, name: '1994년', select: false },
      { index: 6, value: 1995, name: '1995년', select: false },
      { index: 7, value: 1996, name: '1996년', select: false },
      { index: 8, value: 1997, name: '1997년', select: false },
      { index: 9, value: 1998, name: '1998년', select: false },
      { index: 10, value: 1999, name: '1999년', select: false },
      { index: 11, value: 2000, name: '2000년', select: false },
      { index: 12, value: 2001, name: '2001년', select: false },
      { index: 13, value: 2002, name: '2002년', select: false },
      { index: 14, value: 2003, name: '2003년', select: false },
      { index: 15, value: 2004, name: '2004년', select: false },
      { index: 16, value: 2005, name: '2005년', select: false },
    ],
  });

  const selectDetailItem = useCallback(
    (key: string, item: Item) => {
      setFilterDetailItem((prevItems) => {
        const updatedItems = { ...prevItems };
        updatedItems[key] = updatedItems[key].map((detailItem) =>
          detailItem.index === item.index
            ? { ...detailItem, select: !detailItem.select }
            : detailItem,
        );

        const selectedValues = updatedItems[key]
          .filter((detailItem) => detailItem.select)
          .map((detailItem) => detailItem.value);

        setDetailFilterList({ [key]: selectedValues });
        return updatedItems;
      });
    },
    [setDetailFilterList],
  );

  const removeSelectedValue = (key: string, value: string | number) => {
    setFilterDetailItem((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[key]) {
        updatedItems[key] = updatedItems[key].map((item) =>
          item.value === value ? { ...item, select: false } : item,
        );
      }

      // Zustand 상태 업데이트
      const updatedSelectedValues = updatedItems[key]
        .filter((item) => item.select)
        .map((item) => item.value);

      setDetailFilterList({ [key]: updatedSelectedValues });

      return updatedItems;
    });
  };

  const handleClearItems = () => {
    clearDetailFilterList();
    setFilterDetailItem((prevItems) => {
      const updatedItems = { ...prevItems };
      Object.keys(updatedItems).forEach((key) => {
        updatedItems[key] = updatedItems[key].map((item) => ({
          ...item,
          select: false,
        }));
      });
      return updatedItems;
    });
  };

  const allSelectedValues = Object.values(detailFilterList)
    .flat()
    .filter((value) => value !== undefined && value !== null && value !== '');

  console.log(detailFilterList);

  useEffect(() => {
    setFilterDetailItem((prevItems) => {
      const updatedItems = { ...prevItems };
      Object.keys(detailFilterList).forEach((key) => {
        const typedKey = key as keyof DetailFilterList;
        if (filterDetailItem[typedKey]) {
          updatedItems[typedKey] = filterDetailItem[typedKey].map((item) => {
            // 타입 확인
            const isIncluded =
              Array.isArray(detailFilterList[typedKey]) &&
              detailFilterList[typedKey].includes(item.value as never);
            return {
              ...item,
              select: isIncluded,
            };
          });
        }
      });
      return updatedItems;
    });
  }, [detailFilterList]);

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

            <FlatList
              data={filterDetailItem[selectedFilter] || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  key={item.index}
                  onPress={() => selectDetailItem(selectedFilter, item)}
                  className={`flex flex-row items-center`}
                >
                  <View className="p-1.5">
                    {item.select ? <SelectedBox /> : <NotSelectedBox />}
                  </View>
                  <Text
                    className={`tracking-tight ${
                      item.select ? 'font-medium text-basicFont' : 'font-normal text-disabledFont'
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              contentContainerStyle={{ columnGap: 8, rowGap: 8 }}
              key={selectedFilter}
            />
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
                    <Pressable
                      onPress={() => {
                        const key = Object.keys(detailFilterList).find((key) =>
                          detailFilterList[key]?.includes(value),
                        );
                        if (key) removeSelectedValue(key, value);
                      }}
                      className="p-2"
                    >
                      <SmallXButton />
                    </Pressable>
                  </Pressable>
                ))}
            </View>
            <Pressable onPress={handleClearItems} className="flex flex-row justify-end">
              <Text className="text-sm text-disabledFont underline">초기화</Text>
            </Pressable>

            <Pressable className="mb-5 rounded-xl bg-main1 p-4" onPress={onClose}>
              <Text className="text-center text-base font-semibold text-white">
                {filterCount?.result}명의 룸메이트 보기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilteringModal;
