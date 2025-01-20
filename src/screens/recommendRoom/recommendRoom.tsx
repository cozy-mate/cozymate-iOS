import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView, SafeAreaView } from 'react-native';

import RoomComponent from '@components/recommendRoom/roomComponent';
import SortTypeBottomSheet from '@components/recommendRoom/sortTypeBottomSheet';

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

  const { fetchNextPage, hasNextPage, ...result } = useGetRandomRoom(5, sortType);

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (contentHeight - contentOffsetY - layoutHeight < 100) {
      loadMoreList();
    }
  };

  const toHome = () => {
    navigation.goBack();
  };

  const toSearch = () => {
    navigation.navigate('RoomSearchScreen');
  };

  const toRoomDetail = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  const handleSortType = (type: string) => {
    setSortType(type);
    setIsSortTypeOpen(false);
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
        </View>

        <View className="px-5">
          <View className="flex flex-col space-y-6">
            {result.data.pages[0].result.result ? (
              result.data.pages.flatMap((page) =>
                page.result.result.map((room) => (
                  <View key={room.roomId}>
                    <RoomComponent roomData={room} pressFunc={() => toRoomDetail(room.roomId)} />
                  </View>
                )),
              )
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

      <SortTypeBottomSheet
        isVisible={isSortTypeOpen}
        currentType={sortType}
        setType={handleSortType}
        closeModal={() => setIsSortTypeOpen(false)}
      />
    </SafeAreaView>
  );
};

export default RecommendRoomScreen;
