import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Background from '@assets/roomMain/background.svg';

import LightIcon from '@assets/roomMain/icon.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

import StarImage from '@assets/cozyHome/star.svg';

import CopyIcon from '@assets/roomMain/copyIcon.svg';
import CozyBotIcon from '@assets/roomMain/cozyBotIcon.svg';

import { RoomMainScreenProps } from '@type/param/loginStack';
import { useRecoilState } from 'recoil';
import { hasRoomState } from '@recoil/recoil';

const RoomMainScreen = ({ navigation }: RoomMainScreenProps) => {
  const [, setHasRoom] = useRecoilState(hasRoomState);

  const [roomName, setRoomName] = useState<string>('피그말리온');
  const [roomCode, setRoomCode] = useState<string>('QUIIRKD');

  const [notificationData, setNotificationData] = useState([
    {
      who: '피그말리온',
      message: '의 역사적인 하루가 시작됐어요!',
      date: '06/05 17:50',
    },
    {
      who: '더기',
      message: '님이 빨래를 완료했어요! 얼른 칭찬해주세요!',
      date: '06/05 17:50',
    },
    {
      who: '델로',
      message: '님이 빨래 및 건조를 완료했어요! 얼른 칭찬해주세요!',
      date: '06/07 14:31',
    },
    {
      who: '너진',
      message: '님이 [델로한테 잘하기]를 완료했어요!',
      date: '06/05 22:50',
    },
    {
      who: '제이',
      message: '님이 화장실 청소를 까먹은 거 같아요 ㅠㅠ',
      date: '06/04 09:31',
    },
  ]);

  const toMain = () => {
    setHasRoom(false);
    navigation.navigate('MainScreen');
  };

  return (
    <View className="flex-1 bg-[#CADFFF]">
      <Background style={{ position: 'absolute' }} />
      <View className="flex mt-[70px] px-5">
        {/* 헤더 */}
        <View className="flex flex-row justify-between mb-2">
          <LightIcon />
          <View className="flex flex-row">
            <Pressable>
              <ChatIcon />
            </Pressable>
            <Pressable onPress={toMain}>
              <NotificationIcon />
            </Pressable>
          </View>
        </View>

        <View className="flex flex-col items-start mb-28">
          <Text className="text-lg font-semibold text-basicFont">여기는</Text>
          <View className="flex flex-row">
            <Text className="mb-2 text-lg font-semibold text-main1">
              {roomName}
              <Text className="text-basicFont">의 방이에요!</Text>
            </Text>
          </View>

          <Pressable className="flex">
            <View className="flex flex-row items-center justify-start px-4 py-2 bg-white opacity-60 rounded-xl">
              <Text className="text-xs font-medium text-colorFont">{roomCode}</Text>
              <CopyIcon />
            </View>
          </Pressable>
        </View>
      </View>

      <View className="flex-1 flex-col bg-white px-5 pt-[21px] pb-5 rounded-t-[40px] relative">
        <View className="absolute top-[-110px] right-2">
          <StarImage />
        </View>
        <ScrollView>
          {/* 역순 출력 (서버에서 출력 해주는 데이터에 맞게 수정해야됨) */}
          {notificationData
            .slice()
            .reverse()
            .map((data, index) => (
              <View
                key={index}
                className={`px-1 py-5 border-b-[1px] border-b-[#F2F1FA] ${
                  index === notificationData.length - 1 && 'border-b-0'
                }`}
              >
                <CozyBotIcon />
                <View className="mt-2">
                  <View className="flex flex-row mb-[2px]">
                    <Text className="text-sm font-semibold text-main1">{data.who}</Text>
                    <Text className="text-sm font-medium text-basicFont">{data.message}</Text>
                  </View>
                  <Text className="text-xs font-normal text-disabledFont">{data.date}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RoomMainScreen;
