import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import RoomComponent from '@components/recommendRoom/roomComponent';

import { useProfileStore } from '@zustand/member/member';

import { useGetRandomRoom } from '@hooks/api/room-recommend';

import { RecommendRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import MagnifierIcon from '@assets/magnifier.svg';
import DownArrow from '@assets/recommendRoom/downArrow.svg';

type LATEST = 'LATEST';
type AVERAGE_RATE = 'AVERAGE_RATE';
type CLOSING_SOON = 'CLOSING_SOON';

const RecommendRoomScreen = ({ navigation }: RecommendRoomScreenProps) => {
  const { profile } = useProfileStore();

  const SORT_TYPE_LABELS: Record<LATEST | AVERAGE_RATE | CLOSING_SOON, string> = {
    LATEST: '최신순',
    AVERAGE_RATE: '평균일치율순',
    CLOSING_SOON: '마감임박순',
  };

  const [isSortTypeOpen, setIsSortTypeOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('AVERAGE_RATE');

  const { data: roomList } = useGetRandomRoom(5, 0, sortType);

  const toHome = () => {
    navigation.goBack();
  };

  const toSearch = () => {
    navigation.navigate('RoomSearchScreen');
  };

  const toRoomDetail = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

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
        //onScroll={handleScroll}
        //scrollEventThrottle={16}
        bounces={false}
      >
        <View className="mb-4 mt-6 flex flex-row">
          <Text className="px-6 text-lg font-semibold leading-5 tracking-tight text-emphasizedFont">
            {profile.nickname}님과,{'\n'}꼭 맞는 방을 추천해드릴게요
          </Text>
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
              방 이름을 검색해보세요
            </Text>
          </Pressable>
        </View>

        <View className="relative z-10 self-end pr-5">
          <Pressable
            className="mb-2 flex flex-row items-center space-x-1 py-[11.5px]"
            onPress={() => setIsSortTypeOpen(!isSortTypeOpen)}
          >
            <Text className="w-fit text-sm font-medium text-basicFont">
              {SORT_TYPE_LABELS[sortType as LATEST | AVERAGE_RATE | CLOSING_SOON]}
            </Text>

            <DownArrow />
          </Pressable>

          {isSortTypeOpen && (
            <View className="absolute right-4 top-6 z-50 flex flex-col items-center justify-center rounded-lg border border-[#EBEBEB] bg-white px-2 py-1">
              <Pressable
                className="flex flex-row justify-end border-b border-b-[#F6f6f6] py-1.5"
                onPress={() => {
                  setSortType('LATEST');
                  setIsSortTypeOpen(false);
                }}
              >
                <Text className="text-center text-[10px] font-medium text-basicFont">최신순</Text>
              </Pressable>
              <Pressable
                className="flex flex-row justify-end border-b border-b-[#F6f6f6] py-1.5"
                onPress={() => {
                  setSortType('AVERAGE_RATE');
                  setIsSortTypeOpen(false);
                }}
              >
                <Text className="text-center text-[10px] font-medium text-basicFont ">
                  평균일치율순
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row justify-end py-1.5"
                onPress={() => {
                  setSortType('CLOSING_SOON');
                  setIsSortTypeOpen(false);
                }}
              >
                <Text className="text-center text-[10px] font-medium text-basicFont">
                  마감임박순
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <View className="px-5">
          <View className="flex flex-col space-y-6">
            {roomList?.result.result.length !== 0 ? (
              roomList?.result.result.map((room, index) => (
                <View key={index}>
                  <RoomComponent roomData={room} pressFunc={() => toRoomDetail(room.roomId)} />
                </View>
              ))
            ) : (
              <View className="flex h-36 items-center justify-center">
                <Text className="text-sm font-medium text-disabledFont">
                  아직 등록된 방이 없어요
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendRoomScreen;
