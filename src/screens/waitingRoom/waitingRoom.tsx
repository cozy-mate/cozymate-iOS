import { WaitingRoomScreenProps } from '@type/param/loginStack';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import XButton from '@assets/xButton.svg';
import HomeIcon from '@assets/waitingRoom/homeIcon.svg';
import PersonIcon from '@assets/waitingRoom/personIcon.svg';
import ResetIcon from '@assets/waitingRoom/resetIcon.svg';
import RoomMateBox from '@components/waitingRoom/RoomMateBox';

const WaitingRoomScreen = ({ navigation }: WaitingRoomScreenProps) => {
  const [roomInfo, setRoomInfo] = useState({
    roomName: '피그말리온',
    profileImage: 5,
    numOfMate: 6,
  });

  const [memberList, setMemberList] = useState([
    {
      name: '델로',
      profileImage: 1,
      state: '도착완료',
      isAdmin: true,
    },
  ]);

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        <View className="flex">
          <View className="flex flex-row justify-end mt-2 mb-8">
            <XButton />
          </View>

          <View className="flex flex-col items-center mb-10">
            <Text className="text-xl font-semibold text-emphasizedFont">
              cozymate가 모이고 있어요!
            </Text>
            <Text className="text-sm font-medium text-disabledFont">
              모든 cozymate가 모이면 방이 열려요..
            </Text>
          </View>

          <View className="flex flex-col items-center mb-8">
            <Image
              source={{
                uri: `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${roomInfo.profileImage}.png`,
              }}
              style={{ width: 120, height: 120 }}
              resizeMode="cover"
            />
            <View className="flex flex-row mt-3">
              <View className="flex flex-row items-center">
                <HomeIcon />
                <Text className="ml-1 text-xs font-medium text-basicFont">{roomInfo.roomName}</Text>
              </View>

              <View className="bg-box h-[14px] w-[1px] rounded-md mx-2" />

              <View className="flex flex-row items-center">
                <PersonIcon />
                <Text className="ml-1 text-xs font-medium text-basicFont">
                  {roomInfo.numOfMate}명
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col items-end">
            <ResetIcon />
            <View className="mt-3">
              {memberList.map((member) => (
                <RoomMateBox
                  name={member.name}
                  profileImage={member.profileImage}
                  state={member.state}
                  isAdmin={member.isAdmin}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WaitingRoomScreen;
