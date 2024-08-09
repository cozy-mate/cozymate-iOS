import React from 'react';
import { Pressable, SafeAreaView, Text, View, Image } from 'react-native';
import { useRecoilState } from 'recoil';

import { createRoomState } from '@recoil/recoil';
import { CompleteCreateRoomScreenProps } from '@type/param/loginStack';

const CompleteCreateRoomScreen = ({ navigation }: CompleteCreateRoomScreenProps) => {
  const [createroomState, setCreateRoomState] = useRecoilState(createRoomState);

  const toCozyHome = () => {
    navigation.navigate('CozyHomeScreen');
  };

  return (
    <SafeAreaView className="flex flex-col justify-between flex-1 bg-white">
      <View className="flex flex-1 flex-col justify-between mt-[81px] px-5">
        <View className="flex items-center">
          <View className="flex flex-col mb-5">
            <Text className="mb-1 text-xl font-semibold text-center text-emphasizedFont">
              방 생성을 완료했어요!
            </Text>
            <Text className="text-sm font-medium text-center text-basicFont">
              초대코드를 공유해 룸메이트를 모아보세요..
            </Text>
          </View>

          <Pressable className="flex mb-16">
            <View className="px-6 py-3 rounded-xl bg-colorBox">
              <Text className="text-base font-semibold text-main1">QUIIRK</Text>
            </View>
          </Pressable>

          <View className="flex">
            <Image
              source={{
                uri: `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${createroomState.profileImage}.png`,
              }}
              style={{ width: 300, height: 300 }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="flex">
          <Pressable onPress={toCozyHome}>
            <View className="p-4 rounded-xl bg-main1">
              <Text className="text-base font-semibold text-center text-white">확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteCreateRoomScreen;
