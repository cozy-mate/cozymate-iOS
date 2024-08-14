import React, { Fragment, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

import { HomeScreenProps } from '@type/param/loginStack';
import { useRecoilState } from 'recoil';
import { hasRoomState } from '@recoil/recoil';
import { getProfile } from '@server/api/member';

const CozyHomeScreen = ({ navigation }: HomeScreenProps) => {
  useEffect(() => {
    const getMyProfile = async () => {
      const response = await getProfile();
      console.log(response);
    };
    getMyProfile();
  }, []);

  const [, setHasRoom] = useRecoilState(hasRoomState);

  const toCreateRoom = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toJoinRoom = () => {
    navigation.navigate('JoinRoomScreen');
  };

  const toSchoolAuthentication = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  const isActive = true;

  const handleHasRoom = () => {
    setHasRoom(true);
    navigation.navigate('RoomMainScreen');
  };

  return (
    <Fragment>
      <SafeAreaView className="bg-[#F5F9FF]" />
      <SafeAreaView className="flex-col flex-1 bg-white">
        <View className="flex pt-4 bg-[#F5F9FF]">
          <View className="flex flex-row justify-between items-center px-5 mb-[33px]">
            <Pressable>
              <Text className="text-2xl font-extrabold">
                <Text className="text-[#FFE28B]">cozy</Text>
                <Text className="text-[#BDD8FF]">mate</Text>
              </Text>
            </Pressable>

            <View className="flex flex-row">
              <Pressable>
                <ChatIcon />
              </Pressable>
              <Pressable onPress={handleHasRoom}>
                <NotificationIcon />
              </Pressable>
            </View>
          </View>

          <View className="flex flex-col items-start mb-[147px] px-5">
            <Text className="mb-4 text-base font-semibold text-emphasizedFont">
              룸메이트와 함께 방을 만들어야{'\n'}롤앤룰, 피드를 이용할 수 있어요!
            </Text>

            <Pressable onPress={toSchoolAuthentication}>
              <View className="rounded-[81px] bg-sub1 px-6 py-3">
                <Text className="text-xs font-semibold text-main1">룸메이트 구하러 가기</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex flex-row justify-between px-5 pt-[26px] ">
          {/* 코지메이트 초대하기 버튼 */}
          <View
            className={`${!isActive ? 'bg-colorBox' : 'bg-box'} px-4 py-4 rounded-xl w-[162px]`}
          >
            <Pressable className="flex flex-col">
              <Text
                className={`${
                  !isActive ? 'text-main1' : 'text-disabledFont'
                } text-base font-semibold mb-1 leading-[19px]`}
              >
                코지메이트{'\n'}초대하기
              </Text>
              <Text
                className={`${
                  !isActive ? 'text-main1' : 'text-disabledFont'
                } text-xs font-medium leading-[17px]`}
              >
                cozymate로{'\n'}룸메이트를 구한 경우에만{'\n'}이용할 수 있어요!
              </Text>
            </Pressable>
          </View>

          <View className="flex flex-col">
            {/* 초대코드로 방 만들기 버튼 */}
            <View
              className={`${
                isActive ? 'bg-colorBox' : 'bg-box'
              } px-4 py-4 rounded-xl w-[162px] mb-2 min-h-[138px]`}
            >
              <Pressable onPress={toCreateRoom} className="flex-row">
                <Text
                  className={`${
                    isActive ? 'text-main1' : 'text-disabledFont'
                  } text-base font-semibold leading-[19px]`}
                >
                  초대코드로{'\n'}방 만들기
                </Text>
              </Pressable>
            </View>

            {/* 초대코드로 방 참여하기 버튼 */}
            <View
              className={`${
                isActive ? 'bg-colorBox' : 'bg-box'
              } px-4 py-4 rounded-xl w-[162px] min-h-[138px]`}
            >
              <Pressable onPress={toJoinRoom} className="flex-row">
                <Text
                  className={`${
                    isActive ? 'text-main1' : 'text-disabledFont'
                  } text-base font-semibold leading-[19px]`}
                >
                  초대코드로{'\n'}방 참여하기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default CozyHomeScreen;
