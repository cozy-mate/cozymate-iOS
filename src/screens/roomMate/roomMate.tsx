import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import UserComponent from '@components/roomMate/userComponent';
import FilteringModal from '@components/roomMate/filteringModal';
import CheckBoxContainer from '@components/roomMate/checkBoxContainer';
import NoLifeStyleComponent from '@components/roomMate/noLifeStyleComponent';

import { useHasLifeStyleStore, useDetailFilterListStore } from '@zustand/member-stat/member-stat';

import { useFilter, useGetRandomMember } from '@hooks/api/member-stat';

import { RoomMateScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import MagnifierIcon from '@assets/magnifier.svg';
import FilterIcon from '@assets/roomMate/filter.svg';
import SmallXButton from '@assets/roomMate/smallXButton.svg';
import ColoredFilterIcon from '@assets/roomMate/coloredFilter.svg';

const RoomMateScreen = ({ navigation }: RoomMateScreenProps) => {
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { initialValue, detailFilterList, setDetailFilterList, clearDetailFilterList } =
    useDetailFilterListStore();

  const [chipList, setChipList] = useState<string[]>([]);

  const { fetchNextPage, hasNextPage, ...result } = useFilter(chipList, detailFilterList);

  // 무한 스크롤
  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // 라이프스타일이 없는 사용자
  const { data: userList } = useGetRandomMember();

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
    { index: 15, id: 'studying', name: '공부여부', select: false },
    { index: 16, id: 'isPlayGame', name: '게임여부', select: false },
    { index: 17, id: 'isPhoneCall', name: '전화여부', select: false },
    { index: 18, id: 'intake', name: '섭취여부', select: false },
    { index: 19, id: 'cleanSensitivity', name: '청결예민도', select: false },
    { index: 20, id: 'noiseSensitivity', name: '소음예민도', select: false },
    { index: 21, id: 'cleaningFrequency', name: '청소빈도', select: false },
    { index: 22, id: 'drinkingFrequency', name: '음주빈도', select: false },
    { index: 23, id: 'personality', name: '성격', select: false },
    { index: 24, id: 'mbti', name: 'MBTI', select: false },
  ]);

  const toHome = () => {
    navigation.goBack();
  };

  const toSearch = () => {
    navigation.navigate('UserSearchScreen');
  };

  const toOtherDetail = (memberId: number) => {
    navigation.navigate('UserDetailScreen', { memberId: memberId });
  };

  const toLifeStyleOnboarding = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (contentHeight - contentOffsetY - layoutHeight < 100) {
      loadMoreList();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(false);
  };

  const allSelectedValues = Object.values(detailFilterList)
    .flat()
    .filter((value) => value !== undefined && value !== null && value !== '');

  const [isFilterSet, setIsFilterSet] = useState<boolean>(false);

  useEffect(() => {
    if (detailFilterList === initialValue) {
      setIsFilterSet(false);
    } else {
      setIsFilterSet(true);
    }
  }, [detailFilterList, initialValue]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 상단 이전 버튼 */}
      <View className="flex flex-row items-center px-5 pb-2">
        <Pressable onPress={toHome}>
          <BackButton />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View className="my-4 flex flex-row items-center justify-between pr-5">
          <Text className="px-6 text-lg font-semibold leading-5 tracking-tight text-emphasizedFont">
            원하는 칩을 선택하면{'\n'}나와 똑같은 답변을 한 사용자만 떠요!
          </Text>
          <Pressable
            onPress={() => setIsModalOpen(true)}
            className={`rounded-lg border-[1.5px] px-3 py-[13px] ${
              isFilterSet ? 'border-main1' : 'border-disabled'
            }`}
          >
            {isFilterSet ? <ColoredFilterIcon /> : <FilterIcon />}
          </Pressable>
        </View>

        <View className="mb-5 px-5">
          <Pressable
            className="flex flex-row items-center rounded-xl bg-colorBox px-1 py-2"
            onPress={toSearch}
          >
            <View className="p-2">
              <MagnifierIcon />
            </View>
            <Text className="flex flex-row items-center py-[5.5px] text-sm font-medium text-disabledFont">
              룸메이트 닉네임을 검색해보세요
            </Text>
          </Pressable>
        </View>

        <CheckBoxContainer
          value={chipList}
          setValue={setChipList}
          items={items}
          setItems={setItems}
        />

        {allSelectedValues.length > 0 && (
          <View className="mb-8 flex flex-row items-center justify-between px-5">
            <View className="flex flex-row space-x-2">
              {allSelectedValues.map((value, index) => (
                <Pressable
                  key={index}
                  className="flex flex-row items-center rounded-lg border border-colorFont py-1 pl-3.5 pr-1.5"
                >
                  <Text className="text-xs font-semibold text-colorFont">{value}</Text>
                  <Pressable className="p-2">
                    <SmallXButton />
                  </Pressable>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={clearDetailFilterList}>
              <Text className="text-xs font-normal text-disabledFont underline">초기화</Text>
            </Pressable>
          </View>
        )}

        {/* 라이프스타일이 없는 사용자 컴포넌트 (필터링 칩 클릭 시 데이터 안보임) */}
        <View className="px-5">
          {!hasLifeStyle &&
            chipList.length === 0 &&
            userList?.result &&
            userList?.result.memberList.map((user) => (
              <UserComponent
                key={user.memberDetail.memberId}
                user={user}
                toUserDetail={() => toOtherDetail(user.memberDetail.memberId)}
              />
            ))}
          {!hasLifeStyle && chipList.length !== 0 && (
            <NoLifeStyleComponent
              pressFunc={toLifeStyleOnboarding}
              isChipClicked={chipList.length !== 0}
            />
          )}
        </View>

        {/* 라이프스타일이 있는 사용자 컴포넌트 */}
        <View className="px-5">
          {hasLifeStyle && detailFilterList === initialValue && result.data?.pages ? (
            result.data?.pages.flatMap((page) => page.result.memberList).length === 0 ? (
              <Text className="text-center text-gray-500">검색된 사용자가 없습니다.</Text>
            ) : (
              result.data?.pages
                .flatMap((page) => page.result.memberList)
                .map((user) => (
                  <UserComponent
                    key={user.memberDetail.memberId}
                    user={user}
                    toUserDetail={() => toOtherDetail(user.memberDetail.memberId)}
                  />
                ))
            )
          ) : detailFilterList !== initialValue && result.data?.pages ? (
            result.data?.pages
              .flatMap((page) => page.result.memberList)
              .map((user) => (
                <UserComponent
                  key={user.memberDetail.memberId}
                  user={user}
                  toUserDetail={() => toOtherDetail(user.memberDetail.memberId)}
                />
              ))
          ) : null}
        </View>
      </ScrollView>

      {isModalOpen && <FilteringModal onClose={handleModal} />}
    </SafeAreaView>
  );
};

export default RoomMateScreen;
