import React, { Fragment, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import HomeBack from '@assets/cozyHome/homeBack.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

import { HomeScreenProps } from '@type/param/loginStack';
import { useRecoilState } from 'recoil';
import { MyLifeStyleState } from '@recoil/recoil';
import { getMyProfile } from '@server/api/member';
import { getUserDetailData } from '@server/api/member-stat';

import useInitFcm from '@hooks/useInitFcm';

const CozyHomeScreen = ({ navigation }: HomeScreenProps) => {
  const [, setMyLifeStyleData] = useRecoilState(MyLifeStyleState);

  const { initFcm } = useInitFcm();

  useEffect(() => {
    const getProfile = async () => {
      const response = await getMyProfile();
      console.log(response);
    };
    getProfile();
    initFcm();
  }, []);

  const toCreateRoom = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toJoinRoom = () => {
    navigation.navigate('JoinRoomScreen');
  };

  const toSchoolAuthentication = async () => {
    try {
      const response = await getUserDetailData();
      setMyLifeStyleData(response.result);

      navigation.navigate('MainScreen', { screen: 'RoomMateScreen' });
    } catch (error: any) {
      console.log(error.response.data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LifeStyleOnboardingScreen' }],
      });
    }
  };

  const isActive = true;

  return (
    <Fragment>
      <SafeAreaView className="bg-[#CADFFF]" />
      <SafeAreaView className="flex-col flex-1 bg-white">
        <View className="flex pt-4 bg-[#CADFFF]">
          <HomeBack style={{ position: 'absolute' }} />
          <View className="flex flex-row justify-between items-center px-5 mb-[33px]">
            <Pressable>
              <Text className="text-2xl font-extrabold font-['Cafe24_Meongi_B']">
                <Text className="text-main2">cozy</Text>
                <Text className="text-main1">mate</Text>
              </Text>
            </Pressable>

            <View className="flex flex-row">
              <Pressable>
                <ChatIcon />
              </Pressable>
              <Pressable>
                <NotificationIcon />
              </Pressable>
            </View>
          </View>

          <View className="flex flex-col items-start mb-[147px] px-5">
            <Text className="mb-4 text-xl font-semibold tracking-tight text-emphasizedFont">
              룸메이트와 함께 방을 만들어야{'\n'}롤앤룰, 피드를 이용할 수 있어요!
            </Text>

            <Pressable onPress={toSchoolAuthentication}>
              <View className="rounded-[81px] bg-white px-6 py-3">
                <Text className="text-sm font-semibold text-main1">룸메이트 구하러 가기</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex flex-row justify-between px-5 pt-[26px] h-[284px] space-x-3">
          {/* 코지메이트 초대하기 버튼 */}
          <View className={`${!isActive ? 'bg-colorBox' : 'bg-box'} px-4 py-4 rounded-xl flex-1`}>
            <Pressable className="flex flex-col items-start h-full">
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

          {/* 초대코드로 방 만들기 & 방 참여하기 버튼 */}
          <View className="flex flex-col flex-1 space-y-2">
            <View className={`${isActive ? 'bg-colorBox' : 'bg-box'} px-4 py-4 rounded-xl flex-1`}>
              <Pressable onPress={toCreateRoom} className="items-start flex-1">
                <Text
                  className={`${
                    isActive ? 'text-main1' : 'text-disabledFont'
                  } text-base font-semibold leading-[19px]`}
                >
                  초대코드로{'\n'}방 만들기
                </Text>
              </Pressable>
            </View>

            <View className={`${isActive ? 'bg-colorBox' : 'bg-box'} px-4 py-4 rounded-xl flex-1`}>
              <Pressable onPress={toJoinRoom} className="items-start flex-1">
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
