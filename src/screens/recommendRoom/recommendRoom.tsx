import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import SearchInputBox from '@components/common/searchInputBox';
import RoomComponent from '@components/recommendRoom/roomComponent';

import { useProfileStore } from '@zustand/member/member';

import { useGetRandomRoom } from '@hooks/api/room-recommend';

import { RecommendRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const RecommendRoomScreen = ({ navigation }: RecommendRoomScreenProps) => {
  const { profile } = useProfileStore();

  const { bottom } = useSafeAreaInsets();

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
    <SafeAreaView className="bg-white">
      <ScrollView bounces={false}>
        <View className="px-5">
          <View className="mb-4 flex flex-row items-center">
            <Pressable onPress={toHome}>
              <BackButton />
            </Pressable>
          </View>

          <View className="mb-4">
            <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님과,{'\n'}꼭 맞는 방을 추천해드릴게요
            </Text>
          </View>

          <View className="mb-5">
            <SearchInputBox
              type="touch"
              placeholder="방 이름을 검색해보세요!"
              pressFunc={toSearch}
            />
          </View>

          <Pressable className="mb-2 flex flex-row justify-end">
            <Text className="text-sm font-medium text-basicFont">평균일치율순</Text>
          </Pressable>

          <View style={{ paddingBottom: bottom + 80 }}>
            <View className="flex flex-col space-y-6">
              {roomList?.result.recommendations.map((room, index) => (
                <View key={index}>
                  <RoomComponent roomData={room} pressFunc={() => toRoomDetail(room.roomId)} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendRoomScreen;
