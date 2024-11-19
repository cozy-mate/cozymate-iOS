import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  NativeScrollEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
} from 'react-native';

import RecommendRoom from './recommendRoom';

import { useProfileStore } from '@zustand/member/member';

import RightArrow from '@assets/cozyHome/smallRightArrow.svg';

interface RecommendRoomListProps {
  rooms: {
    roomId: number;
    name: string;
    hashtags: string[];
    equality: number;
    numOfArrival: number;
    maxMateNum: number;
    equalMemberStatNum: Record<string, number>;
  }[];
  toRoomDetail: (id: number) => void;
  toRoomRecommend: () => void;
}

const RecommendRoomList: React.FC<RecommendRoomListProps> = ({
  rooms,
  toRoomDetail,
  toRoomRecommend,
}) => {
  const { profile } = useProfileStore();

  const [roomComponentWidth, setRoomComponentWidth] = useState<number>(0);
  const [roomCurrentIndex, setRoomCurrentIndex] = useState<number>(0);

  // 레이아웃이 변경될 때 크기를 계산하는 함수
  const onLayoutRoom = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setRoomComponentWidth(width);
  }, []);

  // "꼭 맞는 방을 추천해드릴게요" 부분의 룸 컴포넌트의 index가 변경될 때 현재 인덱스를 계산하는 메서드
  const handleRecommendRoomScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / roomComponentWidth);
    setRoomCurrentIndex(index);
  };

  return (
    <View className="px-5">
      <View className="mb-4 flex flex-row items-center justify-between">
        <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">
          {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
        </Text>
        <Pressable className="flex flex-row items-center" onPress={toRoomRecommend}>
          <Text className="mr-1 text-xs font-semibold text-disabledFont">더보기</Text>
          <RightArrow />
        </Pressable>
      </View>

      <FlatList
        data={rooms}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={roomComponentWidth}
        onScroll={handleRecommendRoomScroll}
        keyExtractor={(item) => item.roomId.toString()}
        decelerationRate="fast"
        pagingEnabled
        disableIntervalMomentum
        scrollEventThrottle={16}
        bounces={false}
        renderItem={({ item }) => (
          <RecommendRoom room={item} onLayout={onLayoutRoom} pressFunc={toRoomDetail} />
        )}
      />

      <View className="mt-4 flex flex-row justify-center space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            className={`${
              index === roomCurrentIndex ? 'w-4 bg-main1' : 'w-2 bg-disabled'
            } h-2 rounded-full`}
          />
        ))}
      </View>
    </View>
  );
};

export default RecommendRoomList;
