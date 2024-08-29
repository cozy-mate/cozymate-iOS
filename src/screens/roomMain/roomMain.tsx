import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import Background from '@assets/roomMain/background.svg';

import LightIcon from '@assets/roomMain/icon.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

import CopyIcon from '@assets/roomMain/copyIcon.svg';
import CozyBotIcon from '@assets/roomMain/cozyBotIcon.svg';

import { RoomMainScreenProps } from '@type/param/roomStack';
import { hasRoomState, roomInfoState } from '@recoil/recoil';
import { useRecoilState } from 'recoil';
import { onCopyAddress } from '@utils/clipboard';
import { useGetRoomLog } from '@hooks/api/room-log';
import useInitFcm from '@hooks/useInitFcm';
import { getRoomData } from '@server/api/room';
import { getProfileImage } from '@utils/profileImage';

const RoomMainScreen = ({ navigation }: RoomMainScreenProps) => {
  const [myRoom, setMyRoom] = useRecoilState(hasRoomState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const { initFcm } = useInitFcm();
  const { data: roomlogdata } = useGetRoomLog(roomInfo.roomId);

  useEffect(() => {
    initFcm();
    const fetchData = async () => {
      try {
        const infoResponse = await getRoomData(myRoom.roomId);
        console.log(infoResponse);

        setRoomInfo(infoResponse.result);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };
    fetchData();
  }, [myRoom.roomId, setRoomInfo]);

  const toChat = () => {
    navigation.navigate('ChatScreen');
  };

  const toNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <View className="flex-1 bg-[#CADFFF]">
      <Background style={{ position: 'absolute' }} />
      <View className="flex mt-[70px] px-5">
        {/* 헤더 */}
        <View className="flex flex-row justify-between mb-2">
          <LightIcon />
          <View className="flex flex-row">
            <Pressable onPress={toChat}>
              <ChatIcon />
            </Pressable>
            <Pressable onPress={toNotification}>
              <NotificationIcon />
            </Pressable>
          </View>
        </View>

        <View className="flex flex-col items-start mb-24">
          <Text className="text-lg font-semibold text-basicFont">여기는</Text>
          <View className="flex flex-row">
            <Text className="mb-2 text-lg font-semibold text-main1">
              {roomInfo.name}
              <Text className="text-basicFont">의 방이에요!</Text>
            </Text>
          </View>

          <Pressable className="flex" onPress={() => onCopyAddress(roomInfo.inviteCode)}>
            <View className="flex flex-row items-center justify-start px-4 py-2 bg-white opacity-60 rounded-xl">
              <Text className="text-xs font-medium text-colorFont">{roomInfo.inviteCode}</Text>
              <CopyIcon />
            </View>
          </Pressable>
        </View>
      </View>

      <View className="flex-1 flex-col bg-white px-5 pt-8 pb-5 rounded-t-[40px] relative">
        <View className="absolute top-[-120px] right-2">
          {getProfileImage(roomInfo.profileImage, 140, 140)}
        </View>
        <ScrollView>
          {roomlogdata.result.result.map((data, index) => (
            <View
              key={index}
              className={`px-1 py-5 border-b-[1px] border-b-[#F2F1FA] ${
                index === roomlogdata.result.result.length - 1 && 'border-b-0'
              }`}
            >
              <CozyBotIcon />
              <View className="mt-2">
                <View className="flex flex-row mb-[2px]">
                  {/* 분리된 content를 부분적으로 스타일링하여 출력 */}
                  {data.content.split(/{(.*?)}/).map((part, i) => (
                    <Text
                      key={i}
                      className={`text-sm font-medium ${
                        i % 2 === 1 ? 'text-main1 font-semibold' : 'text-basicFont'
                      }`}
                    >
                      {part}
                    </Text>
                  ))}
                </View>
                <Text className="text-xs font-normal text-disabledFont">{data.createdAt}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RoomMainScreen;
