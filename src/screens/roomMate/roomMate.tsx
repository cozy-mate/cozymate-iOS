import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import SearchModal from '@components/roomMate/searchModal';
import CheckBoxContainer from '@components/roomMate/checkBoxContainer';
import SameAnswerContainer from '@components/roomMate/sameAnswerContainer';
import DetailSearchModal from '@components/roomMate/trash/detailSearchModal';
import NoLifeStyleComponent from '@components/roomMate/noLifeStyleComponent';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { OtherBasicData, OtherLifeStyleState } from '@recoil/recoil';

import { searchUsers, getUserDetailData, getOtherUserDetailData } from '@server/api/member-stat';

import { useSearchUsers, useSearchUsersWithFilters } from '@hooks/api/member-stat';

import { RoomMateScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import FilterIcon from '@assets/roomMate/filter.svg';

type UserItem = {
  memberId: number;
  memberName: string;
  memberNickName: string;
  memberAge: number;
  memberPersona: number;
  numOfRoommate: number;
  equality: number;
};

const RoomMateScreen = ({ navigation }: RoomMateScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const { hasLifeStyle } = useHasLifeStyleStore();

  const [filterList, setFilterList] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const [displayedUsers, setDisplayedUsers] = useState<UserItem[]>([]); // 표시할 사용자 목록

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(false);
  };

  const [items, setItems] = useState([
    { index: 1, id: 'admissionYear', name: '학번', select: false },
    { index: 2, id: 'major', name: '학과', select: false },
    { index: 3, id: 'numOfRoommate', name: '신청실', select: false },
    { index: 4, id: 'acceptance', name: '합격여부', select: false },
    { index: 5, id: 'wakeUpTime', name: '기상시간', select: false },
    { index: 6, id: 'sleepingTime', name: '취침시간', select: false },
    { index: 7, id: 'turnOffTime', name: '소등시간', select: false },
    { index: 8, id: 'smoking', name: '흡연여부', select: false },
    { index: 9, id: 'sleepingHabit', name: '잠버릇', select: false },
    { index: 10, id: 'airConditioningIntensity', name: '에어컨 강도', select: false },
    { index: 11, id: 'heatingIntensity', name: '히터 강도', select: false },
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
    { index: 22, id: 'personality', name: '성격', select: false },
    { index: 23, id: 'mbti', name: 'MBTI', select: false },
  ]);

  const { data: sameanswerdata } = useSearchUsersWithFilters(filterList);
  const { data: similarmatedata } = useSearchUsers();

  const toHome = () => {
    navigation.goBack();
  };

  const toOtherDetail = (memberId: number) => {
    navigation.navigate('UserDetailScreen', { memberId: memberId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* 상단 이전 버튼 */}
        <View className="mb-6 flex flex-row items-center pl-2">
          <Pressable onPress={toHome}>
            <BackButton />
          </Pressable>
        </View>

        <View className="mb-4 flex flex-row items-center justify-between pr-5">
          <Text className="px-5 text-lg font-semibold leading-5 tracking-tight text-emphasizedFont">
            원하는 칩을 선택하면{'\n'}나와 똑같은 답변을 한 사용자만 떠요!
          </Text>
          <Pressable onPress={() => setIsModalOpen(true)}>
            <View className="rounded-lg border border-disabled px-3 py-[13px]">
              <FilterIcon />
            </View>
          </Pressable>
        </View>

        <CheckBoxContainer
          value={filterList}
          setValue={setFilterList}
          items={items}
          setItems={setItems}
        />

        {/* 사용자 목록 */}
        <View
          className="mb-9 flex flex-col items-center px-5"
          style={{ paddingBottom: bottom + 20 }}
        >
          {hasLifeStyle ? (
            displayedUsers.length > 0 ? (
              displayedUsers.map((user, index) => (
                <SameAnswerContainer
                  key={user.memberId}
                  index={index}
                  user={user}
                  toUserDetail={() => toOtherDetail(user.memberId)}
                />
              ))
            ) : (
              <View>
                <Text>비어있음</Text>
              </View>
            )
          ) : displayedUsers.length > 0 || filterList.length > 0 ? (
            <NoLifeStyleComponent />
          ) : (
            <View>
              <Text>비어있음</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {isModalOpen && <SearchModal onClose={handleModal} />}
    </SafeAreaView>
  );
};

export default RoomMateScreen;
