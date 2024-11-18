import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import FavoriteUser from '@components/myPage/favoriteUser';
import FavoriteRoom from '@components/myPage/favoriteRoom';

import { useGetFavoriteRoomList, useGetFavoriteUserList } from '@hooks/api/favorite';

import { FavoriteUserRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const FavoriteUserRoomScreen = ({ navigation, route }: FavoriteUserRoomScreenProps) => {
  const { type } = route.params;

  console.log(type);

  const { data: userList } = useGetFavoriteUserList();
  const { data: roomList } = useGetFavoriteRoomList();

  console.log(userList);
  console.log(roomList);

  const changeUserType = () => {
    navigation.navigate('FavoriteUserRoomScreen', { type: 'user' });
  };

  const changeRoomType = () => {
    navigation.navigate('FavoriteUserRoomScreen', { type: 'room' });
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 flex-col">
          <View className="my-2 flex flex-row justify-between px-5">
            <Pressable onPress={toBack}>
              <BackButton />
            </Pressable>
          </View>

          <View className="mb-5 flex flex-row space-x-2 px-5">
            <Pressable
              onPress={changeUserType}
              className={`rounded-lg border px-3.5 py-2 ${
                type === 'user' ? 'border-main1 bg-sub1' : 'border-disabled bg-white'
              }`}
            >
              <Text
                className={`text-xs ${
                  type === 'user' ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
                }`}
              >
                내가 찜한 룸메이트
              </Text>
            </Pressable>
            <Pressable
              onPress={changeRoomType}
              className={`rounded-lg border px-3.5 py-2 ${
                type === 'room' ? 'border-main1 bg-sub1' : 'border-disabled bg-white'
              }`}
            >
              <Text
                className={`text-xs ${
                  type === 'room' ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
                }`}
              >
                내가 찜한 방
              </Text>
            </Pressable>
          </View>

          <View className="flex flex-1 flex-col space-y-6 px-5">
            {type === 'user' ? (
              userList.result.length !== 0 ? (
                userList.result.map((user) => (
                  <View key={user.favoriteId}>
                    <FavoriteUser userData={user} />
                  </View>
                ))
              ) : (
                <View className="flex flex-1 items-center justify-center">
                  <Text className="text-sm font-medium text-disabledFont">
                    찜한 룸메이트가 없어요
                  </Text>
                </View>
              )
            ) : type === 'room' ? (
              roomList.result.length !== 0 ? (
                roomList.result.map((room) => (
                  <View key={room.favoriteId}>
                    <FavoriteRoom key={room.favoriteId} roomData={room} />
                  </View>
                ))
              ) : (
                <View className="flex flex-1 items-center justify-center">
                  <Text className="text-sm font-medium text-disabledFont">찜한 방이 없어요</Text>
                </View>
              )
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteUserRoomScreen;
