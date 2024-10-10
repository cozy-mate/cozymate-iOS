import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { hasRoomState, roomInfoState, MyLifeStyleState } from '@recoil/recoil';

import { getRoomData } from '@server/api/room';
import { getUserDetailData } from '@server/api/member-stat';

import useInitFcm from '@hooks/useInitFcm';
import { useGetRoomLog } from '@hooks/api/room-log';

import { onCopyAddress } from '@utils/clipboard';
import { getProfileImage } from '@utils/profileImage';

import { RoomMainScreenProps } from '@type/param/stack';

import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import CopyIcon from '@assets/roomMain/copyIcon.svg';
import Background from '@assets/roomMain/background.svg';
import CozyBotIcon from '@assets/roomMain/cozyBotIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

const RoomMainScreen = ({ navigation }: RoomMainScreenProps) => {
  const toJoin = () => {
    navigation.navigate('CozyHomeScreen');
  };

  const { bottom } = useSafeAreaInsets();

  const [myRoom, setMyRoom] = useRecoilState(hasRoomState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [, setMyLifeStyleData] = useRecoilState(MyLifeStyleState);

  const { initFcm } = useInitFcm();
  const { data: roomlogdata } = useGetRoomLog(roomInfo.roomId);

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
    const getLifeStyle = async () => {
      try {
        const response = await getUserDetailData();

        setMyLifeStyleData(response.result);
      } catch (error: any) {
        if (error.response.data.code === 'MEMBERSTAT402') {
          console.log('라이프 스타일 없음');
        }
      }
    };
    fetchData();
    getLifeStyle();
  }, [myRoom.roomId, setRoomInfo]);

  const toChat = () => {
    navigation.navigate('ChatScreen');
  };

  const toNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <View className="flex-1 bg-sub1">
      <Background style={{ position: 'absolute' }} />
      <View className="mt-[70px] flex px-5">
        {/* 헤더 */}
        <View className="mb-2 flex flex-row justify-end">
          <View className="flex flex-row">
            <Pressable onPress={toChat}>
              <ChatIcon />
            </Pressable>
            <Pressable onPress={toNotification}>
              <NotificationIcon />
            </Pressable>
          </View>
        </View>

        <View className="mb-16 flex flex-col items-start">
          <Text className="text-lg font-semibold text-basicFont">여기는</Text>
          <View className="flex flex-row">
            <Text className="mb-2 text-lg font-semibold text-main1">
              {roomInfo.name}
              <Text className="text-basicFont">의 방이에요!</Text>
            </Text>
          </View>

          <Pressable className="flex" onPress={() => onCopyAddress(roomInfo.inviteCode)}>
            <View className="flex flex-row items-center justify-start rounded-xl bg-white px-4 py-2 opacity-60">
              <Text className="text-xs font-medium text-colorFont">{roomInfo.inviteCode}</Text>
              <CopyIcon />
            </View>
          </Pressable>
        </View>
      </View>

      <View className="relative flex-1 flex-col rounded-t-[40px] bg-white px-5 pb-5 pt-8">
        <View className="absolute right-2 top-[-120px]">
          <Pressable onPress={toJoin}>{getProfileImage(roomInfo.profileImage, 140, 140)}</Pressable>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: bottom + 20 }}>
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
