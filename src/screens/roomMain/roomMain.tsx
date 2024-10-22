import React, { useEffect } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { getRoomData } from '@server/api/room';

import useInitFcm from '@hooks/useInitFcm';
import { useGetRoomLog } from '@hooks/api/room-log';

import { onCopyAddress } from '@utils/clipboard';
import { getProfileImage } from '@utils/profileImage';

import { RoomMainScreenProps } from '@type/param/stack';

import CopyIcon from '@assets/roomMain/copyIcon.svg';
import Background from '@assets/roomMain/background.svg';
import CozyBotIcon from '@assets/roomMain/cozyBotIcon.svg';
import ColorRightArrow from '@assets/roomMain/colorRightArrow.svg';

const RoomMainScreen = ({ navigation }: RoomMainScreenProps) => {
  const { myRoom } = useHasRoomStore();
  const { roomInfo, setRoomInfo } = useRoomInfoStore();

  const { bottom } = useSafeAreaInsets();

  const { initFcm } = useInitFcm();
  const { data: roomlogdata } = useGetRoomLog(roomInfo.roomId);

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen', { roomId: roomInfo.roomId });
  };

  useEffect(() => {
    initFcm();
    const fetchData = async () => {
      try {
        const infoResponse = await getRoomData(myRoom.roomId);

        setRoomInfo(infoResponse.result);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };
    fetchData();
  }, [myRoom.roomId, setRoomInfo]);

  const iconList = [1, 2, 3, 4];

  return (
    <View className="flex-1 bg-sub1">
      <Background style={{ position: 'absolute' }} />
      <View className="mt-[70px] flex px-5">
        {/* 헤더 */}
        <Pressable className="mb-2 flex flex-row items-center" onPress={toRoomDetail}>
          <View className="mr-2 flex flex-row">
            {iconList.map((icon, index) => (
              <View
                key={index}
                className="ml-[-4px] rounded-full"
                style={{
                  shadowColor: '#606060',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.25,
                  shadowRadius: 2,
                  backgroundColor: 'white',
                }}
              >
                {getProfileImage(icon, 20, 20)}
              </View>
            ))}
          </View>
          <ColorRightArrow />
        </Pressable>

        <View className="mb-16 flex flex-col items-start">
          <Text className="text-lg font-semibold text-basicFont">여기는</Text>
          <View className="flex flex-row">
            <Text className="mb-2 text-lg font-semibold text-main1">
              {roomInfo.name}
              <Text className="text-basicFont">의 방이에요!</Text>
            </Text>
          </View>

          {roomInfo.inviteCode && (
            <Pressable className="flex" onPress={() => onCopyAddress(roomInfo.inviteCode)}>
              <View className="flex flex-row items-center justify-start rounded-xl bg-white px-4 py-2 opacity-60">
                <Text className="text-xs font-medium text-colorFont">{roomInfo.inviteCode}</Text>
                <CopyIcon />
              </View>
            </Pressable>
          )}
        </View>
      </View>

      <View className="relative flex-1 flex-col rounded-t-[40px] bg-white px-5 pb-5 pt-8">
        <View className="absolute right-2 top-[-120px]">
          <Pressable>{getProfileImage(roomInfo.profileImage, 140, 140)}</Pressable>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: bottom + 40 }}>
          {roomlogdata.result.result.map((data, index) => (
            <View
              key={index}
              className={`border-b border-b-[#F2F1FA] px-1 py-5 ${
                index === roomlogdata.result.result.length - 1 && 'border-b-0'
              }`}
            >
              <CozyBotIcon />
              <View className="mt-2">
                <Text className="mb-[2px] flex flex-row flex-nowrap">
                  {data.content.split(/{(.*?)}/).map((part, i) => (
                    <Text
                      key={i}
                      className={`text-sm font-medium ${
                        i % 2 === 1 ? 'font-semibold text-main1' : 'text-basicFont'
                      }`}
                    >
                      {part}
                    </Text>
                  ))}
                </Text>
                <Text className="mt-[2px] text-xs font-medium text-disabledFont">
                  {data.createdAt}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RoomMainScreen;
