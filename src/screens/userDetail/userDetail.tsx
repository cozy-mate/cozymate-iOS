import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { UserDetailScreenProps } from '@type/param/stack';

import CharacterImage from '@assets/character.svg';

const UserDetailScreen = ({ navigation }: UserDetailScreenProps) => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const toSignIn = () => {
    navigation.navigate('SignInScreen');
    setStep(1);
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1 items-center bg-[#F1F5FF]">
        <View>
          <CharacterImage />
          <View className="items-center px-9 py-[10px] rounded-[64px] bg-white opacity-50">
            <Pressable>
              <Text className="text-colorFont text-[10px] font-semibold">캐릭터 선택하기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
