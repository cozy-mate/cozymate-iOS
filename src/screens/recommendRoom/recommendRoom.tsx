import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import RoomComponent from '@components/recommendRoom/roomComponent';

import { useProfileStore } from '@zustand/member/member';

import { useGetRandomRoom } from '@hooks/api/room-recommend';

import { RecommendRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import MagnifierIcon from '@assets/magnifier.svg';

const RecommendRoomScreen = ({ navigation }: RecommendRoomScreenProps) => {
  const { profile } = useProfileStore();

  const { data: roomList } = useGetRandomRoom(10);

  const toHome = () => {
    navigation.goBack();
  };

  const toSearch = () => {
    navigation.navigate('SearchScreen', { type: 'room' });
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
        <View className="mb-4 flex flex-row">
          <Text className="px-5 text-lg font-semibold leading-5 tracking-tight text-emphasizedFont">
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

        <Pressable className="mb-2 flex flex-row justify-end px-5">
          <Text className="text-sm font-medium text-basicFont">평균일치율순</Text>
        </Pressable>

        <View className="px-5">
          <View className="flex flex-col space-y-6">
            {roomList?.result.recommendations.map((room, index) => (
              <View key={index}>
                <RoomComponent roomData={room} pressFunc={() => toRoomDetail(room.roomId)} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendRoomScreen;
