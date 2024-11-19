import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import RecommendUserComponent from './recommendUser';

import { useProfileStore } from '@zustand/member/member';

import RightArrow from '@assets/cozyHome/smallRightArrow.svg';

interface RecommendUserListProps {
  users: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string | null;
      majorName: string | null;
      persona: number;
    };
    equality: number | null;
    preferenceStats: Record<string, string | number | null>;
  }[];
  toRoommate: () => void;
  toUserDetail: (id: number) => void;
}

const RecommendUserList: React.FC<RecommendUserListProps> = ({
  users,
  toRoommate,
  toUserDetail,
}) => {
  const { profile } = useProfileStore();

  const [userComponentWidth, setUserComponentWidth] = useState<number>(0);
  const [userCurrentIndex, setUserCurrentIndex] = useState<number>(0);

  // 레이아웃이 변경될 때 크기를 계산하는 함수
  const onLayoutUser = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setUserComponentWidth(width);
  }, []);

  // "이런 룸메이트는 어때요?" 부분의 유저 컴포넌트의 index가 변경될 때 현재 인덱스를 계산하는 메서드
  const handleSameAnswerUserScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / userComponentWidth);
    setUserCurrentIndex(index);
  };

  return (
    <View className="px-5">
      <View className="mb-4 flex flex-row items-center justify-between">
        <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">
          {profile.nickname}님과{'\n'}꼭 맞는 룸메이트를 추천해드릴게요
        </Text>
        <Pressable className="flex flex-row items-center" onPress={toRoommate}>
          <Text className="mr-1 text-xs font-semibold text-disabledFont">더보기</Text>
          <RightArrow />
        </Pressable>
      </View>

      <FlatList
        data={users}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={userComponentWidth}
        onScroll={handleSameAnswerUserScroll}
        keyExtractor={(item) => item.memberDetail.memberId.toString()}
        decelerationRate="fast"
        pagingEnabled
        disableIntervalMomentum
        scrollEventThrottle={16}
        bounces={false}
        renderItem={({ item }) => (
          <RecommendUserComponent user={item} onLayout={onLayoutUser} toUserDetail={toUserDetail} />
        )}
      />

      <View className="mt-4 flex flex-row justify-center space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            className={`${
              index === userCurrentIndex ? 'w-4 bg-main1' : 'w-2 bg-disabled'
            } h-2 rounded-full`}
          />
        ))}
      </View>
    </View>
  );
};

export default RecommendUserList;
