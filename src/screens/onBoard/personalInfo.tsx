import React, { useState } from 'react';
import { Text, View, Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import Gender from '@components/onBoard/new/gender';
import BirthDay from '@components/onBoard/new/birthday';
import University from '@components/onBoard/new/school';
import BottomButton from '@components/common/bottomButton';
import Department from '@components/onBoard/new/department';
import NickNameInput from '@components/onBoard/new/nickNameInput';

import { useSignUpStore } from '@zustand/member/member';

import { PersonalInfoInputScreenProps } from '@type/param/rootStack';

const PersonalInfoInputScreen = ({ navigation }: PersonalInfoInputScreenProps) => {
  const { signUpState } = useSignUpStore();

  const [canUse, setCanUse] = useState<boolean>(true);

  const isComplete =
    canUse &&
    signUpState.nickname !== '' &&
    signUpState.gender !== '' &&
    signUpState.birthday !== '' &&
    signUpState.universityId !== 0 &&
    signUpState.department !== '';

  const toNext = async (): Promise<void> => {
    if (!isComplete || !canUse) return;

    navigation.navigate('CharacterInputScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col justify-between px-5">
          {/* 상단 View */}
          <View className="mt-14 flex">
            {/* 설명 Text */}
            <View className="mb-6 px-2">
              <Text className="text-xl font-semibold leading-[21px] tracking-tight text-emphasizedFont">
                원활한 서비스 이용을 위해{'\n'}개인정보를 입력해주세요!
              </Text>
            </View>

            <View className="space-y-4">
              {/* 닉네임 입력 Input */}
              <View>
                <NickNameInput setCanUse={setCanUse} />
              </View>

              {/* 성별 입력 Input */}
              <View>
                <Gender />
              </View>

              {/* 생년월일 입력 Input */}
              <View>
                <BirthDay />
              </View>

              {/* 학교 입력 Input */}
              <View>
                <University />
              </View>

              {/* 학과 입력 Input */}
              <View>
                <Department />
              </View>
            </View>
          </View>

          {/* 하단 View */}
          <View className="flex">
            <BottomButton
              color={'bg-main1'}
              borderColor={'border-main1'}
              textColor={'text-white'}
              text={'다음'}
              disabled={!isComplete || !canUse}
              onPressFunc={toNext}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfoInputScreen;
