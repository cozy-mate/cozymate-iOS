import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { JoinRoomScreenProps } from '@type/param/loginStack';

import BackButton from '@assets/backButton.svg';

const JoinRoomScreen = ({ navigation }: JoinRoomScreenProps) => {
  const [inviteCode, setInviteCode] = useState<string>('');

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        <View>
          <Pressable onPress={toMain} className="mt-2 mb-5">
            <BackButton />
          </Pressable>
          <Text className="px-2 mb-2 text-base font-semibold text-basicFont">
            방장이 준 초대코드를 입력해주세요!
          </Text>
          <TextInput
            value={inviteCode}
            onChangeText={setInviteCode}
            placeholder="초대코드를 입력해주세요"
            className="p-4 font-medium bg-colorBox text-basicFont rounded-xl"
          />
        </View>

        <View className={`${inviteCode ? 'bg-main1' : 'bg-[#C4c4c4]'} flex p-4 rounded-xl`}>
          <Pressable onPress={toMain}>
            <Text className="text-base font-semibold text-center text-white">확인</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JoinRoomScreen;
