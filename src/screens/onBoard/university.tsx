import React from 'react';
import { Text, View, Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import University from '@components/onBoard/new/school';
import BottomButton from '@components/common/bottomButton';
import Department from '@components/onBoard/new/department';

import { useSignUpStore } from '@zustand/member/member';

import { UniversityInputScreenProps } from '@type/param/rootStack';

const UniversityInputScreen = ({ navigation }: UniversityInputScreenProps) => {
  const { signUpState } = useSignUpStore();

  const isComplete = signUpState.universityId !== 0 && signUpState.majorName !== '';

  const toNext = async (): Promise<void> => {
    if (!isComplete) return;

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
                룸메이트 매칭을 위해,{'\n'}학교 및 학과를 입력해주세요!
              </Text>
            </View>

            <View className="space-y-4">
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
              disabled={!isComplete}
              onPressFunc={toNext}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UniversityInputScreen;
