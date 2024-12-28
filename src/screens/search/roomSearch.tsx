import React, { useState, useEffect } from 'react';
import { Text, Pressable, TextInput } from 'react-native';
import { View, ScrollView, SafeAreaView } from 'react-native';

import { useSearchRoomByKeyword } from '@hooks/api/room';

import { RoomSearchScreenProps } from '@type/param/stack';

import XButton from '@assets/search/xButton.svg';

const RoomSearchScreen = ({ navigation }: RoomSearchScreenProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');

  const { data: roomList } = useSearchRoomByKeyword(debouncedKeyword);

  const handleKeywordChange = (text: string) => {
    setKeyword(text);
  };

  const deleteKeyword = () => {
    setKeyword('');
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  const toBack = () => {
    navigation.goBack();
  };

  const toRoomDetail = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  console.log(roomList);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false}>
        <View className="flex-1">
          <View className="mb-6 mt-4 flex flex-row items-center justify-between space-x-2 px-5">
            <View className="flex flex-1 flex-row justify-between rounded-xl bg-colorBox p-4">
              <View className="flex flex-row">
                <TextInput
                  className="flex-1 text-sm font-medium leading-4 text-basicFont"
                  placeholder="방 이름을 입력해주세요"
                  placeholderTextColor={'#ACADB4'}
                  value={keyword}
                  onChangeText={handleKeywordChange}
                />
                <Pressable className="flex flex-row" onPress={deleteKeyword}>
                  <XButton />
                </Pressable>
              </View>
            </View>
            <Pressable onPress={toBack} className="p-2">
              <Text className="text-sm font-medium text-emphasizedFont">취소</Text>
            </Pressable>
          </View>

          <View className="px-5">
            {keyword !== '' ? (
              roomList?.result && roomList?.result?.length > 0 ? (
                roomList.result.map((room, index) => (
                  <Pressable
                    key={room.roomId}
                    onPress={() => toRoomDetail(room.roomId)}
                    className={`flex flex-col space-y-2 border-b border-b-[#f6f6f6] px-1 py-[22px] ${
                      index === 0 && 'pt-2.5'
                    } ${index === roomList.result.length - 1 && 'border-0 pb-2.5'}`}
                  >
                    <Text className="text-base font-semibold text-emphasizedFont">{room.name}</Text>

                    <View className="flex flex-row items-center justify-between">
                      <Text className="flex text-xs font-medium text-disabledFont">
                        <Text className="text-main1">{room.arrivalMateNum}명</Text>의 룸메이트가
                        있어요
                      </Text>
                      <Text
                        className={`flex text-base font-medium ${
                          room.equality > 50 ? 'text-main1' : 'text-colorFont'
                        }`}
                      >
                        {room.equality}%
                      </Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View className="flex flex-1 items-center justify-center">
                  <Text>검색결과가 없어요</Text>
                </View>
              )
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomSearchScreen;
