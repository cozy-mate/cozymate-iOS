import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { RoomDummyData } from './dummyData';

import RoomComponent from '@components/recommendRoom/RoomComponent';

import { profileState } from '@recoil/recoil';

import { RecommendRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const RecommendRoomScreen = ({ navigation }: RecommendRoomScreenProps) => {
  const profile = useRecoilValue(profileState);

  const { bottom } = useSafeAreaInsets();

  // 스크롤 시 SafeAreaView 색상 관련
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [height, setHeight] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const toHome = () => {
    navigation.goBack();
  };

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen');
  };

  return (
    <View className="bg-sub1">
      <SafeAreaView
        style={{
          backgroundColor: scrollY <= height ? '#CADFFF' : 'white',
        }}
      />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16} bounces={false}>
        <View onLayout={handleLayout}>
          {/* 상단 이전 버튼 */}
          <View className="mb-6 flex flex-row items-center pl-2">
            <Pressable onPress={toHome}>
              <BackButton />
            </Pressable>
          </View>

          <View className="px-5 pb-12">
            <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
            </Text>
          </View>
        </View>

        <View className="flex-1 bg-white px-5 pt-4" style={{ paddingBottom: bottom + 80 }}>
          {RoomDummyData.map((room, index) => (
            <RoomComponent key={index} index={index} roomData={room} toRoomDetail={toRoomDetail} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecommendRoomScreen;
