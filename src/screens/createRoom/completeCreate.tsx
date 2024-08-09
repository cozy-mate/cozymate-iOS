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
    <SafeAreaView className="flex-1">
      <View className="flex flex-col justify-between">
        <View className="flex flex-col">
          <Text className="text-xl font-semibold text-emphasizedFont">방 생성을 완료했어요!</Text>
          <Text className="text-sm font-medium text-basicFont">
            초대코드를 공유해 룸메이트를 모아보세요..
          </Text>
        </View>

        <Pressable className="flex">
          <View className="px-6 py-3 rounded-xl bg-colorBox">
            <Text className="text-main1">QUIIRK</Text>
          </View>
        </Pressable>

        <View>
          <Image
            source={{
              uri: `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${createroomState.profileImage}.png`,
            }}
            style={{ width: 300, height: 300 }}
            resizeMode="cover"
          />
        </View>

        <View className="flex">
          <Pressable onPress={toCozyHome}>
            <View className="p-4 rounded-xl bg-main1">
              <Text className="text-base font-semibold text-center text-white">완료</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteCreateRoomScreen;
